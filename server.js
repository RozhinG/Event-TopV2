//const express = require('express');
//const path = require('path');
//const bodyParser = require('body-parser');
//const cors = require('cors');
//const fetch = require("node-fetch");
//require("dotenv/config");


//import express from "express";
//import fetch from "node-fetch";
//import path from "path";
//import bodyParser from "bodyParser";
//import "dotenv/config";

import express from "express";
import fetch from "node-fetch";
import "dotenv/config";
import path from "path";
import axios from 'axios'

//const axios = require('axios');

const { PAYPAL_CLIENT_ID, PAYPAL_CLIENT_SECRET, PORT = 8888 } = process.env;
const base = "https://api-m.sandbox.paypal.com";
const app = express();

// host static files
app.use(express.static("client"));

// parse post params sent in body in json format
app.use(express.json());






//app.use(bodyParser.json());
//app.use(express.json());
//app.use(express.urlencoded({
    //extended: true
//}));
//app.use(cors());

//// Define your routes here (e.g., for handling to-do items)



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

