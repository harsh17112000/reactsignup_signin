import React from 'react'
import Navbar from 'react-bootstrap/Navbar'
import Nav from 'react-bootstrap/Nav'
import Container from 'react-bootstrap/Container'
import { NavLink } from 'react-router-dom'

const Header = () => {
    return (
        <>
            <Navbar variant='dark' style={{background:"#131921"}}>
                <Container>
                    <Navbar.Brand>  <NavLink to="/" style={{color:"#fff"}}>User Registration</NavLink></Navbar.Brand>
                    <Nav className="me-auto">
                        <Nav.Link href="#home">Home</Nav.Link>
                        <Nav.Link href="#features">Features</Nav.Link>
                    </Nav>
                </Container>
            </Navbar>
        </>
    )
}

export default Header
