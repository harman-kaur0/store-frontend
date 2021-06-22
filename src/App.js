
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Home from './Containers/Home'
import Login from './Components/Login'
import Navigation from './Navigation'
import React, { Component } from 'react';


class App extends Component {
  state = {
    user: ""
  }

  componentDidMount(){
    if (localStorage.getItem('jwt')){
      fetch('http://localhost:3000/getuser', {
        method: "GET",
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('jwt')}`
        }
      })
      .then(res => res.json())
      .then(data => this.setState({user: data.user}))
    }
  }
  render(){
    return (
      <div>
        <Router>
          <Navigation/>
          <Route exact path='/' render={() => <Home/>}/>
          <Route exact path='/login' render={() => <Login/>}/>
        </Router>
      </div>
    )
  }
}

export default App;
