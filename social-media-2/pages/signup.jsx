import React from "react";
import { FooterMessage, HeaderMessage } from "../components/common/WelcomeMessage";
import { useState ,  useEffect, useRef} from "react";
import { Divider, Form, FormInput, Segment, TextArea, Button} from "semantic-ui-react";
import { regexUserName } from "../utils/valUsername";
import CommonSocials from "../components/common/CommonSocials";
import ImageDropDiv from "../components/common/ImageDropDiv";


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

    //*Form Handlers */
    const handleChange = (e) => {
        const {name, value} = e.target;
        setUser((prev) => ({...prev, [name]: value}))
    }


    const handleSubmit = (e) => {
        e.preventDefault()
    }


    return (
    <> 
    <HeaderMessage/>
    <Form
    Loading={formLoading} error={errorMsg !== null} onSubmit={handleSubmit}
    > 
        <Segment>
            <ImageDropDiv 
            handleChange={handleChange} inputRef={inputRef}
            setHightlighed={sethHightlighted} mediaPreview={mediaPreview}
            setMediaPreview={setMediaPreview}
            setMedia={setMedia} media={media}

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
                const test = regexUserName.test(e.target.value);
                if( test || regexUserName.test(e.target.value)){
                    setUsernameAvail(true)
                } else {
                    setUsernameAvail(false);
                }
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