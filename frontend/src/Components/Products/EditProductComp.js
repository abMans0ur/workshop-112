import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams ,useNavigate } from 'react-router-dom'

const EditProductComp = () => {
    const {id}=useParams()
    const navigate = useNavigate()
    const [product, setProduct] = useState({
        name: '',
        description: '',
        price: 0,
        stock: 0
    })
    const token= localStorage.getItem('amrToken'); 
    const axiosInstance = axios.create({
        baseURL:'http://127.0.0.1:8000/api',
        headers:{
            'Authorization':`Bearer ${token}`
        }
    })
    const HandleProduct = () => {
        axiosInstance.put(`/products/${id}`, product, {
            withCredentials: true
        })
            .then(res => {console.log(res)
                navigate('/products')})
            .catch(err => console.log(err));
                
        }
        const handleSubmit = (e) => {
            e.preventDefault()
    }
    useEffect(()=>{
        axiosInstance.get(`/products/${id}`)
    .then((res => setProduct(res.data)))
    .catch(err=>console.log(err))
    },[])
    return (
        <>
            <form method='POST' onSubmit={(e) => handleSubmit(e)}>
                <input type='text' placeholder='Name' value={product.name} onChange={(e) => { setProduct({ ...product, name: e.target.value }) }} />
                <input type='number' placeholder='price' value={product.price} onChange={(e) => { setProduct({ ...product, price: e.target.value }) }} />
                <input type='number' placeholder='stock' value={product.stock} onChange={(e) => { setProduct({ ...product, stock: e.target.value }) }} />
                <textarea placeholder='description' value={product.description} onChange={(e) => { setProduct({ ...product, description: e.target.value }) }}></textarea>
                <button onClick={HandleProduct}>Update Product</button>
            </form>
        </>
    )
}

export default EditProductComp
