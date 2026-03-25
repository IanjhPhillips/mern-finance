import express from "express";
import db from "../db/connection.mjs";
import { ObjectId } from "mongodb";

const router = express.Router();

router.get("/", async (req, res) => {
      try {
            let start = req.query.start;
            let end = req.query.end;

            console.log("/statistics GET")
            console.log(`filter start date ${start}`);
            console.log(`filter end date ${end}`);

            let collection = await db.collection("transactions");
            let results = await collection.aggregate([
                  {
                        $match: {
                              "date":
                              {
                                    $gte: start,
                                    $lte: end
                              }
                        }
                  },
                  {
                        $group: { _id: "$category", total: { $sum: "$amount" } }
                  }
            ]).toArray();


            console.log(results);
            console.log("sending statistics results to client");

            res.send(results).status(200);
      }
      catch (error) {
            console.log(error);
            res.status(500);
      }
});

export default router;
