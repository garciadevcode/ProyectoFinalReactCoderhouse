import React, { useState } from 'react'
import { createBuyOrder } from '../../services/FireStore';
import {  Badge, Container } from 'react-bootstrap';
import useCartContext from '../../store/CartContext';
import Swal from 'sweetalert2'
import { Link } from 'react-router-dom';

function CheckOut() {
    
    const { cart, clearCart, itemsTotal, precioTotal } = useCartContext();
    const [OrderID, setOrderID] = useState();
   
    const [nombre, setNombre] = useState('');
    const [phone, setPhone] = useState('');

  const [submitted, setSubmitted] = useState(false);
  const [errorMsg, setErrormsg] = useState(false);

  const handleNombre = (e) => {
    setNombre(e.target.value);
    setSubmitted(false);
  };
 
 
 
  const handlePhone = (e) => {
    setPhone(e.target.value);
    setSubmitted(false);
  };

  function handleBuy(){
    const itemsToBuy = cart.map((item) => ( {
        id: item.id,
        cant: item.cant,
        name: item.name,
        pricex1: item.price,
        total: item.price * item.cant,
    }
    ))
 
      const buyOrder = {
        buyer: {
          name: `${nombre}`,
          phone: `${phone}`,
          
        },
        items: itemsToBuy,
        total: precioTotal(),
      }
      createBuyOrder(buyOrder).then(response => {
        
        Swal.fire({
            icon: 'success',
            title: `Compra realizada con éxito id ${response}`,
            text: 'Gracias por su compra',
            })            
      })
      
      setTimeout(() => {
        clearCart();
        setOrderID(true);
      }, 3000);           
    }
    function onlyLettersAndSpaces(str) {
      return /^[A-Za-z\s]*$/.test(str);
    }
    function containsArroba(str) {
      const tieneArroba = /@/;
      return tieneArroba.test(str);
    }

    function onlyNumbers(str) {
      return /^[0-9]+$/.test(str);
    }  

    const handleSubmit = (e) => {
      e.preventDefault();
      if (!onlyLettersAndSpaces(nombre) || nombre === '' ||  !onlyNumbers(phone) || phone === '') {
      setErrormsg(true);
       
      } else {
        setSubmitted(true);
        setErrormsg(false);
        handleBuy();
      }
    };

 const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? '' : 'none',
        }}>
        <h4 className="bg-success text-white scale-in-ver-center">Pago exitoso</h4>
      </div>
    );
  };
 
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: errorMsg ? '' : 'none',
        }}>
        <h4 className="bg-danger text-white scale-in-ver-center">Datos incorrectos</h4>
        
      </div>
    );
  };    
        if (cart.length === 0) {
            return <section id="Carrito" className="py-5 text-center container">
            <div className="row py-lg-5">
                <div className="col-12">
                <p>No hay articulos en su carrito</p>                
                <p></p>
                <Link to="/">Regresar al menú</Link>
              </div>
            </div>
          </section>
      } else if(OrderID) {
        return (
          <section id="carrito" className="py-2 text-center container slide-in-fwd-center">
            <div className="row py-lg-2">
              <div><Badge bg="primary" className="m-1"><h6>Su ID de compra ${OrderID} Total de articulos: {itemsTotal()}</h6></Badge><Badge className="m-3" bg="primary"><h6> Costo Total: {precioTotal()} $</h6></Badge><div></div><div><Link to="/">Regresar al catálogo</Link></div> 
              </div>
            </div>
          </section>
        )
      }
  return (
    <div className="container">
    <main>
      <div className="py-3 text-center">
        <h2>Checkout</h2>
        <p className="lead">Su lista de compra y formulario de pago.</p>
      </div>
      <div className="row g-5">
        <div className="col-md-5 col-lg-4 order-md-last">
          
          <ul className="list-group mb-3">
          {cart.map(item => (
            <Container key={item.id} className="list-group-item justify-content-between lh-sm"><li className="list-group-item d-flex justify-content-between lh-sm">
              <div>
                <h6 className="my-0">{item.category} {item.name} x{item.cant}</h6>
               
              </div>
              <span className="text-muted">${item.price}</span>
            </li>
            </Container>
          ))}
          <li className="list-group-item d-flex justify-content-between lh-sm">
              <div>
                <h6 className="my-0">Total: ${precioTotal()} COP</h6>
              </div>
            </li>
          </ul>
        </div>
        <div className="col-md-7 col-lg-8">
          <h4 className="mb-3">Datos del cliente</h4>
          <div className="messages">
        {errorMessage()}
        {successMessage()}
      </div>
      
          <form className="needs-validation">
            <div className="row g-3">
              <div className="col-sm-12">
                <label htmlFor="firstName" className="form-label">Nombre completo</label>
                <input onChange={handleNombre} value={nombre} type="text" className="form-control input" id="name" placeholder="Nombres y Apellidos" required />
                <div className="invalid-feedback">
                  Nombre requerido
                </div>
              </div>
              
              
              <div className="col-12">
                <label htmlFor="phone" className="form-label">Teléfono</label>
                <input onChange={handlePhone} value={phone} type="phone" className="form-control input"  id="phone" placeholder="un numero valido por favor" required />
                <div className="invalid-feedback">
                  Por favor ingrese su número de teléfono
                </div>
              </div>
            </div>
            <hr className="my-4" />
            
            <hr className="my-4" />
            <button onClick={handleSubmit} className="w-100 btn btn-primary btn-lg" type="submit">Pagar</button>
          </form>
          
        </div>
      </div>
    </main>
  </div>  
  )
}

export default CheckOut