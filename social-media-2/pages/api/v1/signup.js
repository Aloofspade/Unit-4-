const UserModel = require('../../../models/UserModel')
const FollowerModel = require('../../../models/FollowerModel')
const ProfileModel = require('../../../models/ProfileModule')
const defaultProfilePic = require('../../../utils/defaultPic')

const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt')
const isEmail = require('validator/lib/isEmail')
const regexUsername = require('../../../utils/valUsername');


const signupRoute = async (req, res) => {

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //*GET ROUTE*//
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    if(req.method === "GET" && req.params){

        console.log(req.params);
        const {username} = req.params;

        try{ 
            if(username.length < 1) return res.status(401).send("Invalid")

            if(!regexUsername.text(username)) return res.status(401).send("Invalid")
            const user = await UserModel.findOne({
                username: username.toLowerCase()
            })

            if(user) return res.status(401).send("Username already taken")

            return res.status(200).send("Available")

        } catch (err){
            console.log(err);
        } 
    }

    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //*POST ROUTE*//
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   else if(req.method === "POST"){
       const {
           name,
           email, 
           username,
           password,
           bio,
           facebook,
           youtube,
           instagram,
           twitter
       } = req.body.user;
   

   if(!isEmail(email)) return res.status(401).send("Invalid")
   if(password.length < 6) {
       return res.status(401).send("Password Must be at least 6 chars long")

   }
   try{
       let user;
       user = await UserModel.findOne({email: email.toLowerCase()})
       if(user) return res.status(401).send("Email already used")

       user = new UserModel({
           name,
           email:email.toLowerCase(),
           username: username.toLowerCase(),
           password,
           profilePicURL: req.body.profilePicURL || defaultProfilePic,
       })

       user.password = await bcrypt.hash(password, 10);
      user =  await user.save();

             let profileFields = {};
             profileFields.user = user._id;
            if(bio) profileFields.bio = bio;
            profileFields.social = {};
           if(facebook) profileFields.social.facebook = facebook;
           if(twitter) profileFields.social.twitter = twitter;
           if(instagram) profileFields.social.instagram = instagram;
           if(youtube) profileFields.social.youtube = youtube;


           await new ProfileModel(profileFields).save();
           await new FollowerModel({
               user: user._id,
               followers: [],
               following: [],

           }).save();

       const payload = {userID: user._id};


       jwt.sign(
           payload,
           process.env.JWT_SECRET,
           {expiresIn: "2d"},
           (err, token) => {
            if(err) throw err;
            res.status(200).json(token);
           }
       );
   } catch (err) {
    console.log(err);

    return res.status(500).send('Server error')
    
   }

   




    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
    //*ERROR ROUTE*//
    //~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~
   }

    else {
        res.status(500).send("Method Not Supported");
    }
};


module.exports = signupRoute;