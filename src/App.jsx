import React from 'react';
import './App.css';
import NavBar from './components/NavBar/NavBar'
import ItemListContainer from './components/ItemListContainer/ItemListContainer';
import CartView from './components/CartView/CartView';
import 'bootstrap/dist/css/bootstrap.min.css';
import ItemDetailContainer from './components/ItemDetailContainer/ItemDetailContainer';
import { HashRouter, Route, Routes }  from 'react-router-dom';
import { CartContextProvider } from './store/CartContext';
import CheckOut from './components/CheckOut/';

function App() {  
  return (
    <>
    <CartContextProvider>
    <HashRouter>
      <NavBar />
      <main>
      <Routes>
        
        <Route path="/checkout" element={<CheckOut />} />
        <Route path="/item/:itemid" element={<ItemDetailContainer greeting="Detalle"/>} />  
        <Route path="/" element={<ItemListContainer greeting="Menú"/>} />
        <Route path="/cart" element={<CartView greeting="Su carrito"/>} />
        <Route path="/category/:category" element={<ItemListContainer greeting="Categoría"/>} />
      </Routes>
      <hr />
      <div className="back1">
        <div className="back1 back2">
        <div className="back1 back3">
			</div>
          </div>
         </div>
      </main>
       </HashRouter>
      </CartContextProvider>
    </>
  );
}
export default App;
