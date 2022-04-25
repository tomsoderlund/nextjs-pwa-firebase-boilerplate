import React from 'react'
import Link from 'next/link'

import useUser from 'hooks/useUser'
import { firebaseApp } from 'lib/data/firebase'
import { config } from 'config/config'


import { Navbar, Container, Nav, NavDropdown } from 'react-bootstrap';

const logout = () => {
  firebaseApp.auth().signOut().then(function() {
    // Sign-out successful.
  }).catch(function(error) {
    // An error happened.
  });
}

function Header(){
  const { user } = useUser()
  if(user){
    return (
      <header>
        <Navbar collapseOnSelect expand="lg" bg="primary" variant="dark">
          <Container>
          <Navbar.Brand href="/home">App</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="/products">Produtos</Nav.Link>
              <Nav.Link href="/customers">Clientes</Nav.Link>
              <NavDropdown title="Dropdown" id="collasible-nav-dropdown">
                <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                <NavDropdown.Divider />
                <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
              </NavDropdown>
            </Nav>
            <Nav>
              <Nav.Link onClick={logout} href="/">Sair</Nav.Link>
            </Nav>
          </Navbar.Collapse>
          </Container>
        </Navbar>
      </header>
      )
    }  else {
      return (
          <>
              
          </>
      )
    }
  }
export default Header
