import React from 'react';
import {List, Icon, Divider} from 'semantic-ui-react'
import Link from 'next/link'
import {useRouter, userRouter} from "next/router"
import {logoutUser} from '../../utils/authUser'



const SideMenu = ({
    user:{unreadNotification, email, unreadMessage, username}
}) => {
    const router = useRouter();
    const isActive = route => router.pathname === route; 

  return ( <> 
   <List 
   style = {{paddingTop: "1rem"}}
   size="big"
   verticalAlign='middle'
   selection
   color="teal"

   >
       <Link href='/'>

           <List.Item active={isActive('/')}>
               <Icon name="home" size='large' color={isActive('/') && 'teal'} />
               <List.Content>
                   <List.Header content="Home"/>
               </List.Content>
           </List.Item>
       </Link>

   </List>
 <Divider hidden/>
    
    <Link href='/messages'>

           <List.Item active={isActive('/')}>
               <Icon 
               name={unreadMessage ? "hand point right" : "mail outline"} 
               size='large' 
               color={(isActive('/messages') && 'teal') || (unreadMessage &&  'orange') } 
               />
               <List.Content>
                   <List.Header content="Messages"/>
               </List.Content>
           </List.Item>
       </Link>

       <Divider hidden/>


       <Link href='/messages'>

           <List.Item active={isActive('/notifications')}>
               <Icon 
               name={unreadMessage ? "hand point right" : "bell outline"} 
               size='large' 
               color={(isActive('/notifications') && 'teal') || (unreadMessage &&  'orange') } 
               />
               <List.Content>
                   <List.Header content="Notifications"/>
               </List.Content>
           </List.Item>
       </Link>

       <Divider hidden/>
       <Link href={`/${username}`}>

<List.Item active={router.query.username === username}>
    <Icon 
    name="user"
    size='large' 
    color={router.query.username === username && 'teal' } 
    />
    <List.Content>
        <List.Header content="Account"/>
    </List.Content>
</List.Item>
</Link>

<Divider hidden/>
<List.Item onClick={() => logoutUser(email)}>
    <Icon name="log out" size='large' />
    <List.Content >
        <List.Header content="Logout" />
    </List.Content>
</List.Item>

  </>
  );
};

export default SideMenu;
