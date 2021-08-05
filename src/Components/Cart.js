import React from "react"

const Cart = ({item, products}) => {

    let product = products.find(p => p.id === item.product_id)
    return (
        <div className="cart-content">
            {
                product ?
                <h1>{product.name}</h1> : null
            }
        </div>
    )
}

export default Cart