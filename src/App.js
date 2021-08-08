import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Containers/Home";
import Login from "./Components/Login";
import SignUp from "./Components/SignUp";
import Product from "./Components/Product";
import CommentForm from "./Components/CommentForm";
import ProductList from "./Components/ProductList";
import SearchPage from "./Components/SearchPage";
import ShoppingCart from "./Containers/ShoppingCart"
import UserOrders from "./Containers/UserOrders"
import Navigation from "./Navigation";
import React, { Component } from "react";
import {withRouter} from 'react-router-dom'

class App extends Component {
  state = {
    user: "",
    products: [],
    comments: [],
    categories: [],
    items: [],
    orders: []
  }

  handleLogout = () => {
    localStorage.removeItem('jwt')
    localStorage.setItem('cart', JSON.stringify([]))
    this.setState({user: null})
  }

  setOrders = orders => {
    this.setState({orders: orders})
  }

  setUser = user => {
    this.setState({user: user})
  }

  setComments = comment => {
    this.setState({comments: comment})
  }

  setItems = items => {
    this.setState({items: items})
  }

  componentDidMount(){
    if (localStorage.getItem('jwt')){
      fetch('http://localhost:3000/api/v1/getuser', {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("jwt")}`,
        },
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data)
          this.setState({ user: data.user })
          this.setState({orders: data.user.orders})
        });
    }

    fetch("http://localhost:3000/api/v1/products")
    .then( resp => resp.json())
    .then((data) => {
      let category = data.map(item => item.category.name);
      category = Array.from(new Set(category)).map(c => c.split(" & ").map(word => word[0].toUpperCase()+word.slice(1)).join(" & "));
      this.setState({ products: data, categories: category});
    });

    fetch("http://localhost:3000/api/v1/comments")
    .then( resp => resp.json())
    .then((data) => {
      this.setState({ comments: data });
    });

    localStorage.getItem('cart').length ? this.setState({items: JSON.parse(localStorage.getItem('cart'))}) : console.log()
    this.state.user ?  this.setState({items: this.state.user.cart }) : console.log()
  }

  componentDidUpdate(_, prevState) {
    if (this.state.user !== prevState.user) {
      this.setState({items: this.state.user ? this.state.user.cart : console.log()})
    }
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

  patchUserCart = (id, quantity, user = this.state.user) => {
    let obj = {
      product_id: id,
      quantity: quantity
    }
    
    let shoppingCart = user.cart
    let findCart = shoppingCart.find(o => o.product_id === id)

    if (findCart) {
      shoppingCart = shoppingCart.map(o => o.product_id === id ? {...o, quantity: quantity} : o)
    }else {
      shoppingCart.push(obj)
    }


    const config = {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        'Authorization': `Bearer ${localStorage.getItem('jwt')}`
      },
      body: JSON.stringify({cart: shoppingCart})
    }

    fetch(`http://localhost:3000/api/v1/users/${user.id}`, config)
    .then(resp => resp.json())
    .then(data => {
      this.setUser({...this.state.user, cart: data.cart})
      this.setItems(data.cart)
    })
  }

 emptyUserCart = () => {
    const config = {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json",
            'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        },
        body: JSON.stringify({cart: []})
    }

    fetch(`http://localhost:3000/api/v1/users/${this.state.user.id}`, config)
    .then(resp => resp.json())
    .then(data => {
        this.setUser({...this.state.user, cart: data.cart})
        this.setItems(data.cart)
})
}


  
  render() {
    return (
      <div>
        <Router>
          <Navigation user={this.state.user}  handleLogout= {this.handleLogout} searchProducts={this.searchProducts} categories={this.state.categories} items={this.state.items}/>
          <Route exact path='/' render={() => <Home products={this.state.products}/>}/>
          {this.state.user ? null : <><Route exact path='/login' render={() => <Login setUser={this.setUser} patchUserCart={this.patchUserCart}/>}/>
          <Route exact path='/signup' render={() => <SignUp setUser={this.setUser}/>}/></>}
          <Route exact path="/products" render= {() => <ProductList products={this.state.products}  />}/>
          <Route path="/products/item/" render={() => <Product products={this.state.products} setComments={this.setComments} user= {this.state.user} comments={this.state.comments} setUser={this.setUser} patchUserCart={this.patchUserCart} setItems={this.setItems}/>}/>
          <Route path="/comment" render={() => <CommentForm setComments={this.setComments} comments={this.state.comments} user={this.state.user} products={this.state.products}/>}/>
          <Route path="/search" render={() => <SearchPage products={this.state.products} handleFilterSort={this.handleFilterSort}/>}/>
          <Route path="/cart" render={() => <ShoppingCart 
                                              user={this.state.user} 
                                              products={this.state.products} 
                                              patchUserCart={this.patchUserCart} 
                                              setUser={this.setUser}
                                              items={this.state.items} 
                                              setItems={this.setItems} 
                                              emptyUserCart={this.emptyUserCart}
                                              orders={this.state.orders}
                                              setOrders={this.setOrders}
                                            />}/>
          <Route path="/orders" render={() => <UserOrders orders={this.state.orders} user={this.state.user} products={this.state.products} patchUserCart={this.patchUserCart}/>}/>
        </Router>
      </div>
    );
  }
}

export default withRouter(App);