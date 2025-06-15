

let saveButton = document.getElementById('save-purchase-button')
saveButton.addEventListener('click', async () => {
  await savePurchase();
});

async function savePurchase(){
    let assetInput = document.getElementById('asset-input').value
    let purchaseValueInput = document.getElementById('asset-value-input').value
    let quantityInput = document.getElementById('qtt-purchased-input').value
    let purchaseDateInput = document.getElementById('purchase-date').value

    if(!assetInput || !purchaseValueInput || !quantityInput || !purchaseDateInput){
        alert('Preencha todos os campos')
    }
    else{
        const purchase = {
            ticker: assetInput,
            purchaseValue: purchaseValueInput,
            quantity: quantityInput,
            purchaseDate: purchaseDateInput
        }
        
        const res = await fetch('http://localhost:3000/asset-purchases/create',{
            method: 'PUT',
            headers:{
                'Content-type': 'application/json'
            },
            body: JSON.stringify(purchase)
        })
        
        const data = await res.json();
        console.log('Resposta da API:', data);
    }
}
