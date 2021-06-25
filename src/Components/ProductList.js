import React, { Component } from "react";
import { withRouter } from "react-router-dom";

class ProductList extends Component {
  render() {
    return (
      <div style={{ margin: "20rem" }}>
<<<<<<< HEAD
       
        <h1>Product List Here!</h1>
        {this.props.products.map((p) => (
          <div
            className="products"
            onClick={() => this.props.history.replace(`/products/item/${p.id}`)}
            key={p.id}
          >
            <img src={p.image} alt={p.name} className="productsImg" />
            <h6>{p.name}</h6>
            <h4>$ {p.price}</h4>
          </div>
        ))}
=======
        <label for="products">Sort by:</label>
        <select
          id="products"
          name="products"
          onChange={(e) => this.props.handleFilterSort(e)}
        >
          <option value="most">Most Reviewed</option>
          <option value="newest">Newest Arrivals</option>
        </select>
        <div style={{ display: "flex", flexWrap: "wrap" }}>
          {this.props.products.map((p) => (
            <article
              onClick={() =>
                this.props.history.replace(`/products/item/${p.id}`)
              }
              key={p.id}
            >
              <img src={p.image} alt={p.name} />
              <div className="card-wrapper">
                <div className="header-wrapper">
                  <div className="h1-wrapper">
                    <h4
                      style={{
                        fontSize: ".3rem !important",
                        marginTop: "0",
                        marginBottom: "0",
                      }}
                    >
                      {p.name}
                    </h4>
                  </div>
                  <div className="h2-wrapper">
                    <h4
                      style={{
                        fontSize: ".5rem !important",
                        marginTop: "0",
                        marginBottom: "0",
                      }}
                    >
                      $ {p.price}
                    </h4>
                  </div>
                </div>
                <p className="copy">Click to Learn More</p>
              </div>
            </article>
          ))}
        </div>
>>>>>>> origin/main
      </div>
    );
  }
}

export default withRouter(ProductList);
