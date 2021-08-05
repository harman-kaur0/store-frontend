import 'bootstrap/dist/css/bootstrap.min.css';
import React,{ useState } from 'react';
import { useHistory, useLocation } from 'react-router-dom';
import {Link, withRouter} from "react-router-dom"

import { FaShoppingCart } from "react-icons/fa";


const Navigation = ({user, handleLogout, categories}) => {
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
            <div>
                <div>
                    <div>Amazen</div>
                    <div>
                        <form onSubmit={handleSubmit}>
                                <input onChange={e => setTerm(e.target.value)} value= {term} type="text" placeholder="Search"/>
                                <button variant="outline-info">Search</button>
                        </form>
                    </div>
                    <div>
                        <a href='/'>Home</a>
                        {user ?   <a onClick={handleLogout} href="/">Log Out</a>     : <a><Link to={{pathname:'/login', state: {from: location.pathname}}}>Login</Link></a>}     
                    </div>
                    {user ? <div>
                        Signed in as: {user.name}
                    </div>: null}
                    <a href="/cart"><FaShoppingCart color="yellow" size="20px" /></a>
                    <div>
                        {categories.map((c, i) => <a key={i} onClick={handleClick}>{c}</a>)} 
                    </div>
                </div>
            </div>
        </>
    )
}

export default withRouter(Navigation);