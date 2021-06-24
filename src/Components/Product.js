import { Component } from "react";
import { withRouter } from "react-router-dom";
import CommentList from "./CommentList";

class Product extends Component {
  state = {
    productView: false,
  };
  // Miles: PRODUCT COMPONENT WILL NOT BE A STATEFUL COMPONENT
  // (add Filter Method to find comments by user_id, then map)

  // itemId = parseInt(this.props.location.pathname.split("/item/")[1]);

  // handleClick = () => {
  //     if (this.props.user){
  //         this.props.history.push()
  //     }
  // }

  handleToggle = () => {
    this.props.history.push(`/products/item/${this.props.product.id}`)
    this.setState({ productView: !this.state.productView })
  };

  render() {
    // console.log(this.props)

    // if id is from routerProps or from PropductList, render conditionally
    console.log(this.props.product);
    return this.state.productView ? (
      <div>
        <h1>This.state.productView is false</h1>
        <CommentList comments={console.log("comments")} />
      </div>
    ) : (
      <div
        onClick={this.handleToggle
          
        }
      >
        <h1>Testing</h1>
        <div className="products">
          <img
            src={this.props.product.image}
            alt={this.props.product.name}
            className="productsImg"
          />
          <h6>{this.props.product.name}</h6>
          <h4>$ {this.props.product.price}</h4>
        </div>
      </div>
    );
  }
}

export default withRouter(Product);
