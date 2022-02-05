import React, {useState, useEffect} from "react";
import { FooterMessage, HeaderMessage } from "./components/common/WelcomeMessage";

import { Button, Divider, Form, Message, Segment } from "semantic-ui-react";

const login = () => {


  const [user, setUser] = useState({
      email: "",
      password:"",
  });

const {email, password} = user;


//*States*//
const [showPassword, setShowPassword] = useState(false);
const [errorMsg, setErrorMsg] = useState(null);
const [formLoading, setFormLoading] = useState(false);
const [submitDisabled, setSubmitDisabled] = useState(true);


//*Handlers */

const handleChange = (e) => {
    const {name, value} = e.target;

    setUser((prev) => ({...prev, [name]: value}));
}

const handleSubmit = (e) => {
    e.preventDefault();
    setErrorMsg("Something went wrong ")
}



//*Effects*/
useEffect(() => {
    setSubmitDisabled(!email && password);
}, [user]);





 return (
     
 <>
 <HeaderMessage/>

 <Form
 loading={formLoading}
 error={errorMsg !== null}
 onSubmit={handleSubmit}
 >


     <Message 
     error
     header="Oops!"
     content={errorMsg}
     onDismiss={() => setErrorMsg(null)}
     />

     <Segment >
         <Form.Input
            required
            label="Email"
            placeholder="Email"
            value={email}
            onChange={handleChange}
            name="email"
            icon="envelope"
            iconPosition="left"

         
         />
         <Form.Input 
         required
         label="Password"
         placeholder="Password"
         value={password}
         onChange={handleChange}
         name="password"
         icon={{
            name: showPassword ? "eye slash" : "eye",
            link:true,
            circular: true,
            onClick: () => {setShowPassword(!showPassword)},

        }}
         iconPosition="left"
         type={showPassword ? "text" : "password"}
         
        />
         <Divider hidden/>
         <Button 
         color="green"
         content="login"
         icon="signup"
         type="submit"
         disabled={submitDisabled}
         />
     </Segment>
 </Form>
 <FooterMessage />
 </>

 );
}


export default login