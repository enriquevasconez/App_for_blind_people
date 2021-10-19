import React from "react"
import './register'
import '../App'
import './login'
import { useState } from 'react'
import 'C:/Users/USER/Desktop/Universidad/App_Tesis/App_for_blind_people/app-for-blind-people/src/App.css'


import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    NavLink
} from "react-router-dom";


const Navbar = () => {



    return (

        <nav class="navbar fixed-top navbar-expand-md navbar-dark bg-primary  ">
            <div class="container  d-flex  justify-content-between ">
                <Link to="/" class="navbar-brand mb-0 h1 "> Blind Service  </Link>

                <div>
                    <form id="searchbox" class=" d-flex">
                        <input type="text" class="form-control  me-2 " type="search" placeholder="Search..." aria-label="Search" />
                        <button typle="submit" class="btn btn-outline-success  "> Search </button>
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
                        <span class="navbar-toggler-icon"></span>
                    </button>

                    <div class="collapse navbar-collapse" id="navbarNav">
                        <ul class="navbar-nav ms-auto mb-2 mb-lg-0">


                            <li >

                                <Link to="/register" class="nav-link" >
                                    Registrase
                                </Link>
                            </li>
                            <li class="nav-item active">
                                < Link to="/login" class="nav-link">
                                    Iniciar sesión
                                </Link>
                            </li>

                        </ul>
                    </div>

                

                </div>

            </div>
        </nav>

    );

}


export default Navbar;
