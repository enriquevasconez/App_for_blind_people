import React, { useEffect, useState } from "react";
import Navbar from './navbar'
import ReactPaginate from 'react-paginate';
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Service from "./serviceRegister";


const Home = () => {



    const [servicios, setServicios] = useState([]);
    const [tablaUsuarios, setTablaUsuarios] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [redirect, setRedirect] = useState(false)
    const [pageCount, setpageCount] = useState(0)


    useEffect(async () => {

        const res = await fetch(
            `https://blind-people-app-backend.herokuapp.com/service?_page=1&_limit=12`,
            {
                headers: {
                    'Content-type': 'application/json',
                    "x-api-key": "420f77de-2cea-4e13-841a-b43ca729a7a9"
                }

            }

        ).then((resp) => {
            if (resp.status >= 300) {

                console.log(resp)
                //  setPassError("Error inesperado compruebe su conexión a internet");

            } else {

                setRedirect(true);


                const total = resp.headers.get('content-length');

                console.log('total:' + total);


                return resp.json();

            }
        }).then(data => {


            setServicios(data);
            setTablaUsuarios(data);

            console.log(data);


        }).catch((error) => {
            console.log(error);
        });

    }, [])


    let content = null

    if (servicios) {


        content = servicios.map((service, key) =>


            <div key={service.service_id} class="col-md-4 mb-3">
                <Link style={{ "color": "black" }} to={"/serviceDetail/" + service.service_id} className="nav-link"  >
                    <div   class="card">

                        <img
                            style={{ "maxwidth": "250", "maxheight": "250" }}
                            src={service.service_image}
                            class="card-img-top ListItem-img"
                            alt={service.service_name}
                        />
                        <div class="card-body">
                            <h5 class="card-title">{service.service_name}</h5>
                            <p class="card-text">
                                {service.service_id}

                            </p>
                        </div>

                    </div>
                </Link>
            </div>


        )
    } else {
        content = "Error inesperado"
    }


    const fetchComments = async (currentPage) => {
        const res = await fetch(
            `https://blind-people-app-backend.herokuapp.com/service?_page=${currentPage}&_limit=12`, {
            headers: {
                'Content-type': 'application/json',
                "x-api-key": "420f77de-2cea-4e13-841a-b43ca729a7a9"
            }
        }
        );
        const data = await res.json();
        return data;
    }



    const handlePageClick = async (data) => {

        let currentPage = data.selected + 1
        console.log(currentPage)

        const commentsFormServer = await fetchComments(currentPage);

        setServicios(commentsFormServer)
    }


    const handleChange = (e) => {
        e.preventDefault(); 
        setBusqueda(e.target.value);
        filtrar(e.target.value)
    }



    const filtrar = (terminoBusqueda) => {
        var resultadosBusqueda = tablaUsuarios.filter((elemento) => {
            if (elemento.service_name.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
                || elemento.service_id.toString().toLowerCase().includes(terminoBusqueda.toLowerCase())
                || elemento.service_description.toString().toLowerCase().includes(terminoBusqueda.toLowerCase()) 
            ) {
                return elemento;
            }
        });
        setServicios(resultadosBusqueda);
    }



    return (


        <div className="home">

            <Navbar />


            <div id="main-content" style={{ 'margin': '50px' }} className="py-5 p-.5  mb-4">

                <div class="row"  className="  row height d-flex justify-content-end align-items-center ">
                    <div class="col-md-6" >
                        <form id="searchbox" className=" d-flex" onSubmit={e => { e.preventDefault(); }}>

                            <input type="text" className="form-control  me-2 " type="search"
                                value={busqueda}
                                placeholder="Buscar..."
                                onChange={handleChange}
                                aria-label="Search"
                            />
                            {/* <button typle="submit" className="btn btn-outline-success  "> Search </button> */}
                            <button className="btn btn-success">
                                <FontAwesomeIcon icon={faSearch} /> </button>
                        </form>
                    </div>
                </div>

                <div className="row">
                    <div className="col-md-12">
                    <h1>Servicios Disponibles</h1>
                    </div>
                </div>

                <div id="box" className="row">


                    {content}

                </div>

            </div>
            <nav aria-label="Page navigation example">
                <ReactPaginate

                    previousLabel={'Previous'}
                    nextAriaLabel={'Next'}
                    breakLabel={'...'}
                    pageCount={15}
                    marginPagesDisplayed={2}
                    pageRangeDisplayed={3}
                    onPageChange={handlePageClick}
                    containerClassName={'pagination justify-content-center'}
                    pageClassName={'page-item'}
                    pageLinkClassName={'page-link'}
                    previousClassName={'page-item'}
                    previousLinkClassName={'page-link'}
                    nextClassName={'page-item'}
                    nextLinkClassName={'page-link'}
                    breakClassName={'page-item'}
                    breakLinkClassName={'page-link'}
                    activeClassName={'active'}
                />

            </nav>
        </div>
    );

};
export default Home;