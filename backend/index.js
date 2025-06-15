import express from 'express';
import assetPurchasesRoute from './routes/asset-purchases.js'
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';

dotenv.config();
const app = express()

app.use(cors({
  origin: 'http://192.168.1.105:5500', 
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}));

app.use(express.json())
app.use('/asset-purchases', assetPurchasesRoute)


mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log('Connected to MongoDB Atlas');
  app.listen(3000, () => {
    console.log(`Server running at http://localhost:3000`);
  });
})
.catch(err => console.error('Error in connecting to Mongo:', err));