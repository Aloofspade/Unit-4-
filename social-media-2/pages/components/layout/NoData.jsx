import {Message, Button} from "semantic-ui-react";

export const noProfilePosts = () => {

    return <>
    <Message 
    info 
    icon="meh"
    header="Sorry!"
    content="User has no posted yet."

    />
    <Button 
    icon="long arrow alternate left"
    content="Go Back"
    as="a"
    href="/"
    />
    </>
}

export const NoFollowData = ({
    profileName,
    followersComponent = false,
    followingComponent = false,
}) => {
    return  <>
    {followersComponent && (
        <Message 
        icon="user outline"
        info
        content={`${profileName.split(" ")[0]} does not have followers`}
        />
    )}

    {followingComponent && (
        <Message 
        icon="user outline"
        info
        content={`${profileName.split(" ")[0]} isn't following someone`}
        />
    )}
    </>
}
export const NoMessages = () => {
    return (
        <Message
        info
        icon="telegram plane"
        header="Sorry!"
        content="You Do not have any messages. Search above to find "
        />
    )
}

export const NoPosts = () => {
    return(
    <Message 
    info 
    icon="meh"
    header="Hey!"
    content="No Posts. Make sure you follow someone!"
    />
    )
}