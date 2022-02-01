import HeadTags from "./HeadTags"
import Navbar from "./Navbar"
import { Container } from "semantic-ui-react"


//! this is for the nprogress bar 
import nprogress from "nprogress";
import Router from "next/router"



const layout = ({children}) => {
  Router.onRouteChangeStart = () => nprogress.start();
  Router.onRouteChangeComplete = () => nprogress.done();
  Router.onRouteChangeError = () => nprogress.done();
  
  return <>
  <HeadTags />
  <Navbar />
  <Container text>{children}</Container>
  
  </>
};

export default layout;
