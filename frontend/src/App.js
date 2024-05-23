import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Home from './Routes/Home'
import Login from './Routes/Login'
import Register from './Routes/Register'
import Products from './Routes/Products'
import './App.css';
import StoreProduct from './Routes/StoreProduct'
import EditProduct from './Routes/EditProduct'
const App = () => {
  const token = localStorage.getItem("amrToken")
  return (
    <>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/home' element={<Home />} />
        {token?(
          <>
        <Route path='/products' element={<Products />} />
        <Route path='/product-add' element={<StoreProduct />} />
        <Route path='/editProduct/:id' element={<EditProduct />} />
          </>
        ):(
          <>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Register />} />
          </>
        )}
      </Routes>

    </>
  )
}

export default App
