import { Component } from "react"

class Product extends Component{
    itemId = this.props.location.pathname.split("/item/")[1]
    render(){
        return (
            <div>
    
            </div>
        )
    }
}


export default Product