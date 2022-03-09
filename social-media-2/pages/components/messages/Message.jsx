import React, { useState } from "react";
import { Icon, Popup } from "semantic-ui-react";
import calculateTime from "../../util/calculateTime";

const Message = ({ message, user, deleteMsg, bannerProfilePic, divRef }) => {
  const [showDeleteIcon, setShowDeleteIcon] = useState(false);
  const ifSender = message.sender === user._id;

  return (
    <div className="bubbleWrapper" ref={divRef}>
      <div
        className={ifSender ? "inlineContainer own" : "inlineContainer"}
        onClick={() => ifSender && setShowDeleteIcon(!deleteIcon)}
      >
        <img
          className="inlineIcon"
          src={ifSender ? user.profilePicURL : bannerProfilePic}
        />
        <div className={ifSender ? "ownBubble own" : "otherBubble Other"}>
          {message.msg}

          {deleteIcon && (
            <Popup
              triggerRef={
                <Icon
                  name="trash"
                  color="red"
                  style={{ cursor: "pointer" }}
                //   onClick={() => deleteMsg(message._id)}
                />
              }
              content="This will only delete this message from your inbox, not theirs"
              position="top right"
            />
          )}
        </div>
        <span className={ifSender ? "own" : "other"}>
          {calculateTime(message.date)}
        </span>
      </div>
    </div>
  );
};

export default Message;