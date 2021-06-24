import { Component } from "react"
import {withRouter} from 'react-router-dom'

class Product extends Component{
    itemId = parseInt(this.props.location.pathname.split("/item/")[1])

    // handleClick = () => {
    //     if (this.props.user){
    //         this.props.history.push()
    //     }
    // }
    
    render(){
        let item = this.props.products.find(obj => obj.id === this.itemId)
        console.log(this.props.user)
        console.log(this.props.products)
        console.log(this.props.products)
        return (
            <div>
                <h1>{item.name}</h1>
                <img src= {item.image}/>
                <h4>$ {item.price}</h4>
                <h6>Product Details: {item.description}</h6>
                <button onClick={console.log("comment")}>Leave a Review</button>
            </div>
        )
    }
}


export default withRouter(Product)