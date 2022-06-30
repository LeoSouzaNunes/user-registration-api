import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { MongoClient } from "mongodb";

dotenv.config();

const server = express();

server.use(express.json());
server.use(cors());

const mongoClient = new MongoClient(process.env.MONGO_URI);
let db;

mongoClient.connect().then(() => {
    db = mongoClient.db("wunderPayments");
});

server.get("/check", (req, res) => {
    res.status(200).send("mate!");
});

server.post("/registration", (req, res) => {
    const { paymentId } = req.body;
    if (!paymentId) {
        return res.sendStatus(400);
    }

    db.collection("paymentIds")
        .insertOne({ paymentId })
        .then(() => res.sendStatus(201));
});

server.listen(5000, () => console.log("Server is running on port 5000"));
