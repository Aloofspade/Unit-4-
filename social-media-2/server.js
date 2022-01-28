
//* Express app setup
const express = require("express");

const app = express()

//* Next app setup

//! imports this from the init Library 
const next = require("next");



//! find out if this is a div or production 

const dev = process.env.NODE_ENV !== "production";


//! creates a project with div error implants 
const nextApp = next({dev})



//! import req handlers for the server
const handler = nextApp.getRequestHandler();


//* Express Middlewares 
const {connectDB} = require("./DB/connect")

const PORT = process.env.PORT || 3000;

require("dotenv").config()
app.use(express.json())

connectDB();

nextApp.prepare().then(() => {
    app.all('*', (req,res) => handler(req, res));
    app.listen(PORT, (err) => {
        if (err) console.log(err);
        else console.log(`Server listening @ ${PORT}`);
    })
})


