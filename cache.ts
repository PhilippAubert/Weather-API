import express from "express";

import { createClient } from "redis";

const client = createClient();
await client.connect();

export const cacheMiddleware = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    const addressParam = req.query["address"];
    const address = typeof addressParam === "string" ? addressParam : undefined;

    if (!address) {
        return res.status(400).json({ error: "Address query parameter is required" });
    }

    try {
        const cachedData = await client.get(address);
        if (cachedData) {
            return res.status(200).json(JSON.parse(cachedData));
        }
        res.locals["cacheKey"] = address;
        next();
    } catch (err) {
        console.error("Redis error:", err);
        next();
    }
    return;
};