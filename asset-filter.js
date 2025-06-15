import { apiKey } from "./config.js";
import { getAssetUnityValue } from "./asset-info.js"

const listAvailableAssets = await getAssets(apiKey)
const stocks = listAvailableAssets.stocks
const container = document.getElementById("asset-galery");

let assetValueInput = document.getElementById('asset-value-input')
let searchAssetInput = document.getElementById('asset-input')

searchAssetInput.addEventListener('change', function(event) {
    filterAssets(event.target.value)
})

let stocksFiltered = stocks

async function getAssets(apiKey){    
    const res = await fetch(`https://brapi.dev/api/available`, {
        headers: {
            "Authorization": apiKey
        }
    });
    const json = await res.json();
    return json;
}

function showAssets(){
    container.innerHTML = ""; 

    stocksFiltered.forEach(asset => {
        let div = document.createElement("div");
        let button = document.createElement("input");

        button.type = "button";
        button.value = asset;
        button.addEventListener("click", () => setAssetChosed(asset));

        div.appendChild(button);
        container.appendChild(div);
    })
}

async function setAssetChosed(assetName){
    searchAssetInput.value = assetName
    stocksFiltered = stocks.filter(asset => asset === assetName)
    
    showAssets()

    let assetValue = await getAssetUnityValue(assetName)
    assetValueInput.value = assetValue
}

function filterAssets(assetName){
    container.innerHTML = ""; 

    assetName = assetName.toUpperCase()
    stocksFiltered = stocks.filter(asset => asset.startsWith(assetName))
    if(assetName)
        showAssets()
}
