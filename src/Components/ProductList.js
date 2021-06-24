import React, { Component } from "react";
import { withRouter } from "react-router-dom";
import Product from "./Product";

class ProductList extends Component {
  state = {
    products: [],
  };

  componentDidMount() {
    console.log(this.props.token);
    fetch("http://localhost:3000/api/v1/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ products: data });
      });
  }

  findProduct = () => {
    let product = this.state.products.filter(
      (product) => product.id === parseInt(this.props.productId)
    );
    product = product[0];
    return <Product key={product.id} product={product} />;
  };

  render() {
    const allProducts = this.state.products.map((product) => (
      <Product key={product.id} product={product} />
    ));
    return (
      <div>
        <h1>Product List Here!</h1>
        {this.props.products.map((p) => (
          <div className="products" onClick= {() => this.props.history.replace(`/products/item/${p.id}`)} key={p.id}>
            <img src={p.image} alt={p.name} className="productsImg" />
            <h6>{p.name}</h6>
            <h4>$ {p.price}</h4>
          </div>
        ))} */}
      </div>
    );
  }
}

export default withRouter(ProductList);
