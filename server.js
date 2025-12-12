import express from "express";
import dotenv from "dotenv";
import connectDB from "./config/db.js";
import cors from "cors";
import fileRoutes from "./routes/fileRoutes.js";

// config env
dotenv.config();

// database config
connectDB();

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// routes
app.use("/api/v1/files", fileRoutes);

app.get("/", (req, res) => {
    res.send("<h1>Welcome to File Upload Server</h1>");
});

const PORT = process.env.PORT || 8080;

app.listen(PORT, () => {
    console.log(`Server Running on port ${PORT}`);
});
