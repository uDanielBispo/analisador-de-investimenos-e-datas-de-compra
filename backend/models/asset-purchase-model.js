import mongoose from "mongoose";

const purchase = new mongoose.Schema({
    ticker: String,
    purchaseValue: Number,
    quantity: Number,
    purchaseDate: Date
})

const purchaseModel = mongoose.model('purchasings', purchase, 'purchasings')

export default purchaseModel