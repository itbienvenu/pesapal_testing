import axios from "axios";
import dotenv from "dotenv";
import { getAccessToken } from "./authentication.js";

dotenv.config();

const registerIPN = async () => {
    try {
        const response = await axios.post(
            process.env.SANDBOX_ENDPOINT + "/api/URLSetup/RegisterIPN",
            {
                url: "https://itbienvenu.vercel.app/ipn",
                ipn_notification_type: "POST"
            },
            {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${await getAccessToken()}`
                }
            }
        );

        console.log("IPN registration successful:", response.data);

    } catch (error) {
        console.error(
            "IPN registration failed:",
            error.response ? error.response.data : error.message
        );
    }
};
// registerIPN();


/*
RESPONSE

IPN registration successful: {
  url: 'https://example.com/ipn',
  created_date: '2026-03-10T15:22:29.090556Z',
  ipn_id: 'f32c5368-6af3-44cb-ab8c-daa38c4baa37',
  notification_type: 1,
  ipn_notification_type_description: 'POST',
  ipn_status: 1,
  ipn_status_decription: 'Active',
  status: '200',
  message: 'Request processed successfully'
} 

*/

 const getIPNDetails = async () => {
    try {

        const response = await axios.get(
            `${process.env.SANDBOX_ENDPOINT}/api/URLSetup/GetIpnList`,
            {
                headers: {
                    Authorization: `Bearer ${await getAccessToken()}`,
                    Accept: "application/json"
                }
            }
        );

        console.log("IPN list retrieved:", response.data);

    } catch (error) {

        console.error(
            "Failed to retrieve IPNs:",
            error.response ? error.response.data : error.message
        );

    }
};

getIPNDetails();

