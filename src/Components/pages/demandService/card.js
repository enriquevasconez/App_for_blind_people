import React, { useState, useEffect } from 'react';
import Modal from '../../general/modal'
import PropuestasPresenter from './propuestasPresenter'
import ServicesAdder from './servicesAdder'
import EditDemandService from './editDemandService'

const Card = ({ dKey, dService, customerLoggedService, update }) => {
    const [state, setState] = useState({
        user_id: -1
    })

    useEffect(async () => {
        const user = await JSON.parse(localStorage.getItem('user-info'));
        setState({ user_id: user.user_id });
    }, []);

    console.log("user_id", dService.service)
    return (
        <div key={`dservice${dKey}`} className="card m-3 bg-success">
            <div className="row">
                <div className="col-9 ">
                    <div class="card-body">
                        <h5 class="card-title">{dService.demand_title}</h5>
                        <p class="card-text">{dService.demand_description}</p>
                        <h6 class="card-subtitle mb-2">Solicitud creada por {dService.user.user_name} el {new Date(dService.createdDate).toLocaleDateString().toString()}</h6>
                    </div>
                </div>
                <div className="col-3 p-3 d-flex flex-column">
                    <div class="d-grid gap-2 mx-auto">
                        <Modal
                            btnTitle="Ver Propuestas"
                            btnClass="btn btn-primary"
                            modalLarge={false}
                            keyName={`dservice${dKey}`}
                        >
                            <PropuestasPresenter services={dService.service} />
                        </Modal>
                        <Modal
                            btnTitle={state.user_id === dService.user.user_id ? "Editar solicitud" : "Agregar mis servicios"}
                            btnClass="btn btn-secondary"
                            keyName={`dservice${dKey}s`}
                        >
                            {state.user_id === dService.user.user_id ?
                                <EditDemandService
                                    data={
                                        {
                                            id:dService.demand_id,
                                            title: dService.demand_title,
                                            description: dService.demand_description
                                        }
                                    }
                                    update={update} />
                                :
                                <ServicesAdder services={customerLoggedService} dserviceId={dService.demand_id} update={update} />
                            }
                        </Modal>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;