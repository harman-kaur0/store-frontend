import React, { useState, useEffect } from "react"
import Cart from "../Components/Cart"

const ShoppingCart = ({user, products, patchUserCart, setUser}) => {
    const [items, setItems] = useState([])

    useEffect(() => {
        setItems(user ? user.cart : (localStorage.getItem('cart').length ? JSON.parse(localStorage.getItem('cart')) : console.log()))
    }, [user.cart])

    return (
        <div className="cart-container">
            { items && items.length ? 
                items.map(item => {
                    return <Cart item={item} key={item.product_id} products={products} user={user} patchUserCart={patchUserCart} setUser={setUser} setItems={setItems} items={items}/>
                })
                : null
            }
        </div>
    )

}

export default ShoppingCart;