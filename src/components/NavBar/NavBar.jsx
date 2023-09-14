import React from 'react';
import logo from './logo.jpg';
import CartWidget from '../CartWidget/CartWidget';
import { Navbar, NavDropdown, Container, Nav } from 'react-bootstrap';
import './NavBar.css';
import {LinkContainer} from 'react-router-bootstrap'
import { useState } from 'react';
import useCartContext from '../../store/CartContext.jsx';

function NavBar(props) {
  const [expanded, setExpanded] = useState(false);
  const { contextFunction  } = useCartContext();
  contextFunction();
    return (
<header>
<nav>
<Navbar expanded={expanded} className="headlogbg" bg="light" expand="lg">
  <Container>
  <LinkContainer to="/"><Navbar.Brand className="swirl-in-fwd"><a href="/"><img className="navbar-brand" src={logo} alt="logo" /></a></Navbar.Brand></LinkContainer>
  
    
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">            
        
        <LinkContainer onClick={() => setExpanded(false)} to="/category/apple"><NavDropdown.Item>Celulares</NavDropdown.Item></LinkContainer>
        <LinkContainer onClick={() => setExpanded(false)} to="/category/samsung"><NavDropdown.Item>Tablets</NavDropdown.Item></LinkContainer>
        <LinkContainer onClick={() => setExpanded(false)} to="/category/android"><NavDropdown.Item>Notebook</NavDropdown.Item></LinkContainer>    
                      
      </Nav>      
    </Navbar.Collapse>
    <CartWidget />
  </Container>
  
  </Navbar>
  </nav>
  </header>
    );
}

export default NavBar;