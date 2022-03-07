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

    const logOut = () => {
        localStorage.clear()
        history("/home")
    }

    const goToIniciarSesion = () => { window.location.href = "/login"; }
    const goToRegister = () => { window.location.href = "/register"; }


    return (

        <nav className="navbar navbar-expand-lg navbar-dark bg-primary  ">
            <div className="container-fluid">
                <a
                    class="navbar-brand mb-0 h1"
                    href="/"
                    aria-label="Ir a pagina principal"
                    title="Ir a pagina principal"
                >
                    Blind Service
                </a>
                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                    <span class="navbar-toggler-icon"></span>
                </button>
                {/* <div class="collapse navbar-collapse" id="navbarSupportedContent"> */}

                    {
                        localStorage.getItem('user-info') ?
                        <div class="collapse navbar-collapse" id="navbarSupportedContent">
                               
                                <ul class="navbar-nav me-auto">
                                    <li class="nav-item">
                                        <a
                                            class="btn btn-primary"
                                            href="/serviceRegister"
                                            aria-label="Publicar servicio que estes ofertando."
                                            title="Publicar servicio que estes ofertando."
                                        >
                                            Publicar servicio
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <a
                                            class="btn btn-primary"
                                            href="/Forum"
                                            aria-label="Solicitar algun servicio que aun no se encuentra ofertado en la plataforma."
                                            title="Solicitar algun servicio que aun no se encuentra ofertado en la plataforma."
                                        >
                                            Solicitar servicio
                                        </a>
                                    </li>
                                </ul>
                                <ul class="navbar-nav d-flex ms-auto">
                                    <li class="nav-item">
                                        <a
                                            class="btn btn-primary"
                                            href="/editProfile"
                                            aria-label="Ir a la pagina de configuracion de usuario."
                                            title="Ir a la pagina de configuracion de usuario."
                                        >
                                            Ver usuario
                                        </a>
                                    </li>
                                    <li class="nav-item">
                                        <button
                                            class="btn btn-success"
                                            type="button"
                                            onClick={logOut}
                                            aria-label="Cerrar sesion en la aplicacion."
                                            title="Cerrar sesion en la aplicacion."
                                        >
                                            Cerrar Sesión
                                        </button>
                                    </li>
                                </ul>
                            </div>
                            :
                <div class="collapse navbar-collapse" id="navbarSupportedContent">

                            <div className="d-flex ms-auto">
                                <div class="btn-toolbar"
                                    role="toolbar"
                                    aria-label="Registro y acceso para usuarios."
                                >
                                    <button
                                        type="button "
                                        onClick={goToIniciarSesion}
                                        class="btn btn-primary me-2"
                                        aria-label="Iniciar sesion en la aplicacion."
                                        title="Iniciar sesion en la aplicacion."
                                    >
                                        Iniciar Sesión
                                    </button>
                                    <button
                                        type="button"
                                        onClick={goToRegister}
                                        class="btn btn-success"
                                        aria-label="Registrarse en la aplicacion."
                                        title="Registrarse sesion en la aplicacion."
                                    >
                                        Registrarse
                                    </button>
                                </div>
                            </div>
                            </div>
                    }
                {/* </div> */}

            </div>
        </nav >

    );
}
export default Navbar;