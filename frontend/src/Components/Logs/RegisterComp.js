import React, { useState } from 'react'
import './log.css';
import axios from 'axios';
const RegisterComp = () => {
    const [user, setUser] = useState({
        name: '',
        email: '',
        password: ''
    })
    const formHandling = () => {
        axios.post("http://127.0.0.1:8000/api/register", user)
            .then(res => console.log(res))
            .catch(err => console.log(err))
    }
    const Submitattion = (e) => {
        e.preventDefault(); 
    }
    return (
        <>
            <form method='post' onSubmit={(e) => Submitattion(e)}>
                <input placeholder='name' type='text' name='name' value={user.name} onChange={(e) => setUser({ ...user, name: e.target.value })} />
                <input placeholder='email' type='email' name='email' value={user.email} onChange={(e) => setUser({ ...user, email: e.target.value })} />
                <input placeholder='password' type='password' name='password' value={user.password} onChange={(e) => setUser({ ...user, password: e.target.value })} />
                <button type='submit' onClick={formHandling} >Register</button>
            </form>
        </>
    )
}

export default RegisterComp
