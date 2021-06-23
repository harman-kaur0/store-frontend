import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'

class SignUp extends Component {
    state = {
        email: "",
        password: "",
        confirm: "",
        name: "",
        error: ""
    }

    handleAuthFetchSignUp = (info) => {
        fetch("http://localhost:3000/api/v1/users", {method: "POST", headers: {'Content-Type': 'application/json'}, 
        body: JSON.stringify({email: info.email, password: info.password, name: info.name})})
        .then(resp => resp.json()).then(data => {
            console.log(data)
            // this.props.setUser(data.user)
            // localStorage.setItem('jwt', data.jwt)
            // this.props.history.goBack();
        })
      }

    handleChange = e => {
        let {name, value} = e.target
        this.setState({[name]: value})
    }

    handleSubmit = e => {
        let obj = {email: this.state.email, password: this.state.password, name:this.state.name}
        e.preventDefault()
        this.handleAuthFetchSignUp(obj)
    }

    render(){
        return (
            <div className="login-content">
                <div className="login-container">
                    <div className="img-container">
                        <img src="https://images.squarespace-cdn.com/content/v1/548f6ec1e4b0ccccd2f1c61b/1540849315000-6L7WAX12MQF8IPKTN7HO/ke17ZwdGBToddI8pDm48kPoswlzjSVMM-SxOp7CV59BZw-zPPgdn4jUwVcJE1ZvWQUxwkmyExglNqGp0IvTJZamWLI2zvYWH8K3-s_4yszcp2ryTI0HqTOaaUohrI8PI6FXy8c9PWtBlqAVlUS5izpdcIXDZqDYvprRqZ29Pw0o/storytelling_assets_2_new_thumbnail.gif?format=1500w" alt="gif"/>
                    </div>
                    <div className="login">
                        <div className="heading-container">
                            <h1>WELCOME TO AMAZEN</h1>   
                        </div>
                        <div className="form-container">
                        <div><p>Sign Up to continue</p></div>
                            <div><p>Already a member? <a href="/login">Login</a></p></div>
                            <form onSubmit={this.handleSubmit} className="form">
                            {this.state.error ? <h5>error: {this.state.error}</h5>: null}
                                <label htmlFor="name">Name:</label>
                                <input type="text" name="name" value={this.state.name} onChange={this.handleChange}/>
                                <label htmlFor="email">Email:</label>
                                <input type="text" name="email" value={this.state.email} onChange={this.handleChange}/>
                                <label htmlFor="password">Password:</label>
                                <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                                <label htmlFor="password">Confirm Password:</label>
                                <input type="password" name="confirm" value={this.state.confirm} onChange={this.handleChange}/>
                                <button type="submit">Sign Up</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(SignUp);