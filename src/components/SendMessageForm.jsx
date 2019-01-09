import React from "react";
import { throws } from "assert";

class SendMessageForm extends React.Component {
  constructor() {
    super();
    this.state = { message: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  handleChange(e) {
    this.setState({ message: e.target.value });
  }
  handleSubmit(e) {
    e.preventDefault();
    console.log(this.state.message);
  }
  render() {
    return (
      <form onSubmit={this.handleSubmit} className="send-message-form">
        <input
          value={this.state.message}
          onChange={this.handleChange}
          placeholder="Type your message here"
          type="text"
        />
      </form>
    );
  }
}

export default SendMessageForm;
