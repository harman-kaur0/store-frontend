import React, { Component } from 'react';
import Navbar from './Navbar';
import { Route, Switch } from 'react-router-dom';

export default class App extends Component {

  state = {
    login: "",
  }

  fetch()

  handleLogin = () => <Login history={this.props.history} />
  handleSignUp = () => <SignUp history={this.props.history} />
  handleHome = () => <Home history={this.props.history}/>
  handleUser = () => <User history={this.props.history} />

  render() {
    return (
      <div>
        <Navigation />
        <Switch>
          <Route path='/' exact component={this.handleLogin} />
          <Route path='/signup' exact component={this.handleSignUp} />
          <Route path='/home' exact component={this.handleHome} />
          <Route path='/profile' exact component={this.handleUser} />
        </Switch>
      </div>
    )
  }
}
