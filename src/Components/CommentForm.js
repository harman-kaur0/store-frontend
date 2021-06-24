import { Component } from "react";
import {withRouter} from 'react-router-dom'

class CommentForm extends Component {
    state = {
        rating: "",
        title: "",
        text: ""
    }

    itemId = parseInt(this.props.location.pathname.split("/comment/")[1])

    handleChange = (e) => {
        this.setState({[e.target.name]: e.target.value})
    }

    componentDidMount() {
        let commentObj = this.props.comments.find(c => c.user_id === this.props.user.id && c.product_id === this.itemId)
        commentObj ? this.setState({
            title: commentObj.title,
            text: commentObj.text 
        }) : console.log()
    }

    postComment = (comment, itemId, userId) => {
        fetch("http://localhost:3000/api/v1/comments", {
          method: "POST",
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
          },
          body: JSON.stringify({text: comment.text, title: comment.title, product_id: itemId, user_id: userId})
        })
        .then(resp => resp.json())
        .then(data => {
           this.props.setComments([...this.props.comments, data]) 
           this.props.history.replace(`/products/item/${this.itemId}`);
        })
    
      }

    updateComment = (comment, id) => {
        fetch(`http://localhost:3000/api/v1/comments/${id}`, {
            method: "PATCH",
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            },
            body: JSON.stringify({text: comment.text, title: comment.title})
        })
        .then(resp => resp.json())
        .then(data => {
            let comments = this.props.comments.map(c => c.id === id ? data : c)
            this.props.setComments(comments)
            this.props.history.replace(`/products/item/${this.itemId}`)
        })
    }

    handleSubmit = (e) => {
        let obj={text: this.state.text, title: this.state.title}
        let commentObj = this.props.comments.find(c => c.user_id === this.props.user.id && c.product_id === this.itemId)
        e.preventDefault();
        commentObj ? this.updateComment(obj, commentObj.id):
        this.postComment(obj, this.itemId, this.props.user.id)
    }
    render (){
        return (
            <div className="comment-form">
                <form>
                    <div className="rating">
                        <input id="star5" name="rating" type="radio" value="5" className="radio-btn hide" onChange={this.handleChange}/>
                        <label htmlFor="star5" className= "star">☆</label>
                        <input id="star4" name="rating" type="radio" value="4" className="radio-btn hide" onChange={this.handleChange}/>
                        <label htmlFor="star4" className= "star">☆</label>
                        <input id="star3" name="rating" type="radio" value="3" className="radio-btn hide" onChange={this.handleChange}/>
                        <label htmlFor="star3" className= "star">☆</label>
                        <input id="star2" name="rating" type="radio" value="2" className="radio-btn hide" onChange={this.handleChange}/>
                        <label htmlFor="star2" className= "star">☆</label>
                        <input id="star1" name="rating" type="radio" value="1" className="radio-btn hide" onChange={this.handleChange}/>
                        <label htmlFor="star1" className= "star">☆</label>
                        <div className="clear"></div>
                    </div>
                </form>
                <form className="comment" onSubmit={this.handleSubmit}>
                    <input type="text" name="title" onChange={this.handleChange} value={this.state.title}/>
                    <textarea name="text" onChange={this.handleChange} value={this.state.text}></textarea>
                    <input type="submit"/>
                </form>
            </div>
        )
    }
}

export default withRouter(CommentForm)