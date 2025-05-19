import express from 'express'
import cors from 'cors'
import path from 'path'
import dotenv from 'dotenv'
import {connectDB} from './config/db.js'
import authRoutes from './routes/auth.routes.js'
import incomeRoutes from './routes/income.routes.js'


// for upload --
import {fileURLToPath} from 'url'
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

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

// for img too --
app.use(express.json({ limit: "10mb" }));

connectDB();

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/income", incomeRoutes);

// server upload folder --- 
// app.use("/uploads", express.static(path.join(__dirname, "uploads")));       // for commonjs works directly
app.use("/uploads", express.static(path.join(__dirname, "uploads")));           // for module have to declare


const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=>{
    console.log(`Service started on the port: ${PORT}`);
});