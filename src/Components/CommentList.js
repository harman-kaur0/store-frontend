import React, { Component, useState } from "react";
import {useHistory} from 'react-router-dom'
import {Modal, Button} from "react-bootstrap"

const CommentList = ({productComments, userProductComment, deleteComment }) => {
  const [show, setShow] = useState(false)
  const history = useHistory()

  const deleteUserComment = () => {
    deleteComment(userProductComment.id)
    setShow(false)
  }

  const handleRating = (comment) => {
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
        return;
    }
  }

  return (
    <div className="comments-container">
      {productComments.map((comment) => (  
        <div className="comment-section" key={comment.id}>
            {comment === userProductComment ?
          <div className="edit-buttons">
              <button onClick={() => history.push(`/comment/${comment.product.id}`)}>
                Edit
              </button>
              <button onClick={() => setShow(true)}>
                X
              </button>
            </div>: null }
            <div className="review-heading">
              <h4>{comment.user.name}</h4> 
              <h6>{handleRating(comment.rating)}</h6>  
            </div>
            <div className="review-title">
              <h3>{comment.title}</h3>
              <h6>{comment.text}</h6>
            </div>
        </div>
      ))}
      <Modal show={show} onHide={() => setShow(false)} animation={false} keyboard={false} backdrop="static">
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to delete your comment?</Modal.Title>
        </Modal.Header>
        <Modal.Footer>
          <Button variant="primary" onClick={() => setShow(false)}>
            No
          </Button>
          <Button variant="danger" onClick={() => deleteUserComment()}>
            Yes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default CommentList;
