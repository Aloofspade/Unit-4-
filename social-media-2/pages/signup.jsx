import React from "react";
import { FooterMessage, HeaderMessage } from "../components/common/WelcomeMessage";
import { useState } from "react";
import { Form, Segment } from "semantic-ui-react";
import { regexUserName } from "../utils/valUsername";


const signup = () => {
    const [user, setUser] = useState({
        name: "",
        email:"",
        password:"",
        bin:"",
    })

    const {name, email, password, bin} = user;
    return<> 
    <HeaderMessage/>
    <FooterMessage/>
    </>
}
export default signup