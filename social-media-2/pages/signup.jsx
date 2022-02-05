import React from "react";
import { FooterMessage, HeaderMessage } from "./components/common/WelcomeMessage";
import { useState ,  useEffect, useRef} from "react";
import { Divider, Form, FormInput, Segment, TextArea, Button, Message} from "semantic-ui-react";
import CommonSocials from "./components/common/CommonSocials";
import ImageDropDiv from "./components/common/ImageDropDiv";
import axios from "axios";
import { setToken } from "./util/authUser";
import catchErrors from './util/catchError'
let cancel;


const signup = () => {
    const [user, setUser] = useState({
        name: "",
        email:"",
        password:"",
        bio:"",
        twitter:"",
        youtube:"",
        instagram:"",
        facebook:"",
    })

    const {name, email, password, bio} = user;
    

    //* Form UseState */
    const [formLoading, setFormLoading] = useState(false);
    const [submitDisabled, setSubmitDisabled] = useState(true)
    const [errorMsg, setErrorMsg] = useState(null) 

    const [username, setUsername] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [usernameAvail, setUsernameAvail] = useState(true);
    const [usernameLoading, setUsernameLoading] = useState(false);


    const [showSocialLinks, setSocialLinks] = useState(false)

    const [hightlighted, sethHightlighted] = useState(false);

    const [media, setMedia] = useState(null);

    const [mediaPreview, setMediaPreview] = useState(null);
    const inputRef = useRef(null);
    //* Form useEffects */
useEffect (() => {
setSubmitDisabled((!name && password && email && username))
}, [user, username])

useEffect(() => {
    username === "" ? setUsernameAvail(false) : handleUsernameAvail
}, [username])



    //*Form Handlers */

const handleUsernameAvail = async () => {
// const cancelToken = axios.CancelToken;

    setUsernameLoading(true)

    try{
        cancel && cancel()
        const res = await axios.get(`/api/v1/user/${username}`, {
            cancelToken: new axios.CancelToken((canceler) => {
                cancel = canceler
            })
        })
        if(res.data === 'Available'){
            setUsernameAvail(true);
            setErrorMsg(null);
            setUser((prev) => ({...prev, username}))
        }
    } catch (err){
        setUsernameAvail(false)
        setErrorMsg("Username is not Available")

    }

    setUsernameLoading(false)
}

    const handleChange = (e) => {
        const {name, value, files} = e.target;

        if(name === 'media' && files.length) {
            setMedia(() => files[0])
            setMediaPreview(() => URL.createObjectURL(files[0]))
        } else {
        setUser((prev) => ({...prev, [name]: value}))
        }
    }


    const handleSubmit = async (e) => {
        e.preventDefault();

        setFormLoading(true)
        let profilePicURL;

        if(media !== null) {
            const formData = new FormData();
            formData.append("image", media, {
                Headers:{
                    "Content-Type": "multipart/form-data"
                }
            })

            const res   = await axios.post('/api/v1/uploads', formData);
            profilePicURL = res.data.src;
        }

        if(media !== null && !profilePicURL) {
            setFormLoading(false)
            return setErrorMsg("Error uploading image")
        }

        try {
            const res = await axios.post('/api/v1/user', {

                user, 
                profilePicURL,

            });
            setToken(res.data)
        } catch (error) {
            const errorMsg = catchErrors(error)
            setErrorMsg(errorMsg)
        }



        setFormLoading(false)
    }


    return (
    <> 
    <HeaderMessage/>
    <Form
    Loading={formLoading}
     error={errorMsg !== null} 
     onSubmit={handleSubmit}
    > 
   
        <Segment>
            <ImageDropDiv 
            handleChange={handleChange} inputRef={inputRef}
            setHightlighed={sethHightlighted} mediaPreview={mediaPreview}
            setMediaPreview={setMediaPreview}
            setMedia={setMedia} media={media}

            />

    <Message 
    error 
    content ={errorMsg}
    header="Oops"
    icon='meh'
    />
            <Form.Input 
            label="Name"
            required
            placeholder="Name"
            name="name"
            value={name}
            onChange={handleChange}
            icon="user"
            iconPosition="left"
            />
            <Form.Input 
            label="Email"
            required
            placeholder="Email"
            name="email"
            value={email}
            onChange={handleChange}
            icon="envelope"
            iconPosition="left"
            />
            <Form.Input 
            label="Password"
            required
            placeholder="Password"
            name="password"
            value={password}
            onChange={handleChange}
            icon={{
                name: showPassword ? "eye slash" : "eye",
                link:true,
                circular: true,
                onClick: () => {setShowPassword(!showPassword)},

            }}
            type={showPassword ?  "test" : "password"}
            iconPosition="left"
            />
            <Form.Input 
            loading={usernameLoading}
            error={!usernameAvail}
            label="Username"
            required
            placeholder="Username"
            name="username"
            value={username}
            onChange={(e) => {
                setUsername(e.target.value);

            }}
            icon={usernameAvail ? "check" : "close"}
            iconPosition="left"
            />

            <Divider hidden />
            <Form.Field 
            control={TextArea} 
            name="bio" 
            value={bio}
            onChange={handleChange}
            placeholder="Bio"
            />

            <CommonSocials 
            user={user}
            handleChange={handleChange}
            setShowSocialLinks={setSocialLinks}
            showSocialLinks={showSocialLinks}
            />
            <Button 
            icon="signup"
            content="Signup"
            type="submit"
            color="green"
            disabled={submitDisabled || !usernameAvail}
            />
        </Segment>
    </Form>
    <FooterMessage/>
    </>
    );
}
export default signup