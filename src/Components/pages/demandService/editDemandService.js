import React, { useState, useEffect } from 'react'
import { RQRS } from '../../../Classes/rqrp'

const EditDemandService = ({ data, update }) => {

    const [state, setState] = useState({
        title: data?.title,
        description: data?.description
    })
    const updateDemandService = async () => {
        await new RQRS('demand-service')
            .patch(
                {
                    subResourse:data?.id,
                    bodyParams:{
                        "demand_title": state.title,
                        "demand_description": state.description
                      }
            }
            )
            .then(
                result => {
                    alert("Solicitud actualizada correctamente");
                    update();
                }
            )
            .catch(
                err => {
                    console.log(err);
                }
            )

    }

    const componentStateSetter = (keyName, value) => {
        let stateCopy = { ...state };
        stateCopy[keyName] = value;
        setState(stateCopy);
    }
    return (
        <div>
            <h2>Solicitar servicio</h2>
            <form
                role="Editar solicitud"
                onSubmit={(event) => {
                    event.preventDefault();
                    updateDemandService();
                }}
            >
                <div class="mb-3">
                    <label for="titleInput"
                        class="form-label">Titulo</label>
                    <input
                        type="text"
                        class="form-control"
                        id="titleInput"
                        aria-describedby="titleInputAux"
                        required
                        value={state.title}
                        onChange={(event) => {
                            componentStateSetter("title", event.target.value);
                        }}
                    />
                    <div id="titleInputAux" class="form-text">Ingrese el nombre del servicio.</div>
                </div>
                <div class="mb-3">
                    <label for="descripInput" class="form-label">Descripción</label>
                    <textarea
                        class="form-control"
                        id="descripInput"
                        rows="3"
                        aria-describedby="descripInputAux"
                        required
                        value={state.description}
                        onChange={(event) => {
                            componentStateSetter("description", event.target.value);
                        }}
                    />
                    <div id="descripInputAux" class="form-text">Ingrese una descripción del servicio.</div>
                </div>
                <button type="submit" data-bs-dismiss="modal"
                    aria-label="Close" class="btn btn-primary">Actualizar</button>
                <button type="button" data-bs-dismiss="modal"
                    aria-label="Close" class="btn">Cerrar</button>
            </form>
        </div>
    )
}

export default EditDemandService;