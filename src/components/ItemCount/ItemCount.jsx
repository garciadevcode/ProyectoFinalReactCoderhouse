import React, { useState } from 'react';
import { Button } from 'react-bootstrap';
import Swal from 'sweetalert2'

const ItemCount = ({stock, initial, onAdd, itemName}) => {
  const [count, setCount] = useState(initial)
  function pluralizeWord(singularWord, pluralWord) {
    return count > 1 ? pluralWord : singularWord;
  }
  const handleAgregar = () => {
    if (count < stock) {
      setCount(count + 1)     
    } else {
      const Toast = Swal.mixin({
        toast: true,
        background: '#ff7300',
        showConfirmButton: false,
        timer: 2000,
        timerProgressBar: false,
        didOpen: (toast) => {
          toast.addEventListener('mouseenter', Swal.stopTimer)
          toast.addEventListener('mouseleave', Swal.resumeTimer)
        }})
      
      Toast.fire({
        icon: 'error',
        title: 'No hay stock suficiente'
      })}}

  const handleRestar = () => {
    if (count > initial) {
      setCount(count - 1)     
    }
  }

const handleOnAdd = () => {
  const Toast = Swal.mixin({
    toast: true,
    background: '#ff7300',
    showConfirmButton: false,
    timer: 2000,
    timerProgressBar: false,
    didOpen: (toast) => {
      toast.addEventListener('mouseenter', Swal.stopTimer)
      toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
  })
  Toast.fire({
    icon: 'success',
    title: `${count} ${itemName} ${pluralizeWord("agregada", "agregadas")} al carrito`
  })
        onAdd(count);
        setCount(initial);
    } 
  return (
    <>  
      <div className="">
         <div className="input-group-prepend"><Button onClick={handleRestar} className="text-white btn btn-outline-secondary">-</Button></div>
        <input type="text" className="form-control h-100 text-center" readOnly value={count} />
        <div className="input-group-append"><Button onClick={handleAgregar} className="text-white btn btn-outline-secondary">+</Button></div>
        
        <Button onClick={handleOnAdd} className="text-white btn btn-outline-secondary m-2">Agregar al carrito</Button>
      </div>
      
    </>
    
  )
}

export default ItemCount