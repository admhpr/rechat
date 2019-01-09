import React from "react";
import Chatkit from "@pusher/chatkit";
import MessageList from "./components/MessageList";
import SendMessageForm from "./components/SendMessageForm";
import RoomList from "./components/RoomList";
import NewRoomForm from "./components/NewRoomForm";

import { instanceLocator, tokenUrl as url } from "./config.ts";
class App extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: []
    };
  }
  componentDidMount() {
    const chatManager = new Chatkit.ChatManager({
      instanceLocator,
      userId: "Admin",
      tokenProvider: new Chatkit.TokenProvider({
        url
      })
    });

    chatManager.connect().then(currentUser => {
      this.currentUser = currentUser;
      currentUser.subscribeToRoom({
        roomId: 19385003,
        hooks: {
          onNewMessage: message => {
            console.log("message.text: ", message.text);
            this.setState({
              messages: [...this.state.messages, message]
            });
          }
        }
      });
    });
  }

  sendMessage() {}
  render() {
    return (
      <div className="app">
        <RoomList />
        <MessageList messages={this.state.messages} />
        <SendMessageForm />
        <NewRoomForm />
      </div>
    );
  }
}

export default App;
