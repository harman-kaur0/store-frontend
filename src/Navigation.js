import 'bootstrap/dist/css/bootstrap.min.css';
import React,{ useState } from 'react';
import {Navbar, Nav, Button, Form, FormControl, Container} from 'react-bootstrap';
import { useHistory, useLocation } from 'react-router-dom';
import {Link, withRouter} from "react-router-dom"

// import { FaShoppingCart } from "react/icons/fa";


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
            <Navbar collapseOnSelect fixed="top" expand="sm" variant="dark" className="bg-dark justify-content-between" >
                <Container>
                    <Navbar.Brand>Amazen</Navbar.Brand>
                        <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
                        <Navbar.Collapse id= "responsive-navbar-nav" className="justify-content-end">
                            <Form className="d-flex" onSubmit={handleSubmit}>
                                    <FormControl onChange={e => setTerm(e.target.value)} value= {term} type="text" placeholder="Search" className= "mr-2" aria-describedby="basic-addon1"/>
                                    <Button variant="outline-info">Search</Button>
                            </Form>
                        </Navbar.Collapse>
                        <Navbar.Collapse className="justify-content-end">
                            <Nav className="mr-auto">
                                <Nav.Link href='/'>Home</Nav.Link>
                                {user ?   <Nav.Link onClick={handleLogout} href="/">Log Out</Nav.Link>     : <Nav.Link><Link to={{pathname:'/login', state: {from: location.pathname}}}>Login</Link></Nav.Link>} 
                               
                            </Nav>
                            {user ? <Navbar.Text>
                               Signed in as: {user.name}
                            </Navbar.Text>: null}
                        </Navbar.Collapse>
                        {/* <FaShoppingCart/> */}
                </Container>
            </Navbar>
            <br />
            <br />
            <Navbar variant="dark" fixed="top" className="navbar_margin" >
                <Container>
                    <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
                    <Nav className="mr-auto">
                        {categories.map((c, i) => <Nav.Link key={i} onClick={handleClick}>{c}</Nav.Link>)} 
                    </Nav>
                </Container>
            </Navbar>
            
        </>
    )
}

export default withRouter(Navigation);