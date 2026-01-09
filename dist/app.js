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
    //make dynamic: 
    // query for region! 
    // date-range-request: 2020-10-01/2020-12-31?
    // options 
    const { data } = await axios.get(`${baseUrl}/Munich?unitGroup=metric&key=${apiKey}&contentType=json`);
    try {
        res.json(data);
    }
    catch (e) {
        res.send(e);
        //ERROR HANDLING!! 
    }
    res.end();
});
app.listen(port, () => console.log(`Listening on port http://localhost:${port}`));
