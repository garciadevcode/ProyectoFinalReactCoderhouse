import React from 'react'
import { Button, Card, Badge, Container } from 'react-bootstrap';
import {LinkContainer} from 'react-router-bootstrap';
import useCartContext from '../../store/CartContext';
import  './Item.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCartShopping } from '@fortawesome/free-solid-svg-icons';


function Item({ item, stock, name, price, description, picture} ) {
  const { getItemQuantity, isInCart } = useCartContext();

  return (
    <Card key={item.id} className="bg-light h-100 shadow-lg p-3 mb-3 mr-2 ml-2 rounded">
    <Card.Title className="fw-bolder">{name} </Card.Title>
    <span className="">{isInCart(item) ?
    <><div className="cart-icon2"><FontAwesomeIcon icon={faCartShopping} size="1x" color="white" /><div className="mostrar-cantidadItem">{getItemQuantity(item)}</div></div></>
    :
    <><div className="cart-icon2"><FontAwesomeIcon icon={faCartShopping} size="1x" color="white" /><div className="mostrar-cantidadItem">0</div></div></>
}</span>

    <Card.Body>
    
   
    </Card.Body>
    <Container>
    <Badge className="mb-4 text-center m-1">Stock {stock}</Badge>
    <Badge bg="success me-2 mb-4 text-center m-1">$ {price} COP</Badge>
    </Container>
    <LinkContainer to={`/item/${item}`}><Button className="">Ver detalle</Button></LinkContainer>
  </Card>
    
  )
}

export default Item