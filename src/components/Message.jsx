import React from "react";

function Message(props) {
  const { index, username, text } = props;
  console.log(props);
  return (
    <div key={index} className="message">
      <div className="message-username">{username}</div>
      <div className="message-text">{text}</div>
    </div>
  );
}

export default Message;
