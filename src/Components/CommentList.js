import React, { Component } from "react";

export default class CommentList extends Component {
  handleRating(comment) {
    switch (comment) {
      case comment === 1:
        return "⭐";
      case comment === 2:
        return "⭐⭐";
      case comment === 3:
        return "⭐⭐⭐";
      case comment === 4:
        return "⭐⭐⭐⭐";
      case comment === 5:
        return "⭐⭐⭐⭐⭐";
      default:
        return "";
    }
  }

  render() {
    return (
      <div>
        {this.props.comments.map((comment) => (
          <div>
            <h1>{comment.title}</h1>
            <h6>{comment.text}</h6>
            <h6>{this.handleRating(comment.rating)}</h6>
          </div>
        ))}
      </div>
    );
  }
}
