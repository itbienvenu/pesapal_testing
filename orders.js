import axios from "axios";
import dotenv from "dotenv";
import { v4 as uuidv4 } from "uuid";
import { getAccessToken } from "./authentication.js";

dotenv.config();


const submitOrder = async () => {
    try {
        const response = await axios.post(
            `${process.env.SANDBOX_ENDPOINT}/api/Transactions/SubmitOrderRequest`,
            {
                id: uuidv4(),
                currency: "RWF",
                amount: 200,
                description: "Test order",
                callback_url: "https://itbienvenu.vercel.app/callback",
                notification_id: "f32c5368-6af3-44cb-ab8c-daa38c4baa37",
                redirect_mode: "TOP_WINDOW",
                reference: "TEST12345",
                billing_address: {
                    email_address: process.env.TEST_EMAIL,
                    phone_number: process.env.TEST_PHONE_NUMBER,
                    country_code: "RW",
                    first_name: "John",
                    last_name: "Doe"
                }
            },
            {
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${await getAccessToken()}`
                }
            }
        );
        console.log("Order submission successful:", response.data);

    } catch (error) {
        console.error(
            "Order submission failed:",
            error.response ? error.response.data : error.message
        );
    }
};

submitOrder();


/*

RESPONSE

Order submission successful: {
  order_tracking_id: 'd0303aa2-bc29-4a7b-959e-daa38c2e4099',
  merchant_reference: 'abd5b1c0-9705-453b-9dcc-be6280cc2cad',
  redirect_url: 'https://cybqa.pesapal.com/pesapaliframe/PesapalIframe3/Index?OrderTrackingId=d0303aa2-bc29-4a7b-959e-daa38c2e4099',
  error: null,
  status: '200'
}



Order submission successful: {
  order_tracking_id: '9aafb43e-1a1b-473f-a986-daa3e4113a8c',
  merchant_reference: '37737503-f321-49e3-851c-408a5e3a0685',
  redirect_url: 'https://cybqa.pesapal.com/pesapaliframe/PesapalIframe3/Index?OrderTrackingId=9aafb43e-1a1b-473f-a986-daa3e4113a8c',
  error: null,
  status: '200'
}

*/