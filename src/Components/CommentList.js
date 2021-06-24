import React, { Component } from "react";

export default class CommentList extends Component {
  handleRating(comment) {
    switch (comment) {
      case 1:
        return "⭐";
      case 2:
        return "⭐⭐";
      case 3:
        return "⭐⭐⭐";
      case 4:
        return "⭐⭐⭐⭐";
      case 5:
        return "⭐⭐⭐⭐⭐";
      default:
        return 0;
    }
  }

  render() {
    return (
      <div>
        {this.props.comments.map((comment) => (
          <div>
            <h1>{comment.title}</h1>
            <h6>{comment.text}</h6>
            <h6>{comment.rating}</h6>
            <h6>{this.handleRating(comment.rating)}</h6>
          </div>
        ))}
      </div>
    );
  }
}
