import express from "express";
import dotenv from "dotenv";
import axios from "axios";
import { cacheMiddleware } from "./cache.js";
import { redisClient } from "./client.js";

dotenv.config();

const app = express();
const port = process.env["PORT"] || 4400;

app.use("/", cacheMiddleware);

app.get("/", async (_req, res) => {
    const address = res.locals["cacheKey"] as string;
    try {
        const { data } = await axios.get(`${process.env["BASE_URL"]}/${address}?unitGroup=metric&key=${process.env["API_KEY"]}`);
        await redisClient.setEx(address, 3600, JSON.stringify(data));
        return res.status(200).json(data);
    } catch {
        return res.status(400).json({ error: "City is unknown" });
    }
});

app.listen(port, () => console.log(`Listening on http://localhost:${port}`));
