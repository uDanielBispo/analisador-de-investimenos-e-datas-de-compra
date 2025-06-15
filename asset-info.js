import { apiKey } from "./config.js";

export async function getAssetUnityValue(assetName){
    let res = await fetch(`https://brapi.dev/api/quote/${assetName}`, {
        headers: {
            "Authorization": apiKey
        }
    })
    const json = await res.json();
    console.log(json.results[0].regularMarketPrice);
    
    return json.results[0].regularMarketPrice;
}
