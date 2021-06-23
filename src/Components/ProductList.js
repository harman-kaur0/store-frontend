import React, { Component } from "react";
import './ProductList.css'

export default class ProductList extends Component {
  state = {
    products: [],
  };

  componentDidMount() {
    fetch("http://localhost:3000/api/v1/products")
      .then( resp => resp.json())
      .then((data) => {
        console.log(data);
        this.setState({ products: data });
      });
  }

  render() {
    return (
      <div>
        <h1>Product List Here!</h1>
        <div style={{display: "flex"}}>
          {this.state.products.map((p) => (
            <article>
              <img src={p.image} alt="product thumbnail" style={{}}></img>
              <div className="card-wrapper">
                <div className="header-wrapper">
                  <div className="h1-wrapper">
                    <h1>
                      {p.name}
                    </h1>
                  </div>
                  <div className="h2-wrapper">
                    <h2>
                      $ {p.price}
                    </h2>
                  </div>
                </div>
                <p className="copy">
                  {p.description}
                </p>
              </div>
            </article>
          ))}
        </div>
      </div>
    );
  }
}
