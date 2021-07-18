const ASSET_SET = ['player.jpg'];
const assets = {};
const downloadPromises = Promise.all(ASSET_SET.map(downloadAssets));

// map file name to its image object value
function downloadAssets(assetName) {
    return new Promise(resolve => {
      const asset = new Image();
      asset.onload = () => {
        assets[assetName] = asset;
        resolve();
      };
      asset.src = `/assets/${assetName}`;
    });
  }
export const downloadAssets = () => downloadPromise;
export const getAsset = assetName => assets[assetName];