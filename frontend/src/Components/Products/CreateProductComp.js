import axios from 'axios'
import React, { useState } from 'react'

const CreateProductComp = () => {
    const [product,setProduct]=useState({
        name:'',
        description:'',
        price:0,
        stock:0
    })
    const token= localStorage.getItem('amrToken'); 
    const axiosInstance = axios.create({
        baseURL:'http://127.0.0.1:8000/api',
        headers:{
            'Authorization':`Bearer ${token}`
        }
    })
    const HandleProduct=()=>{
        axiosInstance.post('http://127.0.0.1:8000/api/products',product,{
            withCredentials:true
        })
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
    }
    const handleSubmit=(e)=>{
        e.preventDefault()
    }
    return (
        <>
            <form method='POST' onSubmit={(e)=>handleSubmit(e)}>
                <input type='text' placeholder='Name' value={product.name} onChange={(e)=>{setProduct({...product,name:e.target.value})}} />
                <input type='number' placeholder='price' value={product.price} onChange={(e)=>{setProduct({...product,price:e.target.value})}} />
                <input type='number' placeholder='stock' value={product.stock} onChange={(e)=>{setProduct({...product,stock:e.target.value})}} />
                <textarea placeholder='description' value={product.description} onChange={(e)=>{setProduct({...product,description:e.target.value})}}></textarea>
                <button onClick={HandleProduct}>Add Product</button>
            </form>
        </>
    )
}

export default CreateProductComp
