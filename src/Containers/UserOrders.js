import React from "react"
import OrderItem from "../Components/OrderItem"

const UserOrders = ({user, orders, products, patchUserCart}) => {
    return (
        <div>
            {
                user ?
                <div>
                    <h3>{user.name}</h3>
                    <h5>{user.email}</h5>
                </div>
                : null
            }
            {
                orders && orders.length ?
                <div>
                    {orders.sort((a,b) => 
                        b.created_at < a.created_at ? -1 : 1).map((o, i) => 
                            JSON.parse(o.new_order).map(item => 
                                <OrderItem item={{...item, ordered_on: o.created_at}} products={products} patchUserCart={patchUserCart}/>)
                    )}
                </div> : null
            }

        </div>
    )
}

export default UserOrders;