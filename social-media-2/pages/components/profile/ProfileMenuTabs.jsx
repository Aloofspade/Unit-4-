import React from 'react'
import { Menu } from 'semantic-ui-react'


const ProfileMenuTabs = ({
    activeItem, 
    handleItemClick,
    followerLength,
    followingLength,
    ownAccount, 
    LoggedUserFollowData
}) => {
  return (
    <Menu pointing secondary>
        <Menu.Item 
        name='profile'
        active={activeItem === 'profile'}
        onClick={() => handleItemClick("profile")}
        />
        <Menu.Item 
        name={`${followerLength} followers`}
        active={activeItem === 'followers'}
        onClick={() => handleItemClick("followers")}
        />

        {ownAccount && (
            <>
            <Menu.Item 
            name='Update Profile'
            active={activeItem === 'updateProfile'}
            onClick={() => handleItemClick('updateProfile')}
            />
            <Menu.Item 
            name='Update Setting'
            active={activeItem === 'updateSetting'}
            onClick={() => handleItemClick('updateSetting')}
            />
            </>
        )}


        <Menu.Item 
        name={`${followingLength} following`}
        active={activeItem === 'following'}
        onClick={() => handleItemClick("following")}
        />
    </Menu>
  )
}

export default ProfileMenuTabs