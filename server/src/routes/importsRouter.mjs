import express from "express";
import db from "../db/connection.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

// Add a new document to the collection
router.post("/", async (req, res) => {
      try {
            console.log("hit import post!");
            let collection = await db.collection("transactions");
            let newTransactions = req.body.data;
            let dbResult = await collection.insertMany(newTransactions);
            console.log(dbResult);
            res.status(200);
      }
      catch (error) {
            console.log(error);
            res.status(500);
      }
});

export default router;
