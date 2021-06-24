import {useEffect, useState } from "react"
import {useHistory, useLocation} from 'react-router-dom'

const Product = ({products, user, comments, setComments}) => {
    const [product, setProduct] = useState(productLoad)
    const history = useHistory()
    const location = useLocation()
    const itemId = parseInt(location.pathname.split("/item/")[1])

    const handleClick = (id) => {
        if (user){
            history.push(`/comment/${id}`)
        } else {
            alert ("Please log in to leave a review")
        }
    }

    useEffect(() => {
        let item = products.find(obj => obj.id === itemId)
        console.log(item)
        setProduct(item)
    }, [products])

    const deleteComment = (id) => {
        fetch(`http://localhost:3000/api/v1/comments/${id}`, {
            method: "DELETE",
            headers: {
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            }
        })
        let filterComments = comments.filter(c => c.id !== id)
        setComments(filterComments)      
    }
    
    return (
        product ?
        <div>
            <h1>{product.name}</h1>
            <img className="product-image" src= {product.image} alt={product.name}/>
            <h4>$ {product.price}</h4>
            <h6>Product Details: {product.description}</h6>
            
            {comments ? 
            (comments.find(c => c.user_id === user.id && c.product_id === itemId) ?
            <>
                <button onClick={() => history.push(`/comment/${product.id}`)}>Edit Review</button>
                <button onClick={() => deleteComment(product.id)}>Delete review</button>
            </>:
            <button onClick={() => handleClick(product.id)}>Leave a Review</button>) : null
            }
        </div> 
        : <h1>This page does not exist</h1>   
    )
}

  render() {
    console.log(this.props)

    // if id is from routerProps or from PropductList, render conditionally
    console.log(this.props.product);
    return this.state.productView ? (
      <div>
        <h1>This.state.productView is false</h1>
        <CommentList comments={console.log("comments")} />
      </div>
    ) : (
      <div
        onClick={this.handleToggle
          
        }
      >
        <h1>Testing</h1>
        <div className="products">
          <img
            src={this.props.product.image}
            alt={this.props.product.name}
            className="productsImg"
          />
          <h6>{this.props.product.name}</h6>
          <h4>$ {this.props.product.price}</h4>
        </div>
      </div>
    );
  }
}

export default Product

const productLoad = {
    name: "...is loading",
    image: "...is loading",
    price: "...is loading",
    description: "...is loading"
}
