import React, { useState, useEffect } from "react";
import { Button, Image, List, ListItem } from "semantic-ui-react";
import Spinner from "../layout/Spinner";
import { NoFollowData } from "../layout/NoData";
import { followUser, unfollowUser } from "../../util/profileActions";
import axios from "axios";
import { baseURL } from "../../util/baseURL";
import Cookies from "js-cookie";

const Following = ({
  user,
  loggedUserFollowStats,
  setUserFollowStats,
  profileUserId,
}) => {
  const [following, setFollowing] = useState([]);
  const [loading, setLoading] = useState(false);
  const [followLoading, setFollowLoading] = useState(false);

  useEffect(() => {
    const getFollowing = async () => {
      setLoading(true);
      try {
        const res = await axios.get(
          `${baseURL}/api/v1/profile/following/${profileUserId}`,
          { headers: { Authorization: `Bearer ${Cookies.get("token")}` } }
        );

        setFollowing(res.data);
      } catch (error) {
        console.log(error);
      }
      setLoading(false);
    };
    getFollowing();
  }, []);

  return (
    <>
      {loading ? (
        <Spinner />
      ) : following ? (
        following.map((follower) => {
          const isFollowing = loggedUserFollowStats.following.some(
            (each) => each.user === follower.user.id
          );

          return (
            <List key={follower.user._id} divided verticalAlign="middle">
              <List.Item>
                <List.Content floated="right">
                  {follower.user._id !== user._id && (
                    <Button
                      color={isFollowing ? "instagram" : "twitter"}
                      icon={isFollowing ? "check" : "add user"}
                      content={isFollowing ? "Following" : "Follow"}
                      disabled={followLoading}
                      onClick={async () => {
                        setFollowLoading(true);
                        isFollowing
                          ? await unfollowUser(
                              follower.user._id,
                              setLoggedUserFollowStats
                            )
                          : await followUser(
                              follower.user._id,
                              setLoggedUserFollowStats
                            );
                        setFollowLoading(false);
                      }}
                    />
                  )}
                </List.Content>
                <Image avatar src={follower.user.profilePicURL} />
                <List.Content as="a" href={`/${follower.user.username}`}>
                  {follower.user.name}
                </List.Content>
              </List.Item>
            </List>
          );
        })
      ) : (
        <NoFollowData followingComponent={true} />
      )}
    </>
  );
};

export default Following;
