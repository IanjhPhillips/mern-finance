const { MongoClient } = require('mongodb');
const cors = require('cors');
const express = require('express');

const app = express();
app.use(express.json());
app.use(cors());

const port = 8081;

// Define a route for GET requests
app.get('/transaction', (req, res) => {
    res.json({ message: 'Returning list of transactions' });
});

// Define a route for POST requests
app.post('/transaction', (req, res) => {
    const newtransaction = req.body;
    res.json({ message: 'transaction created', transaction: newtransaction });
});

// Define a route for PUT requests
app.put('/transaction/:id', (req, res) => {
    const transactionId = req.params.id;
    const updatedtransaction = req.body;
    res.json({ message: `transaction with ID ${transactionId} updated`, updatedtransaction });
});

// Define a route for DELETE requests
app.delete('/transaction/:id', (req, res) => {
    const transactionId = req.params.id;
    res.json({ message: `transaction with ID ${transactionId} deleted` });
});

app.listen(port, () => {
  console.log(`Express server listening at http://localhost:${port}`);
});

// const uri = "mongodb://root:example@mongo:27017/"
// const client = new MongoClient(uri);

// async function run() {
//   try {
//     await client.connect();
//     const db = client.db("blog");
//     const collection = db.collection('posts');

//     await collection.insertMany([
//   {
//     title: "Post Title 2",
//     body: "Body of post.",
//     category: "Event",
//     likes: 2,
//     tags: ["news", "events"],
//     date: Date()
//   },
//   {
//     title: "Post Title 3",
//     body: "Body of post.",
//     category: "Technology",
//     likes: 3,
//     tags: ["news", "events"],
//     date: Date()
//   },
//   {
//     title: "Post Title 4",
//     body: "Body of post.",
//     category: "Event",
//     likes: 4,
//     tags: ["news", "events"],
//     date: Date()
//   }
// ]);

//     // Find the first document in the collection
//     const likedPost = await collection.findOne({likes: {$gt: 2}});
    
//     console.log(likedPost);

//     const firstPost = await collection.findOne();
//     console.log(firstPost);

//   } finally {
//     // Close the database connection when finished or an error occurs
//     await client.close();
//   }
// }
// run().catch(console.error);

