import React, { useState } from "react"
import {RiDeleteBin6Line} from "react-icons/ri"

const Cart = ({item, products, user, patchUserCart, setUser, setItems, items}) => {
    // const [quantity, setQuantity] = useState(item.quantity);

    let product = products.find(p => p.id === item.product_id)

    const handleChange = e => {
        const intQuantity = parseInt(e.target.value)
        let id = item.product_id

        let obj = {
            product_id: id,
            quantity: intQuantity,
          }
      
          if(user) {
            patchUserCart(id, intQuantity)
            setItems(items.map(o => o.product_id === id ? {...o, quantity: intQuantity} : o))
          }else {
            let cart = JSON.parse(localStorage.getItem('cart')) || [];
            let findCart = cart.find(o => o.product_id === id)
            if (findCart) {
              cart = cart.map(o => o.product_id === id ? {...o, quantity: intQuantity} : o)
            }else {
              cart.push(obj)
            }
            localStorage.setItem("cart", JSON.stringify(cart))
            setItems(cart)
          }
    }

    const handleDelete = (id) => {
        if (user) {
            let cart = user.cart.filter(p => p.product_id !== id)
            const config = {
                method: "PATCH",
                headers: {
                  "Content-Type": "application/json",
                  'Authorization': `Bearer ${localStorage.getItem('jwt')}`
                },
                body: JSON.stringify({cart: cart})
              }
            fetch(`http://localhost:3000/api/v1/users/${user.id}`, config)
            .then(resp => resp.json())
            .then(data => {
            setUser({...user, cart: data.cart})
            setItems(data.cart)
            })
        }else {
            let cart2 = JSON.parse(localStorage.getItem('cart')) || [];
            cart2 = cart2.filter(c => c.product_id !== id)
            localStorage.setItem("cart", JSON.stringify(cart2))
            setItems(cart2)
        }
    }

    return (
        <div className="cart-content">
            {
                product ?
                    <div className="cards">
                        <div className="card-image">
                            <img src={product.image}/>
                        </div>
                        <div className="text">
                            <div>{product.name}</div>
                            <div className="card-form-button">
                                <div>
                                    <label>Quantity</label>
                                    <input type="number" min="1" value={item.quantity} style={{width: "50px", marginLeft: "10px"}} onChange={handleChange}/> 
                                </div>
                                <button className="delete" onClick={() => handleDelete(product.id)}><RiDeleteBin6Line/></button>
                            </div>
                        </div>
                    </div>
                : null
            }
        </div>
    )
}

export default Cart