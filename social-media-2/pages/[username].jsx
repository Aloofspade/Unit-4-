import React, { useState, useEffect } from 'react'
import { useRouter} from "next/router"
import axios from "axios"
import { baseURL } from './util/baseURL'
import { parseCookies } from 'nookies'
import Cookies from 'js-cookie'
import CardPost from "./components/post/CardPost"
import { Grid } from 'semantic-ui-react'
import ProfileHeader from './components/profile/ProfileHeader'
import ProfileMenuTabs from './components/profile/ProfileMenuTabs'



const ProfilePage = ({
    errorLoading,
    profile,
    followersLength,
    followingLength,
    user,
    followData
    
}) => {

    const router = useRouter();
    const {username} = router.query;
    const ownAccount = profile.user._id === user._id;
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false)
    const [activeItem, setActiveItem] = useState("profile")
    const [loggedUserFollowStats, setLoggedUserFollowStats] = useState(followData)

    const handleItemClicked = (clickedTab) => setActiveItem(clickedTab)

    useEffect(() => {
      const getPosts = async () => {
        setLoading(true)

        try {
            const {username} = router.query;
            const res = await axios.get(`${baseURL}/api/v1/posts/${username}`, {
                header: {Authorization: `Bearer ${Cookies.get("token")}  `},
            })
            setPosts(res.data)
        } catch (error) {
            console.log("error @ loading posts");
        }
        setLoading(false)
      }
    
      getPosts();
      
    }, [router.query.username])
    

   





  return (
    <>
    <Grid.Row>
        <Grid.Column>
            <ProfileMenuTabs
            activeItem={activeItem}
            handleItemClicked={handleItemClicked}
            followersLength={followersLength}
            followingLength={followingLength}
            ownAccount = {ownAccount}
            loggedUserFollowStats={loggedUserFollowStats}
            />
        </Grid.Column>
    </Grid.Row>
    <Grid.Row>
        <Grid.Column>
            {activeItem === 'profile' && (
                <>
                <ProfileHeader
                profile={profile}
                ownAccount={ownAccount}
                loggedUserFollowStats={loggedUserFollowStats}
                setLoggedUserFollowStats={setLoggedUserFollowStats}
                
                />
                </>
            )}
        </Grid.Column>
    </Grid.Row>
    </>
  )
};

const getUserPosts = async (req, res) => {
try {
    const {username} = req.params;
    const user = await UserModel.findOne({username: username.toLowerCase()})

    if(!user) {
        return res.status(404).send("user not found")


    }

    const posts = await PostModel.find({user: user._id})
    .sort({createAt: -1})
    .populate("user")
    .populate("comments.user")

    return res.status(200).json(posts)
} catch (error) {
    console.log(error);
    return res.status(500).send("Error @ getUserPosts")
}
}

ProfilePage.getInitialProps = async (ctx) => {
try {
    const {username} = ctx.query
    const {token} = parseCookies(ctx)
    const res = await axios.get(`${baseURL}/api/v1/profile/posts/${username}`, {
        header: {Authorization: `Bearer ${token}`},
    })

    const {profile, followersLength, followingLength} = res.data;
    return {profile, followingLength, followersLength}
} catch (error) {
    return {errorLoading: true}
}
}

export default {ProfilePage, getUserPosts}