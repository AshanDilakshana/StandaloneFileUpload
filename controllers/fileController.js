import File from "../models/File.js";
import fs from "fs";
import path from "path";

// Upload File
export const uploadFile = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).send({ message: "No file uploaded" });
    }

    const { filename, originalname, path, mimetype, size } = req.file;

    const file = new File({
      filename,
      originalName: originalname,
      path,
      mimetype,
      size,
    });

    await file.save();

    res.status(201).send({
      message: "File uploaded successfully",
      file,
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error uploading file",
      error,
    });
  }
};

// Download File
export const downloadFile = async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).send({ message: "File not found" });
    }

    const filePath = path.resolve(file.path);
    if (!fs.existsSync(filePath)) {
        return res.status(404).send({ message: "File not found on server" });
    }

    res.download(filePath, file.originalName);
  } catch (error) {
    console.log(error);
    res.status(500).send({
      message: "Error downloading file",
      error,
    });
  }
};
