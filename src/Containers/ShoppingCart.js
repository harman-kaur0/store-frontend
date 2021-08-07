import React, { useState, useEffect } from "react"
import Cart from "../Components/Cart"

const ShoppingCart = ({user, products, patchUserCart, setUser, items, setItems}) => {

    const [cartProducts, setCartProducts] = useState([])

    const multiply = cartProducts.map(c => c.quantity * c.price)
    const add = multiply.reduce((a,b) => a+b, 0)
    const tax = Number.parseFloat(add*0.03).toFixed(2)
    const total = add + (add * 0.03)

    useEffect(() => {
        setCartProducts(items.map(p => {
            const product = products.find(i => i.id === p.product_id)
            return product ? {...p, price: product.price} : p
        }))
    }, [items, products])

    const emptyUserCart = () => {
        const config = {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json",
                'Authorization': `Bearer ${localStorage.getItem('jwt')}`
            },
            body: JSON.stringify({cart: []})
        }

        fetch(`http://localhost:3000/api/v1/users/${user.id}`, config)
        .then(resp => resp.json())
        .then(data => {
            this.setUser({...this.state.user, cart: data.cart})
            this.setItems(data.cart)
    })
    }

    const newOrder = () => {
        if (user) {
            let arr = user.cart
        }
    }


    return (
        <div className="shopping-cart-container">
            <div className="cart-container">
                { items && items.length ? 
                    items.map(item => {
                        return <Cart item={item} key={item.product_id} products={products} user={user} patchUserCart={patchUserCart} setUser={setUser} setItems={setItems} items={items}/>
                    })
                    : null
                }
            </div>
            <div className="checkout">
                <div
                    style={{
                        textAlign: "center",
                        fontSize: "20px",
                        fontWeight: "bold"
                    }}
                >
                    Checkout
                </div>
                <div
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        alignSelf: "center",
                        justifyContent: "space-around",
                        marginTop: "50px",
                        fontSize: "15px"
                    }}
                >
                    <div style={{display: "flex", justifyContent: "space-around"}}>
                        <div>Sub-total: </div>
                        <div>${add}</div>
                    </div>
                    <div style={{display: "flex", justifyContent: "space-around"}}>
                        <div>Tax:</div>
                        <div>${tax}</div>
                    </div> 
                </div>
                <div
                    style={{
                        fontSize: "15px",
                        marginTop: "auto",
                        textAlign: "center",
                        fontWeight: "bold",
                        display: "flex",
                        flexDirection: "column", 
                        justifyContent: "space-around", 
                        alignItems: "center",
                    }}
                >
                    Order Total: ${total}
                    <button style={{width: "200px", marginBottom: "20px"}}>Place Your Order</button>
                </div>
            </div>
        </div>
    )

}

export default ShoppingCart;