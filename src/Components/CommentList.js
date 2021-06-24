import React, { Component } from "react";

export default class CommentList extends Component {
  render() {
    return (
      <div>
        {this.props.comments.map((comment) => (
          <div>
            <h1>{comment.title}</h1>
            <h1>{comment.text}</h1>
          </div>
        ))}
      </div>
    );
  }
}
