import React, { Component } from "react";

export default class ProductList extends Component {
  state = {
    products: [],
  };

  componentDidMount() {
    console.log("componentDidMount firing");
    fetch("http://localhost:3000/api/v1/products", {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        this.setState({ products: data });
      });
  }

  render() {
    return (
      <div>
        <h1>Product List Here!</h1>
        {this.state.products.map((p) => (
          <div>
            <li>p.name</li>
            <li>p.image</li>
            <li>p.price</li>
            <li>p.description</li>
          </div>
        ))}
      </div>
    );
  }
}
