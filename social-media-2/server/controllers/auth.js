const { default: isEmail } = require("validator/lib/isEmail");
const UserModel = require("../models/UserModel");

const jwt = require('jsonwebtoken')

const postUserLogin = async (req, res) => {
    

   {
        const {email, password} = req.body.user 
        if(!isEmail(email)) return res.status(401).send("Invalid Email");
        if(password.length < 6) return res.status(401).send("Must be at least 6 chars long");

        try{
            const user = await UserModel.findOne({email: email.toLowerCase()}).select('+password');

            if(!user) return res.status(401).send("Invalid Credentials");

            const isPassword = await bcrypt.compare(password, user.password);
            if(!isPassword) return res.status(401).send("Invalid Credentials");
            
            const payload = {userId: user._id}

            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                {expiresIn: "2d"},
                (err, token) => {
                    if(err) throw err 
                    res.status(200).json(token);
                }
            )
        } catch (error) {
            console.log(error);

            return res.status(500).send("Server Error")
        }
    }


   
}

module.exports = {postUserLogin}