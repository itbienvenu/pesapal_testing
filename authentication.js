// this is the tests for the authentication endpoint on the pesapal api documentation

import axios from "axios";
import dotenv from "dotenv";

dotenv.config();

const ROUTE_API = process.env.SANDBOX_ENDPOINT;

const getAccessToken = async () => {
    try {
        const response = await axios.post(process.env.AUTH_SANDBOX, {
            consumer_key: process.env.CONSUMER_KEY,
            consumer_secret: process.env.CONSUMER_SECRET,
        });
        console.log("Authentication successful:", response.data);
    } catch (error) {
        console.error("Authentication failed:", error.response ? error.response.data : error.message);
    }
};

getAccessToken();