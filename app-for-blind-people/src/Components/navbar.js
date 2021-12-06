import React, { Component } from "react"
import './register'
import '../App'
import './login'
import './editProfile'


import { useState } from 'react'
import 'C:/Users/USER/Desktop/Universidad/App_Tesis/App_for_blind_people/app-for-blind-people/src/App.css'
import {   Link, useHistory } from "react-router-dom";


const Navbar = () => {



    let user = JSON.parse(localStorage.getItem('user-info'))


    const history = useHistory();

    function logOut() {
        localStorage.clear() 
        history.push("/home")
    } 

    return (
        
        <nav className="navbar fixed-top navbar-expand-md navbar-dark bg-primary  ">
            <div className="container  d-flex  justify-content-between ">
                <Link to="/" className="navbar-brand mb-0 h1 "> Blind Service  </Link>

                <div>
                    <form id="searchbox" className=" d-flex">
                        <input type="text" className="form-control  me-2 " type="search" placeholder="Search..." aria-label="Search" />
                        <button typle="submit" className="btn btn-outline-success  "> Search </button>
                    </form>
                </div>
                <div>
                    <button
                        type="button"
                        data-bs-toggle="collapse"
                        data-bs-target="#navbarNav"
                        class="navbar-toggler"
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
                                        <li class="nav-item active">
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