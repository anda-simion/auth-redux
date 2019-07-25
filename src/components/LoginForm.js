import React, { Component } from "react";

export class LoginForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      user_name: "",
      password: ""
    };
  }

  handleInputChange = e => {
    let new_state = {};
    new_state[e.target.name] = e.target.value;
    this.setState(new_state);
  };

  submitForm = e => {
    e.preventDefault();
    this.props.onSubmit(this.state.user_name, this.state.password);
  };
  render() {
    return (
      <form onSubmit={this.submitForm}>
        <input type="text" name="user_name" value={this.state.user_name} onChange={this.handleInputChange} />
        <label>User</label>
        <br />
        <input type="password" name="password" value={this.state.password} onChange={this.handleInputChange} />
        <label>Password</label>
        <br />
        <input type="submit" value="Login" />
      </form>
    );
  }
}

export default LoginForm;
