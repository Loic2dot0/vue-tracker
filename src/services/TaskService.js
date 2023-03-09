import axios from "axios";

const JSON_BIN_SECRET = inport.meta.env.VITE_JSON_BIN_SECRET;
const JSON_BIN_KEY_ID = inport.meta.env.VITE_JSON_BIN_KEY_ID;

const instance = axios.create({
    baseURL: `https://api.jsonbin.io/v3/b/${JSON_BIN_KEY_ID}`,
    headers: {
        "X-Access-Key": JSON_BIN_SECRET,
    }
});

