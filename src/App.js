import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Containers/Home";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import Product from "./Components/Product";
import CommentForm from "./Components/CommentForm";
import ProductList from "./Components/ProductList";
import SearchPage from "./Components/SearchPage";
import Navigation from "./Navigation";
import React, { Component } from "react";
import {withRouter} from 'react-router-dom'

class App extends Component {
  state = {
    user: "",
    products: [],
    comments: [],
  }

  handleLogout = () => {
    localStorage.clear()
    this.setState({user: null})
  }

  setUser = user => {
    this.setState({user: user})
  }

  setComments = comment => {
    this.setState({comments: comment})
  }

  componentDidMount(){
    if (localStorage.getItem('jwt')){
      fetch('http://localhost:3000/api/v1/getuser', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => this.setState({ user: data.user }));
    }
    fetch("http://localhost:3000/api/v1/products")
    .then( resp => resp.json())
    .then((data) => {
      this.setState({ products: data, filteredProducts: data });
    });
    fetch("http://localhost:3000/api/v1/comments")
    .then( resp => resp.json())
    .then((data) => {
      this.setState({ comments: data });
    });
  }

  // sort based on total ratings of product id
  // filter by id for newest arrivals
  handleFilterSort = e => {
    let filteredProducts = []
    if (e.target.value === 'most') {
      filteredProducts = this.state.products.sort((a, b) => a.comments.length - b.comments.length) 
    } if (e.target.value === 'newest') {
      filteredProducts = this.state.products.sort((a, b) => b.id - a.id)
    }
    console.log('FilterSort func is firing.')
  }
  
  render() {
    return (
      <div> 
        <Router>
          <Navigation user={this.state.user}  handleLogout= {this.handleLogout} searchProducts={this.searchProducts}/>
          <Route exact path='/' render={() => <Home/>}/>
          {this.state.user ? null : <><Route exact path='/login' render={() => <Login setUser={this.setUser}/>}/>
          <Route exact path='/signup' render={() => <SignUp setUser={this.setUser}/>}/></>}
          <Route exact path="/products" render= {() => <ProductList products={this.state.products} handleFilterSort={this.handleFilterSort} />}/>
          <Route path="/products/item/" render={() => <Product products={this.state.products} setComments={this.setComments} user= {this.state.user} comments={this.state.comments} />}/>
          <Route path="/comment" render={() => <CommentForm setComments={this.setComments} comments={this.state.comments} user={this.state.user}/>}/>
          <Route path="/search" render={() => <SearchPage products={this.state.products}/>}/>
        </Router>
      </div>
    );
  }
}

export default withRouter(App);