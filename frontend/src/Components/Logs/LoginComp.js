import React, { useState } from 'react'
import './log.css';
import axios from 'axios';
const LoginComp = () => {
    const [user, setUser] = useState({
        email: '',
        password: ''
    })
    const formHandling = () => {
        axios.post("http://127.0.0.1:8000/api/login", user, {
            withCredentials: true
        })
            .then(res => {
                localStorage.setItem("amrToken",res.data.token)
            })
            .catch(err => console.log(err))
    }
    const Submitattion = (e) => {
        e.preventDefault();
    }
    return (
        <>
            <form method='post' onSubmit={(e) => Submitattion(e)}>
                <input placeholder='email' type='email' name='email' value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                <input placeholder='password' type='password' name='password' value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
                <button type='submit' onClick={formHandling} >Login</button>
            </form>
        </>
    )
}

export default LoginComp
