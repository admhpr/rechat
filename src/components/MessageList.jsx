import React from "react";
import ReactDOM from "react-dom";
import Message from "./Message";
import logo from "../../assets/rechat-logo.png";
class MessageList extends React.Component {
  componentWillUpdate() {
    const node = ReactDOM.findDOMNode(this);
    this.shouldScrollToBottom =
      node.scrollTop - node.clientHeight + 100 >= node.scrollHeight;
  }
  componentDidUpdate() {
    if (this.shouldScrollToBottom) {
      const node = ReactDOM.findDOMNode(this);
      node.scrollTop = node.scrollHeight;
    }
  }
  render() {
    const { messages } = this.props;
    if (!this.props.roomId) {
      return (
        <div className="message-list">
          <div className="join-room">
            <img className="logo" src={logo} alt="logo" />
            &larr; Join a room!
          </div>
        </div>
      );
    }
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
