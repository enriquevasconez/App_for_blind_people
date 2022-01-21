import React, { useEffect, useState } from "react";
import Navbar from './navbar'
import ReactPaginate from 'react-paginate';
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import Service from "./serviceRegister";


const Home = () => {

    // const  {serviceValues}  = useContext(GlobalContext);
    // console.log("usando contexto", GlobalContext);

    const [servicios, setServicios] = useState([]);
    const [busqueda, setBusqueda] = useState("");
    const [redirect, setRedirect] = useState(false);
    const [pageCount, setpageCount] = useState(0);
    const [filtro, setFiltro] = useState(busqueda);


    useEffect(() => {
        const getComments = async () => {
            const res = await fetch(
                `https://blind-people-app-backend.herokuapp.com/service?service_name=${filtro}&order=desc&take=12&skip=0`,
                {
                    headers: {
                        'Content-type': 'application/json',
                        "x-api-key": "420f77de-2cea-4e13-841a-b43ca729a7a9"
                    }

                }

            );
            const response=await res.json();
            const data = response.result;
            const count= response.count;
            console.log(data, count);
            setpageCount(Math.ceil(count/12));

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


            <div key={service.service_id} class="col-md-4 mb-3">
                <Link style={{ "color": "black" }} to={"/serviceDetail/" + service.service_id} className="nav-link"  >
                    <div class="card">

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
            `https://blind-people-app-backend.herokuapp.com/service?service_name=${filtro}&order=desc&take=12&skip=${currentPage}`, {
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
        e.preventDefault();
       setFiltro(busqueda)
        
    }


   





    return (


        <div className="home">

            <Navbar />


            <div id="main-content" style={{ 'margin': '50px' }} className="py-5 p-.5  mb-4">

                <div class="row" className="  row height d-flex justify-content-end align-items-center ">
                    <div class="col-md-6" >
                        <form id="searchbox" className=" d-flex" onSubmit={e => { e.preventDefault(); }}>

                            <input type="text" className="form-control  me-2 " type="search"
                                name="busqueda"
                                value={busqueda}
                                placeholder="Buscar..."
                                aria-label="Search"
                                onChange={(e) => handleOnChange(e)}

                            />
                            {/* <button typle="submit" className="btn btn-outline-success  "> Search </button> */}
                            <button className="btn btn-success" onClick={handleSubmit}>
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