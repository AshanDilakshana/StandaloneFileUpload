import axios from "axios";
import FormData from "form-data";
import fs from "fs";

// Port 8091 as per .env
const BASE_URL = "http://localhost:8091/api/v1"; 

async function testPublicAccess() {
  try {
    console.log("Testing Public Upload...");
    const form = new FormData();
    form.append("file", fs.createReadStream("test_public.txt"));

    // No headers for auth, just form headers
    const uploadRes = await axios.post(`${BASE_URL}/files/upload`, form, {
      headers: { ...form.getHeaders() }
    });

    console.log("Upload Success! ID:", uploadRes.data.file._id);

    console.log("Testing Public Download...");
    await axios.get(`${BASE_URL}/files/download/${uploadRes.data.file._id}`);
    console.log("Download Success!");

  } catch (err) {
    console.error("Test Failed:", err.message);
    if(err.response) console.error(err.response.data);
  }
}

testPublicAccess();
