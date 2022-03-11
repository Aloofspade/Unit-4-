import React from "react";
import { Menu } from "semantic-ui-react";

const ProfileMenuTabs = ({
  activeItem,
  handleItemClicked,
  followersLength,
  followingLength,
  ownAccount,
  loggedUserFollowStats,
}) => {
  return (
    <>
      <Menu pointing secondary>
        <Menu.Item
          name="profile"
          active={activeItem === "profile"}
          onClick={() => handleItemClicked("profile")}
        />
        <Menu.Item
          name={`${followersLength} followers`}
          active={activeItem === "followers"}
          onClick={() => handleItemClicked("followers")}
        />
        <Menu.Item
          name={`${followingLength} following`}
          active={activeItem === "following"}
          onClick={() => handleItemClicked("following")}
        />
        {ownAccount && (
          <>
            <Menu.Item
              name="Update Profile"
              active={activeItem === "updateProfile"}
              onClick={() => handleItemClicked("updateProfile")}
            />
            <Menu.Item
              name="Update Settings"
              active={activeItem === "updateSettings"}
              onClick={() => handleItemClicked("updateSettings")}
            />
          </>
        )}
      </Menu>
    </>
  );
};

export default ProfileMenuTabs;
