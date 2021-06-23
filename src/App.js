import "./App.css";
import { BrowserRouter as Router, Route } from "react-router-dom";
import Home from "./Containers/Home";
import Login from "./Components/Login";
import ProductList from "./Components/ProductList";
import Navigation from "./Navigation";
import React, { Component } from "react";

class App extends Component {
  state = {
    user: "",
  }

  handleLogout = () => {
    localStorage.clear()
    this.setState({user: null})
  }

  setUser = user => {
    this.setState({user: user})
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
  }
  render() {
    return (
      <div> 
        <Router>
          <Navigation user={this.state.user}  handleLogout= {this.handleLogout}/>
          <Route exact path='/' render={() => <Home/>}/>
          {this.state.user ? null : <><Route exact path='/login' render={() => <Login setUser={this.setUser}/>}/>
          <Route exact path='/signup' render={() => <SignUp setUser={this.setUser}/>}/></>}
        </Router>
      </div>
    );
  }
}
