import HeadTags from "./HeadTags"
import Navbar from "./Navbar"
import {createRef} from "react"
import { Container , Grid, Ref, Segment, Sticky, Visibility} from "semantic-ui-react"


//! this is for the nprogress bar 
import nprogress from "nprogress";
import Router from "next/router"



const layout = ({children, user }) => {
  Router.onRouteChangeStart = () => nprogress.start();
  Router.onRouteChangeComplete = () => nprogress.done();
  Router.onRouteChangeError = () => nprogress.done();
  
  //createRef will update the reference on re-render 
  //useref will only update on refresh
  const contextRef = createRef();


  return (
  <>
  <HeadTags />
  {user ? 
  ( 
  <>
  <div style={{ marginLeft: "1rem", marginRight: "1rem"}}>
    <Ref innerRef={contextRef}>
     <Grid>
       <Grid.Column floated="left" width={2}>
         <Sticky context={contextRef}>
           <SideMenu user={user}/>
         </Sticky>
       </Grid.Column>

       <Grid.Column width={10}>
        <Visibility context={contextRef}>
          {children}
        </Visibility>
       </Grid.Column>

       <Grid.Column floated="right" width={3}>
        <Sticky context={contextRef}>
          <Segment basic>
            <Search />
          </Segment>
        </Sticky>
       </Grid.Column>
     </Grid>
    </Ref>
  </div>
  
  </> 
  
  ):(
  
  <> 
    <Navbar />
  <Container text>{children}</Container>
  </>
  )}

 
  
  </>

  )
};

export default layout;
