import React from "react";

function Message(props) {
  const { index, senderId, text } = props;
  return (
    <div key={index} className="message">
      <div className="message-username">{senderId}</div>
      <div className="message-text">{text}</div>
    </div>
  );
}

export default Message;
