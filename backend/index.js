import dotenv from "dotenv";
import express from "express"
import cors from "cors"
import mongoose from "mongoose";
import bodyParser from "body-parser";
import TransactionModel from "./models/transaction.js";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/api/transaction', async(req, res)=>{
    await mongoose.connect(process.env.MONGO_URL);
    const transactions = await TransactionModel.find({});
    res.json(transactions);
});

app.post('/api/transaction', async(req, res)=>{
    await mongoose.connect(process.env.MONGO_URL);
    const {price, name, description, datetime} = req.body;
    const transaction = await TransactionModel.create({price: price, name: name, description:description, datetime: datetime})
    res.json(req.body);
})


app.listen(4000, ()=>{
    console.log("Server Started")
    mongoose.connect(process.env.MONGO_URL)
    .then(console.log("Connected to database"))
    .catch((err)=>console.log(err));
});