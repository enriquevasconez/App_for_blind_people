import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import Navbar from '../../general/navbar'
import { useParams } from 'react-router-dom'
import { RQRS } from '../../../Classes/rqrp'
import Comments from "./comments";
const ServiceDetail = () => {

    const { service_id } = useParams();

    const [service, setService] = useState([]);

    // useLayoutEffect(() => {
    //     window.scrollTo(0, 0)
    // });

    useEffect(() => {
        new RQRS(`service`)
            .get(
                {
                    subResourse: service_id
                }
            )
            .then(
                (resp) => {
                    return resp.json();
                }
            ).then(
                data => {
                    setService(data)
                }).catch((error) => {
                    console.log(error)
                });

    }, [service_id])

    return (
        <div>
            <Navbar />
            <div className="container" >
                <div className="row mt-4">
                    <div className="col-8">
                        <div class="card">
                            <div class="card-body">
                                <img
                                    src={service.service_image}
                                    className="card-img-top "
                                    alt={`Imagen de servicio: ${service.service_name}`}
                                />
                            </div>
                        </div>
                    </div>
                    <section role="Informacion del prestador del servicio." className="col-4 bg-light p-4">
                        <h4 className="pb-2">Acerca del usuario.</h4>
                        <h5><i class="fa-solid fa-user pe-2"></i>Nombre:</h5>
                        <p>{service?.user?.user_name}</p>
                        <h6><i class="fa-solid fa-location-dot"></i>Localizacion:</h6>
                        <p>{`${service?.city?.city}/${service?.city?.state}`}</p>
                        <h6><i class="fa-solid fa-phone"></i>Telefono de contacto:</h6>
                        <p>{service?.user?.user_phone}</p>
                        <h6><i class="fa-solid fa-circle-star"></i>Calificación:</h6>
                        <p>--</p>
                    </section>
                </div>
                <div className="row mt-4">
                    <div className="col-8">
                        <section className="row" role="Caracteristicas del servicio.">
                            <div className="col-9">
                                <h2>{service.service_name}</h2>
                                <p><b>Precio: </b>{service.service_price}</p>
                                <p><b>Calificación: </b>{service.service_price}</p>
                                <p><b>Lugar: </b>{`${service?.city?.city}/${service?.city?.state}`}</p>
                                <p><b>Telefono de contacto: </b>{`${service?.user?.user_phone}`}</p>
                                <p><b>Categoria: </b>{`${service?.sc?.sc_name}`}</p>

                            </div>
                            <div className="col bg-primary">
                            </div>
                            <p>
                                <h3>Descripción del servicio.</h3>
                                {service.service_description}
                            </p>
                            <Comments serviceID={service_id} />
                        </section>
                    </div>
                    <div className="col-4 bg-light p-2">
                        <h4>Solicitudes que probablemente pueda solucionar.</h4>
                    </div>

                </div>
            </div>


        </div>

    );
}

export default ServiceDetail;