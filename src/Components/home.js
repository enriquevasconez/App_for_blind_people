import React, { useEffect, useState, useContext } from "react";
import Navbar from './navbar'
import ReactPaginate from 'react-paginate';
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Service from "./serviceRegister";
import { GlobalContext } from "../globals/globalContext"
import Categories from "./homeComponents/categories"

const Home = () => {

    const { serviceValuesasa } = useContext(GlobalContext);
    console.log("usando contexto", GlobalContext);

    const [servicios, setServicios] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [pageCount, setpageCount] = useState(0);
    const [filtro, setFiltro] = useState(busqueda);


    useEffect(() => {
        const getComments = async () => {
            const res = await fetch(
                `https://blind-people-app-backend.herokuapp.com/service?service_price=${filtro}&service_name=${filtro}&order=desc&take=12&skip=0`,
                {
                    headers: {
                        'Content-type': 'application/json',
                        "x-api-key": "420f77de-2cea-4e13-841a-b43ca729a7a9"
                    }

                }

            );
            const response = await res.json();
            const data = response.result;
            const count = response.count;
            console.log(data, count);
            setpageCount(Math.ceil(count / 12));

            setServicios(data);


        };
        getComments();

        // .then((resp) => {
        //     if (resp.status >= 300) {

        //         console.log(resp)
        //         //  setPassError("Error inesperado compruebe su conexión a internet");

        //     } else {

        //         setRedirect(true);

        //         const total = resp.headers.get('X-Total-Count');

        //         console.log('total:' + total);

        //         setpageCount(Math.ceil(total));

        //         return resp.json();

        //     }
        // }).then(data => {


        //     setServicios(data);
        //     setTablaUsuarios(data);

        //     console.log(data);


        // }).catch((error) => {
        //     console.log(error);
        // });

    }, [filtro])


    let content = null

    if (servicios) {


        content = servicios.map((service, key) =>


            <div key={service.service_id} className="col-md-4 mb-3">
                <Link style={{ "color": "black" }} to={"/serviceDetail/" + service.service_id} className="nav-link"  >
                    <div className="card">

                        <img
                            style={{ "maxwidth": "250", "maxheight": "250" }}
                            src={service.service_image}
                            className="card-img-top ListItem-img"
                            alt={service.service_name}
                        />
                        <div className="card-body">
                            <h5 className="card-title">{service.service_name}</h5>
                            <p  className="card-text">
                                Precio($ ): {service.service_price} 


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
            `https://blind-people-app-backend.herokuapp.com/service?service_price=${filtro}&service_name=${filtro}&order=desc&take=12&skip=${currentPage}`, {
            headers: {
                'Content-type': 'application/json',
                "x-api-key": "420f77de-2cea-4e13-841a-b43ca729a7a9"
            }
        }
        );
        const data = await res.json();

        return data.result;
    }



    const handlePageClick = async (data) => {

        let currentPage = data.selected * 12

        console.log("Current page is" + currentPage)

        const commentsFormServer = await fetchComments(currentPage);
        window.scrollTo(0, 0)
        setServicios(commentsFormServer)

    };

    const handleOnChange = (e) => {
        e.preventDefault();

        setBusqueda(e.target.value);

    };

    const handleSubmit = e => {
        try{
            e.preventDefault();
        }catch(e){}
        setFiltro(busqueda)

    }








    return (


        <div className="home">

            <Navbar />


            <div id="main-content" style={{ 'margin': '50px' }} className="py-5 p-.5  mb-4">

                <div className="row" className="  row height d-flex justify-content-center align-items-center ">

                    <div className="col-md-9" >
                        <form id="searchbox" className=" d-flex" onSubmit={e => { e.preventDefault(); }}>
                            <div class="input-group input-group-lg mb-5 mt-5">
                                <input 
                                type="text" className="form-control" type="search"
                                name="busqueda"
                                value={busqueda}
                                placeholder="Buscar..."
                                aria-label="Buscar"
                                onChange={(e) => handleOnChange(e)}
                                onKeyPress={
                                    (event) => {
                                    if(event.key === 'Enter'){
                                        handleSubmit();
                                    }
                                  }
                                }
                                />
                                <button class="btn btn-success" onClick={handleSubmit} type="button">Search</button>
                                {/* <span class="input-group-text" id="basic-addon2">
                                    <i class="fas fa-search"></i>
                                </span> */}
                            </div>
                            {/* <input type="text" className="form-control  me-2 " type="search"
                                name="busqueda"
                                value={busqueda}
                                placeholder="Buscar..."
                                aria-label="Search"
                                onChange={(e) => handleOnChange(e)}

                            />
                            <button className="btn btn-success" onClick={handleSubmit}>
                                <FontAwesomeIcon icon={faSearch} /> </button> */}
                        </form>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <h1>Categorias</h1>
                    </div>
                </div>
                <Categories/>
                <hr />
                <div className="row">
                    <div className="col-md-12">
                        <h1>Servicios Disponibles</h1>
                    </div>
                </div>

                <div id="box" className="row">


                    {content}

                </div>

            </div>
            <nav aria-label="Sección de paginación ">
                <ReactPaginate

                    previousLabel={'Previous'}
                    nextAriaLabel={'Next'}
                    breakLabel={'...'}
                    pageCount={pageCount}
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