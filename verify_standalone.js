import axios from "axios";
import FormData from "form-data";
import fs from "fs";
import path from "path";

const PORT = process.env.PORT || 8091;
const BASE_URL = `http://localhost:${PORT}/api/v1`;

// Create a dummy file if it doesn't exist
const TEST_FILE_PATH = "test_standalone.txt";
if (!fs.existsSync(TEST_FILE_PATH)) {
    fs.writeFileSync(TEST_FILE_PATH, "This is a standalone test file.");
}

async function verify() {
  try {
    console.log(`Checking Standalone Server at ${BASE_URL}...`);

    console.log("1. Uploading file...");
    const form = new FormData();
    form.append("file", fs.createReadStream(TEST_FILE_PATH));

    const uploadRes = await axios.post(`${BASE_URL}/files/upload`, form, {
      headers: {
        ...form.getHeaders(),
      },
    });
    
    const fileId = uploadRes.data.file._id;
    console.log(`Upload successful. File ID: ${fileId}`);

    console.log("2. Downloading file...");
    const downloadRes = await axios.get(`${BASE_URL}/files/download/${fileId}`, {
      responseType: "stream",
    });

    console.log("Download stream received. Verification passed!");
    
  } catch (error) {
    if (error.response) {
        console.error("API Error:", error.response.status, error.response.data);
    } else if (error.code === 'ECONNREFUSED') {
        console.error("Connection Refused. Is the server running?");
    } else {
        console.error("Error:", error.message);
    }
  }
}

verify();
