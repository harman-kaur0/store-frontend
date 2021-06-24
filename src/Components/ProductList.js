import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class ProductList extends Component {
 

  render() {
    return (
      <div>
        <h1>Product List Here!</h1>
        {this.props.products.map((p) => (
          <div className="products" onClick= {() => this.props.history.replace(`/products/item/${p.id}`)} key={p.id}>
            <img src={p.image} alt={p.name} className="productsImg" />
            <h6>{p.name}</h6>
            <h4>$ {p.price}</h4>
          </div>
        ))}
      </div>
    );
  }
}

export default withRouter(ProductList)