
import React, { useState, useEffect } from 'react'
import { RQRS } from "../../../Classes/rqrp";



const comments = [
    {
        name: "Titulo de comentario",
        description: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        date: "01/01/2021"

    },
    {
        name: "Titulo de comentario",
        description: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        date: "01/01/2021"
    },
    {
        name: "Titulo de comentario",
        description: "It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.",
        date: "01/01/2021"
    }
]

const Comments = ({ serviceID }) => {

    let user = JSON.parse(localStorage.getItem('user-info'))
    
    const [state, setState] = useState(
        {
            comments: {
                comment:"",
                service: serviceID,
                user: user.user_id,
                parent: "1"
            },
            error: {
                msg: "",
                status: false,
            },
            formState: {
                loading: false,
                name: "needs-validation"
            }
        }
    );
    
    const stateSetter = (keyName, subkey, value) => {
        let stateCopy = { ...state };
        stateCopy[keyName][subkey] = value;
        setState(stateCopy);
    }


    const newCommnet = async (event) => {
        event.preventDefault();
        await new RQRS("comment")
            .post(
                {
                    bodyParams: {
                        ...state.comments
                    }
                }
            )
            .then(
                (result) => {
                    state.comments.comment=""
                    return result.json();
                }
            )
            .then(
                (result) => {
                  
                    this.stateSetter("error", "status", false);
                }
            )
            .catch(
                error => {
                   stateSetter("error", "msg", "Error en autenticacion, por favor verifique los datos ingresados.")
                   stateSetter("error", "status", true);
                }
            )
            .finally(() => {  stateSetter("formState", "name", "needs-validation") })
    }
    const error = (event) => {
        event.preventDefault();
        stateSetter("formState", "name", "was-validated")
    }
    

    /*   async function submit() {
          const response = await fetch('https://blind-people-app-backend.herokuapp.com/comment', {
              method: 'POST',
              headers: { 'Content-type': 'application/json', "x-api-key": "420f77de-2cea-4e13-841a-b43ca729a7a9" },
              body: JSON.stringify({
  
                  comment: commnets,
                  service: serviceID,
                  user: user.user_id,
                  parent: "1"
              })
          })
              .then((resp) => {
                  if (resp.status >= 300) {
  
                      console.log(resp)
                      console.log("Complete los campos");
                  } else {
                      console.log("Funciona");
                  }
              }).catch((error) => {
                  console.log(error)
              });
      }
  
   */

    return (
        <section role="Comentarios de usuarios" className="mt-2">
            <h4>Agregar comentario</h4>
            <form onSubmit={newCommnet}  onError={error} >

                <textarea class="form-control"
                    placeholder="Ingrese comentario"
                    arial-label="Area para ingresar comentario "
                    value={state.comments.comment}
                    onChange={(event) => {
                       stateSetter("comments", "comment", event.target.value)
                      }}
                    style={{ "resize": "none", "height": "100px", "backgroundColor": "white" }}
                    required
                />
                <div className="row d-flex justify-content-center">
                    <div className="col-md-6 mb-4 pb-2 d-flex justify-content-center">
                        <div className="form-outlin mb-4">
                            <input id="Submit" className=" container btn btn-primary btn-lg" type="submit" value="Comentar" />
                        </div>
                    </div>
                </div>
            </form>

            <h4>Comentarios</h4>
            {
                comments.map(
                    (element, key) =>
                        <div key={key} className="card mt-2">
                            <div className="card-body">
                                <h5 class="card-text mt-2">{element.name}</h5>
                                <p class="card-text mt-2">{element.description}</p>
                                <p class="card-text mt-2"><small class="text-muted">{element.date}</small></p>
                                <p>{serviceID}</p>
                            </div>
                        </div>)
            }
        </section>
    )

}


export default Comments;