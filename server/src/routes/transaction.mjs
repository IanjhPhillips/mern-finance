import express from "express";
import db from "../db/connection.mjs";
import { ObjectId } from "mongodb";

//let transactions = [];

const router = express.Router();

//const transactionController=require('../controllers/transactionController')

// router.get('/transaction', (req, res) => {
//     const transactions=[{id:1,name:'Income',amount:500},{id:2,name:'Coffee', amount:5}, {id:3, name:'E-transfer', amount: 17.5}];
//     res.json({ message: 'Data from API router with CORS enabled', body: transactions });
// });

// Update the post with a new comment
router.patch("/:id", async (req, res) => {
      try {
            
            const query = { _id: new ObjectId(req.params.id) };
            console.log(`patching ${query._id}!`)
            const updates = {
                  $push: { comments: req.body }
            };
            
            let collection = await db.collection("posts");
            await collection.updateOne(query, updates);
            
            res.status(200);//.redirect("/transaction");
      }
      catch (error) {
            console.log(error);
            res.status(500);
      }
});

// Delete an entry
router.delete("/:id", async (req, res) => {

      try {
            
            const query = { _id: new ObjectId(req.params.id) };
            console.log(`deleting ${query._id}!`)
            
            const collection = db.collection("posts");
            await collection.deleteOne(query);
            
            res.status(200);//.redirect("/transaction");
      }
      catch (error) {
            console.log(error);
            res.status(500);
      }
});

// Get a list of 50 transactions
router.get("/", async (req, res) => {
      try {

            let collection = await db.collection("transactions");
            let results = await collection.find({})
            //.limit(50)
            .toArray();
            
            res.send(results).status(200);
      }
      catch(error) {
            console.log(error);
            res.status(500);
      }
});


// Add a new document to the collection
router.post("/", async (req, res) => {
      try {

            let collection = await db.collection("transactions");
            let newTransaction = req.body;
            newTransaction.date = new Date();
            let result = await collection.insertOne(newTransaction);
            res.status(200).redirect("/transaction");
      }
      catch(error) {
            console.log(error);
            res.status(500);
      }
});

// router.get('/', async (req, res) => {
//       //transactions=[{id:1,name:'Income',amount:500},{id:2,name:'Coffee', amount:5}, {id:3, name:'E-transfer', amount: 17.5}];
//       res.json(transactions);
// });

// router.post('/', async (req, res) => {
//       transactions.push(...[{id:1,name:'Income',amount:500},{id:2,name:'Coffee', amount:5}, {id:3, name:'E-transfer', amount: 17.5}])
//       res.redirect('/transaction');
// });

//router.get('/transaction', transactionController.get);
//router.post('/transaction', transactionController.post);
export default router;
