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
      roomId: null,
      messages: [],
      joinableRooms: [],
      joinedRooms: []
    };
    this.sendMessage = this.sendMessage.bind(this);
    this.subscribeToRoom = this.subscribeToRoom.bind(this);
    this.getRooms = this.getRooms.bind(this);
    this.createRoom = this.createRoom.bind(this);
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
      this.getRooms();
    });
  }

  getRooms() {
    this.currentUser
      .getJoinableRooms()
      .then(joinableRooms => {
        this.setState({
          joinableRooms,
          joinedRooms: this.currentUser.rooms
        });
      })
      .catch(err => console.log("error on joinableRooms: ", errr));
  }

  subscribeToRoom(roomId) {
    this.setState({ messages: [] });
    this.currentUser
      .subscribeToRoom({
        roomId,
        hooks: {
          onNewMessage: message => {
            this.setState({ messages: [...this.state.messages, message] });
          }
        }
      })
      .then(room => {
        this.setState({ roomId: room.id });
        this.getRooms();
      })
      .catch(err => console.log("error on subsubscribe to room: ", err));
  }

  sendMessage(text) {
    this.currentUser.sendMessage({ text, roomId: this.state.roomId });
  }

  createRoom(roomName) {
    //TODO:
    console.log("roomName: ", roomName);
  }
  render() {
    const { joinedRooms, joinableRooms } = this.state;
    return (
      <div className="app">
        <RoomList
          roomId={this.state.roomId}
          subscribeToRoom={this.subscribeToRoom}
          rooms={[...joinedRooms, ...joinableRooms]}
        />
        <MessageList messages={this.state.messages} />
        <SendMessageForm sendMessage={this.sendMessage} />
        <NewRoomForm createRoom={this.createRoom} />
      </div>
    );
  }
}

export default App;
