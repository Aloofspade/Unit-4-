
//* Express app setup
const express = require("express");
const {connectDB} = require("./server/util/connect")
const cloudinary = require('cloudinary').v2
const fileUpload = require('express-fileupload')
const {auth} = require('./server/middleware/auth')



require("dotenv").config()
cloudinary.config({
    cloud_name:process.env.CLOUD_NAME,
    api_key:process.env.CLOUD_KEY,
    api_secret:process.env.CLOUD_SECRET,
});

const app = express()
const PORT = process.env.PORT || 3000;

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
app.use(express.json())
app.use(fileUpload({useTempFiles : true}))



//* Routes 
const userRoutes = require('./server/routes/userRoutes')
const authRoutes = require('./server/routes/authRoute')
const uploadRoutes = require('./server/routes/uploadPicRoutes')
const searchRoutes = require('./server/routes/searchRoutes')
const postsRoutes = require('./server/routes/postsRoutes')

app.use('/api/v1/user', userRoutes)
app.use('/api/v1/auth', authRoutes)
app.use('/api/v1/uploads', uploadRoutes)
app.use('/api/v1/search', searchRoutes)
app.use("/api/v1/posts", auth, postsRoutes)
// app.use('/api/v1/search', require('./server/routes/searchRoutes'))





//* App Startup //

connectDB();

nextApp.prepare().then(() => {




    app.all('*', (req,res) => handler(req, res));
    app.listen(PORT, (err) => {
        if (err) console.log(err);
        else console.log(`Server listening @ ${PORT}`);
    })
})


