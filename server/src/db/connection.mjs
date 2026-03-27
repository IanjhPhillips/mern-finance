import { MongoClient } from "mongodb";

const connectionString = `${process.env.DB_CONN}://${process.env.DB_UNAME}:${process.env.DB_PWD}@${process.env.DB_HOST}:${process.env.DB_PORT}/`;

const client = new MongoClient(connectionString);

let conn;
try {
  console.log("Connecting DB client...")
  conn = await client.connect();
} catch(e) {
  console.error(`ERROR: while attempting to connect to db client\n============\n${e}\n============\n`);
}

let db = conn.db("finance");

export default db;