import React, { useEffect } from "react"
import './register'
import '../App'
import './login'
import './editProfile'



import Home from './home'


import { useState } from 'react'
import { Link, useNavigate } from "react-router-dom";


const Navbar = (props) => {

    let user = JSON.parse(localStorage.getItem('user-info'))





    const history = useNavigate();

    function logOut() {
        localStorage.clear()
        history("/home")
    }

    function refreshPage(){ 
        window.location.href="/"; 
    }

    return (

        <nav className="navbar fixed-top navbar-expand-md navbar-dark bg-primary  ">
            <div className="container  d-flex  justify-content-between ">
                <Link to={"/" }onClick={refreshPage} className="navbar-brand mb-0 h1 "> Blind Service  </Link>

             
                <div>
                    <button
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        className="navbar-toggler"
                        aria-controls="navbarNav"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span className="navbar-toggler-icon"></span>
                    </button>

                    <div className="collapse navbar-collapse" id="navbarNav">
                        {
                            localStorage.getItem('user-info') ?
                                <>
                                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                        <li >
                                            <Link to="/editProfile" className="nav-link" title={user.user_name} >
                                                {user.user_name}
                                            </Link>

                                        </li>
                                        <li >
                                            <Link to="/serviceRegister" className="nav-link"  >
                                                Ofertar
                                            </Link>

                                        </li>
                                        <li >
                                            <Link to="/editProfile" className="nav-link" >
                                                Solicitar
                                            </Link>

                                        </li>

                                        <li className="nav-item active">
                                            < Link to="/home" className="nav-link" onClick={logOut}>
                                                Cerrar Sesión
                                            </Link>
                                        </li>
                                    </ul>
                                </>
                                :
                                <>
                                    <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                        <li >
                                            <Link to="/register" className="nav-link"  >
                                                Registrarse
                                            </Link>
                                        </li>
                                        <li className="nav-item active">
                                            < Link to="/login" className="nav-link">
                                                Iniciar Sesión
                                            </Link>
                                        </li>
                                    </ul>
                                </>
                        }

                    </div>

                </div>
            </div>
        </nav>

    );
}
export default Navbar;