import React, { useEffect } from "react"



import { Link, useNavigate } from "react-router-dom";


const Navbar = ({ navigate }) => {

    let user = JSON.parse(localStorage.getItem('user-info'))

    const history = useNavigate();

    const logOut = () => {
        localStorage.clear()
        history("/home")
    }

    const goToIniciarSesion = () => { window.location.href = "/login"; }
    const goToRegister = () => { window.location.href = "/register"; }

    return (

        <nav className={`navbar navbar-expand-lg navbar-dark bg-primary  `}>
            <div className={`container-fluid`}>
                <a
                    class="navbar-brand mb-0 h1"
                    href="/"
                    aria-label="Ir a pagina principal"
                    title="Ir a pagina principal"
                >
                    Blind Service
                </a>
                {
                    navigate !== false ?
                        (
                            <div>
                                <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                                    <span class="navbar-toggler-icon"></span>
                                </button>
                                {
                                    localStorage.getItem('user-info') ?
                                        <div class="collapse navbar-collapse" id="navbarSupportedContent">

                                            <ul class="navbar-nav me-auto">
                                                <li class="nav-item">
                                                    <a
                                                        class="btn btn-primary"
                                                        href="/serviceRegister"
                                                        aria-label="Publicar servicio que estés ofertando."
                                                        title="Publicar servicio que estés ofertando."
                                                    >
                                                        Publicar servicio
                                                    </a>
                                                </li>
                                                <li class="nav-item">
                                                    <a
                                                        class="btn btn-primary"
                                                        href="/Forum"
                                                        aria-label="Solicitar algún servicio que aún no se encuentra ofertado en la plataforma."
                                                        title="Solicitar algún servicio que aún no se encuentra ofertado en la plataforma."
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
                                                        aria-label="Ir a la página de configuración de usuario."
                                                        title="Ir a la página de configuración de usuario."
                                                    >
                                                        <i class="fa-solid fa-user me-2"></i>
                                                        Ver usuario
                                                    </a>
                                                </li>
                                                <li class="nav-item">
                                                    <button
                                                        class="btn btn-success"
                                                        type="button"
                                                        onClick={logOut}
                                                        aria-label="Cerrar sesión en la aplicación."
                                                        title="Cerrar sesión en la aplicación."
                                                    >
                                                        <i class="fa-solid fa-arrow-right-from-bracket me-2"></i>
                                                        Cerrar Sesión
                                                    </button>
                                                </li>
                                            </ul>
                                        </div>
                                        :
                                        <div class="collapse navbar-collapse" id="navbarSupportedContent">

                                            <div className="d-flex ms-auto">
                                                <div class="btn-toolbar"
                                                    role="Botones de acceso."
                                                    aria-label="Registro y acceso para usuarios."
                                                >
                                                    <button
                                                        type="button "
                                                        onClick={goToIniciarSesion}
                                                        class="btn btn-primary me-2"
                                                        aria-label="Iniciar sesión en la aplicación."
                                                        title="Iniciar sesión en la aplicación."
                                                    >
                                                        <i class="fa-solid fa-arrow-right-to-bracket me-2"></i>
                                                        Iniciar Sesión
                                                    </button>
                                                    <button
                                                        type="button"
                                                        onClick={goToRegister}
                                                        class="btn btn-success"
                                                        aria-label="Registrarse en la aplicación."
                                                        title="Registrarse en la aplicación."
                                                    >
                                                        Registrarse
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                }
                            </div>
                        )
                        : null}
            </div>
        </nav >

    );
}
export default Navbar;