import React, { useState } from 'react'
import { RQRS } from '../../../Classes/rqrp'

const CreateDemandService = ({ update }) => {
    const [state, setState] = useState({
        title: "",
        description: ""
    });

    const createDemandService = async () => {
        const user=await JSON.parse(localStorage.getItem('user-info'));
        await new RQRS('demand-service')
            .post({
                bodyParams:{
                    "demand_title": state.title,
                    "demand_description": state.description,
                    "user": user.user_id
                  }
            })
            .then(
                ()=>{
                    setState({
                        title: "",
                        description: ""
                    });
                    alert("Solicitud agregada correctamente");
                    update();
                }
            )
            .catch(err => {alert(err)})

    }

    const componentStateSetter = (keyName, value) => {
        let stateCopy = { ...state };
        stateCopy[keyName] = value;
        setState(stateCopy);
    }

    return (
        <div className="card">
            <div className="card-body">
                <h2>Solicitar servicio</h2>
                <form
                    role="Solicitar servicio"
                    onSubmit={(event) => {
                        event.preventDefault();
                        createDemandService();
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
                            onChange={(event)=>{
                                componentStateSetter("title", event.target.value);
                            }}
                        />
                        <div id="titleInputAux" class="form-text">Ingrese el nombre del servicio que desea solicitar.</div>
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
                            onChange={(event)=>{
                                componentStateSetter("description", event.target.value);
                            }}
                        />
                        <div id="descripInputAux" class="form-text">Ingrese una descripción del servicio que desea solicitar.</div>
                    </div>
                    <button type="submit" class="btn btn-primary">Solicitar</button>
                </form>
            </div>
        </div>
    )
}

export default CreateDemandService;