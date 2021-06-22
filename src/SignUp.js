import React, { Component } from "react";

export default class SignUp extends Component {
  state = {
    nameValue: "",
    emailValue: "",
    name: "",
    email: "",
  };

  handleChange(e) {
    const target = e.target;
    const value = target.type === "checkbox" ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value,
    });
  }

  handleSubmit(e) {
    alert("A name was submitted: " + this.state.value);
    e.preventDefault();
  }

  render() {
    return (
      <div>
        <form onSubmit={(e) => this.setState({ value: e.target.value })}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={this.state.nameValue}
              onChange={this.handleChange}
            />
          </label>
          <label>
            Email:
            <input
              type="text"
              name="email"
              value={this.state.emailValue}
              onChange={this.handleChange}
            />
          </label>
          <input type="submit" value="Submit" />
        </form>
      </div>
    );
  }
}
