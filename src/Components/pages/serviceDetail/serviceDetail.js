import React, { useState, useEffect, useRef, useLayoutEffect } from "react";
import Navbar from '../../general/navbar'
import { useParams } from 'react-router-dom'
import { RQRS } from '../../../Classes/rqrp'
import Comments from "./comments";
import { render } from "@testing-library/react";
import Demand from "./demandService";
import Star from "./starRating";
const ServiceDetail = () => {


    const { service_id } = useParams();

    const [service, setService] = useState([]);
    const [scoreUser, setscoreUser] = useState("")
    const [scoreService, setScoreService] = useState("")

    // useLayoutEffect(() => {
    //     window.scrollTo(0, 0)
    // });

    const getServices = async () => {
        await new RQRS(`service`)
            .get(
                {
                    subResourse: service_id,

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

    }

    useEffect(() => {
        getServices()

    }, [service_id])

    useEffect(async () => {
        await new RQRS(`score/service-score`)
            .get(
                {
                    subResourse: service_id,

                }
            )
            .then(
                (resp) => {
                    return resp.json();
                }
            ).then(
                data => {
                    setScoreService(data)
                    console.log(scoreService)
                }).catch((error) => {
                    console.log(error)
                });

    }, [service_id])

    useEffect(async () => {
        await new RQRS(`score/service-score`)
            .get(
                {
                    subResourse: service_id,

                }
            )
            .then(
                (resp) => {
                    return resp.json();
                }
            ).then(
                data => {
                    setScoreService(data)
                    console.log(scoreService)
                }).catch((error) => {
                    console.log(error)
                });

    }, [service_id])

    useEffect(async () => {
        await new RQRS(`score/user-score`)
            .get(
                {
                    subResourse: service?.user?.user_id,

                }
            )
            .then(
                (resp) => {
                    return resp.json();
                }
            ).then(
                data => {
                    setscoreUser(data)

                }).catch((error) => {
                    console.log(error)
                });

    }, [service?.user?.user_id])








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
                        <h6><i class="fa-solid fa-location-dot"></i>Localización:</h6>
                        <p>{`${service?.city?.city}/${service?.city?.state}`}</p>
                        <h6><i class="fa-solid fa-phone"></i>Teléfono de contacto:</h6>
                        <p>{service?.user?.user_phone}</p>
                        <h6><i class="fa-solid fa-circle-star"></i>Calificación:</h6>
                        {scoreUser != 0 ?
                            <p>{parseFloat(scoreUser).toFixed(1)}</p>
                            :
                            <p>El usaurio no tiene calificaciones</p>
                        }

                    </section>
                </div>
                <div className="row mt-4">
                    <div className="col-8">
                        <section className="row" role="Caracteristicas del servicio.">
                            <div className="col-9">
                                <h2>{service.service_name}</h2>
                                <p><b>Precio: </b>{service.service_price}</p>
                                {scoreService != 0 ?
                                    <p><b>Calificación: </b>
                                        {parseFloat(scoreService).toFixed(1)}</p>
                                    :
                                    <p><b>Calificación: </b>
                                        Este servicio no ha sido calificado </p>
                                }
                                <p><b>Lugar: </b>{`${service?.city?.city}/${service?.city?.state}`}</p>
                                {
                                    localStorage.getItem('user-info') ?
                                        <p><b>Teléfono de contacto: </b>{`${service?.user?.user_phone}`}</p>
                                        :
                                        <p><b>Teléfono de contacto: </b> <a class="text-decoration-none" href="/register"> Registrese</a> o  <a class="text-decoration-none" href="/login"> inicie sesión </a> para ver </p>
                                }
                                <p><b>Categoría: </b>{`${service?.sc?.sc_name}`}</p>

                            </div>
                            
                            <div className="col ">
                               <Star   
                               serviceID ={service_id}/>
                            </div>
                            
                            <p>
                                <h3>Descripción del servicio.</h3>
                                {service.service_description}
                            </p>
                            {
                                localStorage.getItem('user-info') ?

                                    <Comments serviceID={service_id}
                                        commentaries={service?.comment}
                                        setService={setService}
                                        getServices={getServices}

                                    />

                                    :
                                    <p><a class="text-decoration-none" href="/register"> Registrese</a> o  <a class="text-decoration-none" href="/login"> inicie sesión</a> para comentar </p>
                            }
                        </section>
                    </div>

                    <div className="col-4 bg-light p-2">
                        <h4>Solicitudes que probablemente pueda solucionar.</h4>

                        <Demand
                            demand={service?.demandservice}
                        />

                    </div>

                </div>
            </div>
        </div>

    );
}


export default ServiceDetail;