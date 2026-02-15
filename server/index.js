const { MongoClient } = require('mongodb');
const express = require('express');

const app = express();
const port = 8081;

app.get('/', (req, res) => {
  res.send('Hello World from express!');
});

app.listen(port, () => {
  console.log(`Example express app listening at http://localhost:${port}`);
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

