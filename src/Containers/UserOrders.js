import React from "react"
import OrderItem from "../Components/OrderItem"
import {HiOutlineMailOpen} from "react-icons/hi"
import {FaUserAlt} from "react-icons/fa"

const UserOrders = ({user, orders, products, patchUserCart, comments}) => {
    return (
        <div className="user-container">
            {
                user ?
                <div className="user-info">
                    <div 
                        style={{
                            border: "1px solid black", 
                            width: "80%", 
                            height: "200px", 
                            display: "flex",
                            justifyContent: "center", 
                            flexDirection: "column", 
                            alignItems: "center"
                        }}
                    >
                        <FaUserAlt size="50px"/>
                        <h1>{user.name}</h1>
                        <div style={{fontSize: "20px"}}><HiOutlineMailOpen color="red"/> {user.email}</div>
                    </div>
                </div>
                : null
            }
            {
                orders && orders.length ?
                <div className="orders-container">
                    <h1 
                        style={{
                            border: "outset", 
                            marginBottom: "20px", 
                            width: "50%", 
                            textAlign: "center", 
                            // color: "slateblue",
                            fontWeight: "bolder", 
                            backgroundColor: "pink"
                        }}
                    >
                        YOUR ORDERS
                    </h1>
                    {orders.sort((a,b) => 
                        b.created_at < a.created_at ? -1 : 1).map((o, i) => 
                            JSON.parse(o.new_order).map(item => 
                                <OrderItem item={{...item, ordered_on: o.created_at}} products={products} patchUserCart={patchUserCart} user={user} comments={comments}/>)
                    )}
                </div> : null
            }

        </div>
    )
}

export default UserOrders;