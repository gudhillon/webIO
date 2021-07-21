// Asset Manager 
const ASSET_SET = ['player.png',];
const assets = {};
const downloadPromises = Promise.all(ASSET_SET.map(downloadAsset));

// map file name to its image object value
function downloadAsset(assetName) {
    return new Promise(resolve => {
      const asset = new Image();
      asset.onload = () => {
        assets[assetName] = asset;
        resolve();
      };
      asset.src = `/assets/${assetName}`;
    });
}
export const downloadAssets = () => downloadPromises;
export const getAsset = assetName => assets[assetName];