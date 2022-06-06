import { RQRS } from '../../Classes/rqrp'
import React, { useState, useEffect } from "react";

const Card = ({ imageUri, title, description, serviceLink, price, category, serviceID, extras }) => {


    const [scoreService, setScoreService] = useState("")
    const [state, setState] = useState({})

    useEffect(async () => {
        await new RQRS(`score/service-score`)
            .get(
                {
                    subResourse: serviceID,
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
                }
            ).catch((error) => {
                console.log(error)
            });

    }, [serviceID])


    useEffect(async () => {
        const user = await JSON.parse(localStorage.getItem('user-info'));
        setState(user);
        console.log("userState", state)
    }, [])


    return (
        <div class="card mb-3 ">
            <div class="row align-items-center  ">
                <div class="col-sm-4 ">
                    <div>
                        <a href={serviceLink} >
                            <img src={imageUri} class="img-fluid rounded-start img-size" alt={`Imagen de servicio: ${title}`} />
                        </a>
                    </div>
                </div>
                <div class="col-sm-8">
                    <div class="card-body">
                        <a href={serviceLink} className="text-decoration-none">
                            <h5 class="card-title" alt={`Nombre del servicio: ${title}`}>
                                <span class="text-body">
                                    {title}
                                </span>
                                {
                                    state?.user?.user_id === extras?.user?.user_id && state?.user?.user_id !== undefined ?
                                        <i class="fas fa-edit ms-3"></i> : null
                                }
                            </h5>
                        </a>
                        <div class="">
                            <div class="row">
                                <div class="col-10 col-sm-9">
                                    <a href={serviceLink} className="text-decoration-none">
                                        <p class="card-text"><b>Precio: </b>{price}</p>
                                    </a>
                                    <a href={serviceLink} className="text-decoration-none">
                                        <p class="card-text"><b>Categoria: </b>{category}</p>
                                    </a>
                                    <a href={serviceLink} className="text-decoration-none">
                                        <p class="card-text"><b>Descripcion: </b>{description}</p>
                                    </a>
                                    <a href={serviceLink} className="text-decoration-none">
                                        <p class="card-text mt-2"><small class="text-muted"><b>Fecha de creacion: </b>12/12/2022</small></p>
                                    </a>
                                </div>
                                <div class="col d-flex align-items-end">
                                    <a href={serviceLink} className="text-decoration-none">
                                        <p class="card-text mt-2"><small >Calificacion</small></p>
                                        {scoreService != 0 ?
                                            <h1 style={{ "textAlign": "center" }}>{parseFloat(scoreService).toFixed(1)}</h1>
                                            :
                                            <h1 style={{ "textAlign": "center" }}>--</h1>

                                        }

                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;