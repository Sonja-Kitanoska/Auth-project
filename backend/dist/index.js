"use strict";
// import express, { Request, Response } from 'express';
// import cors from 'cors';
// import dotenv from 'dotenv';
// import router from './routes/userRoutes'
// import mongoose, { ConnectOptions } from 'mongoose';
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// const app = express();
// const { PORT } = process.env
// const MONGO_URL: string | undefined = process.env.MONGO_URL;
// dotenv.config();
// if (MONGO_URL) {
//   const dbOptions: ConnectOptions = {
//     useUnifiedTopology: true,
//   } as mongoose.ConnectOptions;
// mongoose
//   .connect(MONGO_URL, dbOptions)
//   .then(() => console.log("MongoDB is  connected successfully"))
//   .catch((err) => console.error(err));
// }
// // if (MONGO_URL) {
// //   const client:MongoClient = new MongoClient(MONGO_URL, {
// //     serverApi: {
// //       version: '1',
// //       strict: true,
// //       deprecationErrors: true,
// //     }
// //   });
// //   client.connect()
// //     .then(() => {
// //       console.log('Connected to MongoDB successfully');
// //       // const db:Db = client.db('e-commerce')
// //       // const col:Collection = db.collection('users')   
// //     })
// //     .catch((error) => {
// //       console.error('Error connecting to MongoDB:', error);
// //     });
// // } else {
// //   console.error('MONGO_URL is not defined or is empty.');
// // }
// app.get('/', (req: Request, res: Response) => {
//   res.send('Express + Typescript Server');
// });
// app.listen(PORT, () => {
//   console.log(`[server]: Server is running at http://localhost:${PORT}`);
// });
// app.use(cors({
//   origin: ["http://localhost:8000"],
//   methods: ["GET", "POST", "PUT", "DELETE"],
//   credentials: true,
// }));
// app.use(express.json());
// app.use('/', router)
const express_1 = __importDefault(require("express"));
const mongoose = require("mongoose");
const cors_1 = __importDefault(require("cors"));
const app = (0, express_1.default)();
require("dotenv").config();
const { MONGO_URL, PORT } = process.env;
mongoose
    .connect(MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
    .then(() => console.log("MongoDB is  connected successfully"))
    .catch((err) => console.error(err));
app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`);
});
app.use((0, cors_1.default)({
    origin: ["http://localhost:4000"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
}));
app.use(express_1.default.json());
//# sourceMappingURL=index.js.map