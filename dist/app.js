import express from "express";
import dotenv from "dotenv";
import { readFile } from "node:fs/promises";
dotenv.config();
const app = express();
const port = process.env["PORT"] || 4400;
app.use(express.json());
app.get("/", async (_req, res) => {
    const apiData = await readFile("./data.json");
    try {
        const content = await JSON.parse(apiData.toString());
        res.json(content);
    }
    catch (e) {
        res.send(e);
    }
    res.end();
});
app.listen(port, () => console.log(`Listening on port http://localhost:${port}`));
