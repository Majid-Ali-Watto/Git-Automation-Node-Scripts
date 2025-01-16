import bodyParser from "body-parser";
import cors from "cors";
import { config } from "dotenv";
import express from "express";
import mongoose from 'mongoose';
import GetRouter from "./Routes/Get.route.js";
import GitNexusRouter from './Routes/Git.Nexus.route.js';
import OpenRouter from "./Routes/Open-Directory.route.js";
const app = express();
app.use(bodyParser.json({ limit: "5mb" }));
app.use(cors({ origin: "*" }));
config()

// app.use(bodyParser.urlencoded({ limit: "5mb", extended: true }));
// Use the router for specific routes
app.use("/", OpenRouter);
app.use("/", GetRouter);
app.use("/", GitNexusRouter);
mongoose.connect('mongodb://127.0.0.1:27017/UCs_MSs_Libs')
    .then(() => console.log('Connected!'));
app.listen(process.env.PORT || 3100, () => {
    console.log(`Worker process ${process.pid} is listening on port 3000.`);
});