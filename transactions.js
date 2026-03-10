import axios from "axios";
import dotenv from "dotenv";
import { getAccessToken } from "./authentication.js";

dotenv.config();
// https://cybqa.pesapal.com/pesapalv3/api/Transactions/GetTransactionStatus?orderTrackingId=xxxxxxxxxxxx

const getTransactionStatus = async (orderTrackingId) => {
    try {
        const response = await axios.get(
            `${process.env.SANDBOX_ENDPOINT}/api/Transactions/GetTransactionStatus?orderTrackingId=${orderTrackingId}`,
            {
                headers: {
                    Authorization: `Bearer ${await getAccessToken()}`,
                    Accept: "application/json"
                }
            }
        );
        console.log("Transaction status retrieved successfully:", response.data);
    } catch (error) {
        console.error(
            "Failed to retrieve transaction status:",
            error.response ? error.response.data : error.message
        );
    }
};

getTransactionStatus("d0303aa2-bc29-4a7b-959e-daa38c2e4099");

/*

RESPONSE

Transaction status retrieved successfully: {
  payment_method: 'MasterCard',
  amount: 200,
  created_date: '2026-03-10T20:13:29.767',
  confirmation_code: '7731628076056674904602',
  order_tracking_id: 'd0303aa2-bc29-4a7b-959e-daa38c2e4099',
  payment_status_description: 'Failed',
  description: 'Invalid amount provided.Please provide original amount',
  message: 'Request processed successfully',
  payment_account: '520000XXXXXX0007',
  call_back_url: 'https://itbienvenu.vercel.app/callback?OrderTrackingId=d0303aa2-bc29-4a7b-959e-daa38c2e4099&OrderMerchantReference=abd5b1c0-9705-453b-9dcc-be6280cc2cad',
  status_code: 2,
  merchant_reference: 'abd5b1c0-9705-453b-9dcc-be6280cc2cad',
  account_number: null,
  payment_status_code: '',
  currency: 'RWF',
  error: { error_type: null, code: null, message: null },
  status: '200'
}

*/