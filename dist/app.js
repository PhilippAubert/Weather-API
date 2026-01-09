import express from "express";
import dotenv from "dotenv";
import axios from "axios";
dotenv.config();
const app = express();
const port = process.env["PORT"] || 4400;
const baseUrl = process.env["BASE_URL"];
const apiKey = process.env["API_KEY"];
app.use(express.json());
app.get("/", async (_req, res) => {
    try {
        const { data } = await axios.get(`${baseUrl}/Munich?unitGroup=metric&key=${apiKey}&contentType=json`);
        return res.status(200).json(data);
    }
    catch (e) {
        return res.status(400).json({ "error": e });
    }
});
app.listen(port, () => console.log(`Listening on port http://localhost:${port}`));
