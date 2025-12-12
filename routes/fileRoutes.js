import express from "express";
import multer from "multer";
import { uploadFile, downloadFile } from "../controllers/fileController.js";

const router = express.Router();

// Multer Config
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// Routes
router.post("/upload", upload.single("file"), uploadFile);
router.get("/download/:id", downloadFile);

export default router;
