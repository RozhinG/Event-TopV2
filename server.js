import express from "express";
import fetch from "node-fetch";
import "dotenv/config";
import path from "path";

const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, PORT = 8888 } = process.env;
const base = "https://api-m.sandbox.paypal.com";
const app = express();

// host static files
app.use(express.static("client"));

// parse post params sent in body in json format
app.use(express.json());


//const express = require('express');
//const bodyParser = require('body-parser');
//const cors = require('cors');

//const app = express();
const PORT = process.env.PORT || 3000;
const environment = process.env.ENVIRONMENT || 'sandbox';
const client_id = process.env.CLIENT_ID;
const client_secret = process.env.CLIENT_SECRET;
const endpoint_url = environment === 'sandbox' ? 'https://api-m.sandbox.paypal.com' : 'https://api-m.paypal.com';




////////
//////// Receive the order ID from the client.
//////// Use the order ID to make a request to PayPal's REST API (specifically, the GET /v2/checkout/orders/{orderID} endpoint) to verify the payment.
// In this example, the getAccessToken function obtains an access token by making a request to PayPal's OAuth endpoint. The verifyPayment function then uses this access token to make a request to the PayPal API to verify the payment.




const axios = require('axios');

// Function to get PayPal access token
async function getAccessToken() {
  //const clientId = 'YOUR_CLIENT_ID';
  //const clientSecret = 'YOUR_CLIENT_SECRET';
  const client_id = process.env.CLIENT_ID;
  const client_secret = process.env.CLIENT_SECRET;

  const auth = Buffer.from(`${clientId}:${clientSecret}`).toString('base64');
  const headers = {
    'Content-Type': 'application/x-www-form-urlencoded',
    'Authorization': `Basic ${auth}`,
  };

  const data = 'grant_type=client_credentials';

  try {
    const response = await axios.post('https://api.paypal.com/v1/oauth2/token', data, { headers });
    return response.data.access_token;
  } catch (error) {
    console.error('Error getting PayPal access token:', error.message);
    alert('Error getting PayPal access token:', error.message);
    throw error;
  }
}

// Function to verify payment with PayPal API
async function verifyPayment(orderId) {
  const accessToken = await getAccessToken();

  const headers = {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${accessToken}`,
  };

  try {
    const response = await axios.get(`https://api.paypal.com/v2/checkout/orders/${orderId}`, { headers });
    // Handle the response to verify the payment details
    const paymentDetails = response.data;
    console.log('Payment details:', paymentDetails);
    return paymentDetails;
  } catch (error) {
    console.error('Error verifying payment with PayPal:', error.message);
    throw error;
  }
}

// Use these functions in your route handling code
app.post('/api/verify-payment', async (req, res) => {
  const orderId = req.body.orderId;
  try {
    const paymentDetails = await verifyPayment(orderId);
    // Process the payment details and update your database
    res.json({ success: true, message: 'Payment verified successfully', paymentDetails });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error verifying payment' });
  }
});






app.use(bodyParser.json());
app.use(express.json());
app.use(express.urlencoded({
    extended: true
}));
app.use(cors());

// Define your routes here (e.g., for handling to-do items)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

