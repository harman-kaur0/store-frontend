import {Navbar, Nav, Button, Form, FormControl, Container} from 'react-bootstrap';

const Navigation = () => {
    return (
        <>
            <Navbar collapseOnSelect fixed="top" expand="sm" bg="light" variant="dark">
                <Container>
                    <Navbar.Brand>Amazen</Navbar.Brand>
                        <Navbar.Toggle aria-controls='responsive-navbar-nav'/>
                        <Navbar.Collapse id='responsive-navbar-nav'>
                            <Nav>
                                <Nav.Link href='/'>Home</Nav.Link>
                                <Nav.Link href='/login'>Login</Nav.Link>
                            </Nav>
                            <Form inline>
                                <FormControl type="text" placeholder="Search" className= "mr-sm-2"/>
                                <Button variant="outline-success">Search</Button>
                            </Form>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </>
    )
}

export default Navigation;