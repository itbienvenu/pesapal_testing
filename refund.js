import axios from "axios";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { getAccessToken } from "./authentication.js";

dotenv.config();

// https://cybqa.pesapal.com/pesapalv3/api/Transactions/RefundRequest

const submitRefund = async () => {
    try {
        const response = await axios.post(
            `${process.env.SANDBOX_ENDPOINT}/api/Transactions/RefundRequest`,
            {
                confirmation_code: "7731628076056674904602",
                amount: 100,
                username: "testuser",
                remarks: "Refund for order d0303aa2-bc29-4a7b-959e-daa38c2e4099",
            },
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${await getAccessToken()}`
                }
            }
        );
        console.log("Refund submission successful:", response.data);

    } catch (error) {
        console.error(
            "Refund submission failed:",
            error.response ? error.response.data : error.message
        );
    }
};

submitRefund();