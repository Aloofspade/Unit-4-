

const express = require("express");

const app = express()


//! imports this from the init Library 
const next = require("next");
const { connectDB } = require("./DB/connect");


//! find out if this is a div or production 

const dev = process.env.NODE_ENV !== "production";


//! creates a project with div error implants 
const nextApp = next({dev})


//! import req handlers for the server
const handler = nextApp.getRequestHandler();

const {connectDB} = require("./DB/connect")

const PORT = process.env.PORT || 3000;

require("dotenv").config()
app.use(express.json())


