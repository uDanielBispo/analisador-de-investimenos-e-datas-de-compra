import express from 'express'
import mongoose from 'mongoose';
import purchaseModel from '../models/asset-purchase-model.js';

const router = express.Router()

router.get('/read', async (req,res) => {
    res.json(await purchaseModel.find())
})

router.put('/create', async (req,res) => {
    const purchase_object = await purchaseModel.create({
        ticker: req.body.ticker,
        purchaseValue: req.body.purchaseValue,
        quantity: req.body.quantity,
        purchaseDate: req.body.purchaseDate,
    })
    res.status(200).json(purchase_object)
})

export default router;