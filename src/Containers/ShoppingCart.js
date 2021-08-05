import React from "react"
import Cart from "../Components/Cart"

const ShoppingCart = ({user, products}) => {

    let items = user ? user.cart : (localStorage.getItem('cart') ? JSON.parse(localStorage.getItem('cart')) : console.log())

    return (
        <div className="cart-container">
            { items ? 
                items.map(item => {
                    console.log(items)
                    return <Cart item={item} key={item.product_id} products={products}/>
                })
                : null
            }
        </div>
    )

}

export default ShoppingCart;