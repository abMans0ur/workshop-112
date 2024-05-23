import React, { Fragment, useEffect, useState } from 'react'
import './navbar.css';
import { NavLink } from 'react-router-dom';
import catLogo from '../../images/cat.jpg';
import { MdMenu } from "react-icons/md";
import { FaRegWindowClose } from "react-icons/fa";

const NavBar = () => {
    const [menu, setMenu] = useState(false);
    const [bigMenu, setBigMenu] = useState(false)
    useEffect(() => {
        window.addEventListener('resize', () => {
            let windowSize = window.innerWidth;
            windowSize <= 768 ? setMenu(true) : setMenu(false);
        })
    })
    const menuChange = () => {
        setBigMenu(!bigMenu);
    }
    const token = localStorage.getItem("amrToken")
    return (
        <header>
            <nav>
                <span>
                    <img src={catLogo} alt='' />
                </span>
                <ul className={bigMenu ? 'bigMenu' : undefined}>
                    <li><NavLink to='/home'>Home</NavLink></li>
                    {token ? (
                        <Fragment>
                            <li><NavLink to='/products'>Products</NavLink></li>
                            <li><NavLink to='/product-add'>Add</NavLink></li>
                        </Fragment>
                    ) : (
                        <Fragment>
                            <li><NavLink to='/login' >Login</NavLink></li>
                            <li><NavLink to='/register'>Register</NavLink></li>
                        </Fragment>
                    )}
                </ul>
                {
                    menu ?
                        bigMenu ? <FaRegWindowClose size={30} onClick={menuChange} /> : <MdMenu onClick={menuChange} size={30} /> : undefined

                }
            </nav>
        </header>
    )
}

export default NavBar
