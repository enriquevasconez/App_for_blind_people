import React, { useState, useEffect, useRef, useLayoutEffect } from "react";


import './footer'
import Navbar from './navbar'
import './service.css'
import { useNavigate, useParams } from 'react-router-dom'


const ServiceDetail = () => {

    const { service_id } = useParams(); 

    const [service, setService] = useState([]);

    const [redirect, setRedirect] = useState(false)
//{props.match.params.service_id}

useLayoutEffect(() => {
    window.scrollTo(0, 0)
});

    useEffect( () => {

        const res =  fetch(
            `https://blind-people-app-backend.herokuapp.com/service/${service_id } `,
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
                return resp.json();

            }
        }).then(data => {


            setService(data)
            console.log(data)


        }).catch((error) => {
            console.log(error)
        });

    }, [service_id])

    // let content = null;

    // if (users) {


    //     content = users.map((service, key) =>



    //     )
    // } else {
    //     content = "Error inesperado"
    // }



    return (
        <div>

            <Navbar />

            <div className="container" >
                <hr></hr>
                <form >

                    <div className="row">
                        <div className="  col-md-12 col-xs-4 item-photo mb-3">

                            <div class="card">
                            <div class="card-body">
                                <img
                                    src={service.service_image}
                                    className="card-img-top ServiceItem-img"
                                    alt={service.service_name}
                                    
                                />
                            </div>
                            </div>

                        </div>

                        {/* {imgPreview.filepreview !== null ?
                    <img className="previewimg" src={} alt="uploadimage" /> : null
                } */}

                    </div>
                    <div className="row">
                        <div className="col-md-4  mb-4" style={{ border: '0px solid gray' }}>
                            {/* <!-- Datos del vendedor y titulo del producto --> */}

                            <label className="form-label" htmlFor="serviceName"> Nombre del servicio</label>
                            <input readOnly class="form-control-plaintext" type="text" id="serviceName"
                                name="service_name"
                                placeholder=" Ingrese Nombre"
                                className="form-control form-control-lg"
                                value={service.service_name}
                                style={{"backgroundColor":"white"}}
                            />


                        </div>

                        {/* <!-- Precios --> */}
                        <div className='col-md-4  mb-4'>
                            <label className="form-label" htmlFor="type"> Tipo de servicio</label>
                            <input   type="text" id="serviceName"
                                name="type"
                                className="form-control form-control-lg"
                                value={service?.sc?.sc_name}
                                readOnly
                                style={{"backgroundColor":"white"}}

                            />


                        </div>
                        <div className='col-md-4 mb-4'>
                            <label className="form-label" htmlFor="phone"> Teléfono</label>
                            <input type="text" id="user_phone"
                                readOnly
                                className="form-control form-control-lg"
                                value={service?.user?.user_phone}
                                style={{"backgroundColor":"white"}}

                            />
                        </div>
                    </div>
                    <div className="row">
                        {/* <!-- Detalles especificos del producto --> */}

                        <div className='col-md-4 mb-4'>
                            <label className="title-attr" htmlFor="price" style={{ marginTop: '15px' }} ><small>Precio</small></label>

                            <input type="text" id="price"
                                name="service_price"

                                className="form-control form-control-lg" readOnly
                                value={service.service_price}
                                style={{"backgroundColor":"white"}}

                            />
                        </div>

                        <div className='col-md-4  mb-4'>
                            <label className="title-attr" htmlFor="privincia" style={{ marginTop: '15px' }} ><small>Provincia</small></label>


                            <input type="text" id="price"
                                name="Province"
                                readOnly
                                className="form-control form-control-lg"
                                value={"asdasd"}
                                style={{"backgroundColor":"white"}}

                            />

                        </div>
                        <div className='col-md-4 mb-4'>
                            <label className="title-attr" htmlFor="ciudad" style={{ marginTop: '15px' }} ><small>Ciudad</small></label>

                            <input type="text" id="price"
                                name="City"

                                className="form-control form-control-lg" readOnly
                                value={"asdasd"}
                                style={{"backgroundColor":"white"}}

                            />


                 
                        </div>

                    </div>
                    

                    <div className="col-xs-9">
                        <ul className="menu-items list-inline">
                            <li className="active">Detalle del producto</li>

                        </ul>
                        <div style={{ width: '100%', borderTop: '1px solid silver' }}>
                            <p style={{ padding: '15px' }}>
                                <textarea class="form-control"
                                    readOnly
                                    name="service_description"
                                    value={service.service_description}
                                    style={{"resize":"none","height":"300px","backgroundColor":"white" }}
                                />
                            </p>
                        </div>

                    </div>

                    <div className="row">
                        <div className="col-md-12 mb-4 pb-2">

                            <div className="form-outline">

                                <input id="Cancel" className=" container btn btn-primary btn-lg" type="cancel"
                                    value="Mostrar comentarios" />

                            </div>
                        </div>
                    </div>
                </form>
            </div>


        </div>

    );
}

export default ServiceDetail;