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
      messages: [],
      joinableRooms: [],
      joinedRooms: []
    };
    this.sendMessage = this.sendMessage.bind(this);
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

      this.currentUser
        .getJoinableRooms()
        .then(joinableRooms => {
          this.setState({
            joinableRooms,
            joinedRooms: this.currentUser.rooms
          });
        })
        .catch(err => console.log("error on joinableRooms: ", err));

      this.subscribeToRoom();
    });
  }

  subscribeToRoom() {
    this.currentUser
      .subscribeToRoom({
        roomId: 19385003,
        hooks: {
          onNewMessage: message => {
            this.setState({
              messages: [...this.state.messages, message]
            });
          }
        }
      })
      .catch(err => console.log("error on subsubscribe to room: ", err));
  }

  sendMessage(text) {
    this.currentUser.sendMessage({ text, roomId: 19385003 });
  }
  render() {
    const { joinedRooms, joinableRooms } = this.state;
    return (
      <div className="app">
        <RoomList rooms={[...joinedRooms, ...joinableRooms]} />
        <MessageList messages={this.state.messages} />
        <SendMessageForm sendMessage={this.sendMessage} />
        <NewRoomForm />
      </div>
    );
  }
}

export default App;
