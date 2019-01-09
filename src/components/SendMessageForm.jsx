import React from "react";
import { throws } from "assert";

class SendMessageForm extends React.Component {
  constructor() {
    super();
    this.state = { message: "" };
    this.handleChange = this.handleChange.bind(this);
  }
  handleChange(e) {
    this.setState({ message: e.target.value });
  }
  render() {
    return (
      <form className="send-message-form">
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
