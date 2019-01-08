import React from "react";
import Message from "./Message";
class MessageList extends React.Component {
  render() {
    const { messages } = this.props;
    return (
      <div className="message-list">
        {messages.map((message, index) => {
          return (
            <Message
              key={index}
              username={message.senderId}
              text={message.text}
            />
          );
        })}
      </div>
    );
  }
}

export default MessageList;
