import express from "express";
import db from "../db/connection.mjs";

let transactions = [];

const router = express.Router();
const collection = db.collection('transactions');
//const transactionController=require('../controllers/transactionController')

// router.get('/transaction', (req, res) => {
//     const transactions=[{id:1,name:'Income',amount:500},{id:2,name:'Coffee', amount:5}, {id:3, name:'E-transfer', amount: 17.5}];
//     res.json({ message: 'Data from API router with CORS enabled', body: transactions });
// });

router.get('/transaction', (req, res) => {
      //const transactions=collection.find();
      //transactions=[{id:1,name:'Income',amount:500},{id:2,name:'Coffee', amount:5}, {id:3, name:'E-transfer', amount: 17.5}];
      res.json(transactions);
});

router.post('/transaction', (req, res) => {
      //collection.insertOne({date: req.body.date, description: req.body.description, amount: req.body.amount})
      transactions.push(...[{id:1,name:'Income',amount:500},{id:2,name:'Coffee', amount:5}, {id:3, name:'E-transfer', amount: 17.5}])
      res.redirect('/api/transaction');
});

//router.get('/transaction', transactionController.get);
//router.post('/transaction', transactionController.post);
export default router;
