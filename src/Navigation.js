import 'bootstrap/dist/css/bootstrap.min.css';
import React,{ useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {Link, withRouter} from "react-router-dom"
import {IoMdLogOut} from "react-icons/io"
import { FaShoppingCart, FaRegUserCircle } from "react-icons/fa";
import {BiHomeSmile} from "react-icons/bi"
import {RiSearch2Line} from "react-icons/ri"

const Navigation = ({user, handleLogout, categories, items}) => {
    const [term, setTerm] = useState("")
    const history = useHistory()
    const location = useLocation()

    const handleClick = (e) => {
       const search = e.target.innerText.replaceAll(" ","%")
       setTerm(e.target.innerText)
       history.push(`/search?${search}`)     
    }

    const handleSubmit = (e) => {
        e.preventDefault()
        const search = term.replaceAll(" ", "%")
        history.push(`/search?${search}`)
    }

    return (
        <>
            <div className="navbar-container">
                <div className="navbar-top">
                    <div style={{fontSize: "20px", fontWeight: "bold", color: "red"}}>Amazen</div>
                    <div style={{display: "flex"}}>
                        <form onSubmit={handleSubmit} style={{marginLeft: "20px", marginRight: "20px"}} className="navbar-form">
                                <input onChange={e => setTerm(e.target.value)} value= {term} type="text" placeholder="Search"/>
                                <button type="submit"><RiSearch2Line size="15px"/></button>
                        </form>
                        <div style={{marginRight: "20px", display: "flex", alignItems: "center"}}>
                            <a href='/' style={{marginLeft: "20px", marginRight: "20px"}}><BiHomeSmile size="25px"/></a>
                            {user ?   <a onClick={handleLogout} href="/" style={{color: "red"}}><IoMdLogOut size="25px"/></a>     : <a><Link to={{pathname:'/login', state: {from: location.pathname}}}>Login</Link></a>} 
                        </div> 
                        {user ? 
                            <div style={{color: "orange", display: "flex", alignItems: "center", fontSize: "15px"}}>
                                <FaRegUserCircle size="20px" style={{marginRight: "10px"}}/>  <a href="/orders" style={{color: "orange"}}>{user.name}</a>
                            </div>
                        : null}   
                    </div>
                    <a href="/cart" style={{ position: "relative"}}>
                        
                        <FaShoppingCart color="yellow" size="30px" />
                        {
                            items && items.length ? 
                            <div 
                                style={{
                                    position: "absolute", 
                                    top: 0, 
                                    right: 0, 
                                    border: "2px solid black", 
                                    background: "black", 
                                    borderRadius: "50%", 
                                    width: "15px", 
                                    height: "15px", 
                                    display: "flex", 
                                    alignItems: "center", 
                                    justifyContent: "center"
                                }}
                            >
                                <p style={{color: "white", fontSize: "12px", fontWeight: "bold"}}>
                                    {items.length}
                                </p>
                            </div> 
                            : null
                        }
                    </a>
                </div>
                <div className="navbar-bottom">
                    {categories.map((c, i) => <a key={i} onClick={handleClick}>{c}</a>)} 
                </div>
            </div>
        </>
    )
}

export default withRouter(Navigation);