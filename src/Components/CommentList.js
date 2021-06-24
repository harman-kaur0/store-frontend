import React, { Component } from "react";

export default class CommentList extends Component {
  render() {
    return (
      <div className="products">
        {this.props.comments.map((comment) => (
          <div>
            <h6>{comment.title}</h6>
            <h6>{comment.user}</h6>
            <p>{comment.text}</p>
          </div>
        ))}
      </div>
    );
  }
}
