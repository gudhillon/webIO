// Object 
// timestamp: time of when update was created
// me: player info for player getting update
//  me : {x.., y.., direction.., id..}
// others: array of other players in game

// Buffer, current client state 100ms behind server,
// we do this for more consistent gameplay accounting for 
// internet unpredictability 
const RENDER_DELAY = 100;

const gameUpdates = [];
let gameStart = 0;
let firstServerTimestamp = 0;

export function initState() {
    gameStart = 0;
    firstServerTimestamp = 0;
}
// Used when update is received from the server
// also removes former updates before base
export function processGameUpdate(update) {
    if (!firstServerTimestamp) {
      firstServerTimestamp = update.t;
      gameStart = Date.now();
    }
    gameUpdates.push(update);
  
    // Hold one game update before the current time of server
    const base = getBaseUpdate();
    if (base > 0) {
      gameUpdates.splice(0, base);
    }
}
// current timestamp of the current render time
// current server time subtracted by delay
function currentServerTime() {
    return firstServerTimestamp + (Date.now() - gameStart) - RENDER_DELAY;
}
// Get index of first game update before current time of server
// going backwards from current server time
function getBaseUpdate() {
    const serverTime = currentServerTime();
    for (let i = gameUpdates.length - 1; i >= 0; i--) {
      if (gameUpdates[i].t <= serverTime) return i;
    }
    return -1;
  }

export function getCurrentState() {
  if (!firstServerTimestamp) {
    return {};
  }

  // recent update
  const base = getBaseUpdate();
  const serverTime = currentServerTime();

  // no updates before current client render time
  if (base < 0) {
    return gameUpdates[gameUpdates.length - 1];
  } 
  // if most recent update made
  else if (base === gameUpdates.length - 1) {
    return gameUpdates[base];
  } else {
    // interpolate between current state and next state
    // Due to render delay, we will have one update ahead of client
    // Because of this, we are able to linearly interpolate between updates
    // Ex: We have two distinct points and the values in between the distance
    // between them can be found by linear interpolation
    const baseUpdate = gameUpdates[base];
    const next = gameUpdates[base + 1];
    const r = (serverTime - baseUpdate.t) / (next.t - baseUpdate.t);
    return {
      me: interpolateObject(baseUpdate.me, next.me, r),
      others: interpolateObjectArray(baseUpdate.others, next.others, r),
    };
  }
}
function interpolateObject(obj1, obj2, rat) {
    if (!obj2) return obj1;
    const interpolated = {};
    Object.keys(obj1).forEach(key => {
      if (key === 'direction') interpolated[key] = interpolateDirection(obj1[key], obj2[key], rat);
      else interpolated[key] = obj1[key] + (obj2[key] - obj1[key]) * rat;
    });
    return interpolated;
}

function interpolateObjectArray(objects1, objects2, ratio) {
  return objects1.map(o => interpolateObject(o, objects2.find(o2 => o.id === o2.id), ratio));
}

// rotating clockwise/counterclockwise
// ex: 1 rad to -1 rad becomes 1 rad to -1 + 2pi rad
function interpolateDirection(d1, d2, rat) {
    const abs_val = Math.abs(d2 - d1);
    // large angle, rotate else
    if (abs_val >= Math.PI) {
      if (d1 > d2) return d1 + (d2 + 2 * Math.PI - d1) * rat;
      else         return d1 - (d2 - 2 * Math.PI - d1) * rat;
    } 
    // Regular rotate
    else return d1 + (d2 - d1) * rat;
    
}