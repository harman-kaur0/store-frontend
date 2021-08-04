import React, { Component } from 'react';
import {withRouter} from 'react-router-dom'
class Login extends Component {
    state = {
        email: "",
        password: "",
        error: ""
    }


    handleAuthFetchLogin = (info) => {
        fetch('http://localhost:3000/api/v1/login', {
          method: "POST",
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            email: info.email,
            password: info.password
          })
        })
        .then(res => res.json())
        .then(data => {
            console.log(data)
          if(data.error){
              this.setState({error: data.error})
          }else {
            this.props.setUser(data.user)
            localStorage.setItem('jwt', data.jwt)
            let cart = JSON.parse(localStorage.getItem('cart'))
            if (cart.length){
                cart.forEach(item => this.props.patchUserCart(item.product_id, item.quantity, data.user))
                localStorage.setItem('cart', [])
            }
            this.props.history.push(this.props.location.state.from);
          }
        })
    }

    handleSubmit = e => {
        let obj = {email: this.state.email, password: this.state.password}
        e.preventDefault()
        this.handleAuthFetchLogin(obj)  
    }


    handleChange = e => {
        let {name, value} = e.target
        this.setState({[name]: value})
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
                            <h1>WELCOME BACK</h1>   
                        </div>
                        <div className="form-container">
                        <div><p>Sign in to continue</p></div>
                            <div><p>Not a member yet? <a href="/signup">Sign Up</a></p></div>
                            <form onSubmit={this.handleSubmit} className="form">
                            {this.state.error ? <h5 className="errors">error: {this.state.error}</h5>: null}
                                <label htmlFor="email">Email:</label>
                                <input type="text" name="email" value={this.state.email} onChange={this.handleChange}/>
                                <label htmlFor="password">Password:</label>
                                <input type="password" name="password" value={this.state.password} onChange={this.handleChange}/>
                                <button type="submit">Sign in</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default withRouter(Login);
