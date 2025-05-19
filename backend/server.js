import express from 'express'
import cors from 'cors'
import path from 'path'
import dotenv from 'dotenv'
import {connectDB} from './config/db.js'
import authRoutes from './routes/auth.routes.js'

dotenv.config();

const app = express();


// middleware to use cors
app.use(
    cors({
        origin: process.env.CLIENT_URL || "*",
        methods: ["GET", "POST", "PUT", "DELETE"],
        allowedHeaders: ["Content-Type", "Authorization"],
    })
);

app.use(express.json());

connectDB();

app.use("/api/v1/auth", authRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Service started on the port: ${PORT}`);
});