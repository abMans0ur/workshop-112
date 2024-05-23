import React, { useState } from 'react'
import productStyle from './product.module.css';
import catImage from '../../images/cat.jpg'
import axios from 'axios';
import { Link } from 'react-router-dom';
const AllProducts = () => {
    const token= localStorage.getItem('amrToken'); 
    const axiosInstance = axios.create({
        baseURL:'http://127.0.0.1:8000/api',
        headers:{
            'Authorization':`Bearer ${token}`
        }
    })
    const [products, setProducts] = useState();
    axiosInstance.get('/products').then((result) => {
        setProducts(result.data)
    }).catch((err) => {
        console.log(err)
    });
    const deleteProduct = (id)=>{
        axiosInstance.delete(`/products/${id}`,{
            withCredentials:true
        })
        .then(res=>console.log(res))
        .catch(err=>console.log(err))
    }
    return (
        <section className={productStyle.container}>
            {
                products?.map((el) => (
                    <div className={productStyle.product} key={el.id}>
                        <img src={catImage} alt='' />
                        <h2>{el.name}</h2>
                        <h4>${el.price}</h4>
                        <h5>{el.stock}</h5>
                        <p>{el.description}</p>
                        <div className={productStyle.buttons}>
                        <Link>Show more</Link>
                        <Link to={`/editProduct/${el.id}`}>Edit</Link>
                        <button onClick={()=>deleteProduct(el.id)}>Delete</button>
                        </div>
                    </div>

                ))
            }
        </section>
    )
}

export default AllProducts
