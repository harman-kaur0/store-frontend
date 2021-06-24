import { Component } from "react";
import { withRouter } from "react-router-dom";
import CommentList from "./CommentList";

class Product extends Component {
  // Miles: PRODUCT COMPONENT WILL NOT BE A STATEFUL COMPONENT
  // (add Filter Method to find comments by user_id, then map)

  // itemId = parseInt(this.props.location.pathname.split("/item/")[1]);

  // handleClick = () => {
  //     if (this.props.user){
  //         this.props.history.push()
  //     }
  // }

  render() {
    // console.log(this.props)
    console.log(this.props.product)
    return (
      <div onClick={() => this.props.history.push(`/products/item/${this.props.product.id}`)}>
          <h1>Testing</h1>
          <div
            className="products"
            
          >
            <img src={this.props.product.image} alt={this.props.product.name} className="productsImg" />
            <h6>{this.props.product.name}</h6>
            <h4>$ {this.props.product.price}</h4>
          </div>
          <CommentList comments={console.log('comments')} />
      </div>
    );
  }
}

export default withRouter(Product);
