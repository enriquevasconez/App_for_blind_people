
import React, { useState, useEffect } from 'react'
import { RQRS } from "../../../Classes/rqrp";



const Comments = ({ serviceID, commentaries, setService, getServices }) => {

    let user = JSON.parse(localStorage.getItem('user-info'))
    const [edit, setEdit] = useState({
        edits: false,
        clickedComment: null
    })

    const [state, setState] = useState(
        {
            comments: {
                comment: "",
                service: serviceID,
                user: user.user_id,


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


    const [update, setUpdate] = useState(
        {
            comments: {
                comment: "",
                service: serviceID,
                user: user.user_id,


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

    const updateSetter = (keyName, subkey, value) => {
        let stateCopy = { ...update };
        stateCopy[keyName][subkey] = value;
        setUpdate(stateCopy);
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
                    getServices()

                    stateSetter("comments", "comment", "")

                    return result.json();
                }
            )
            .then(
                (result) => {

                    stateSetter("error", "status", false);
                }
            )
            .catch(
                error => {
                    stateSetter("error", "msg", "Verifique su conexión a internet.")
                    stateSetter("error", "status", true);
                }
            )
            .finally(() => { stateSetter("formState", "name", "needs-validation") });

    }

   
    const error = (event) => {
        event.preventDefault();
        stateSetter("formState", "name", "was-validated")
    }

    const editComment = (clikedid,comment) => {
        setEdit({
            edits: !edit.edits,
            clickedComment: clikedid
        })

       update.comments.comment = comment

    }

    const updateComment = async (event) => {
        event.preventDefault();
        await new RQRS("comment/"+ edit.clickedComment)
            .patch(
                {
                    bodyParams: {
                        ...update.comments
                    }
                }
            )
            .then(
                (result) => {
                    getServices()
                    edit.edits = false

                   
                    return result.json();
                }
            )
            .then(
                (result) => {

                    updateSetter("error", "status", false);
                }
            )
            .catch(
                error => {
                    updateSetter("error", "msg", "Verifique su conexión a internet.")
                    updateSetter("error", "status", true);
                }
            )
            .finally(() => { updateSetter("formState", "name", "needs-validation") });

    }



    return (
        <section role="Comentarios de usuarios" className="mt-2">
            <h4>Agregar comentario</h4>
            <form onSubmit={newCommnet} onError={error} >

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

                commentaries?.slice(0).reverse().map(
                    (element, key) =>

                        <div key={element.comment_id} className="card mt-2">

                            {edit.edits && edit.clickedComment == element.comment_id ?
                                <form onSubmit={updateComment} onError={error}>
                                    <textarea class="form-control"
                                        placeholder="Ingrese comentario"
                                        arial-label="Area para ingresar comentario"
                                        value={update.comments.comment}
                                        onChange={(event) => {
                                            updateSetter("comments", "comment", event.target.value)
                                        }}
                                        style={{ "resize": "none", "height": "100px", "backgroundColor": "white" }}
                                        required
                                    />
                                    <div className="row d-flex justify-content-center">
                                        <div className="col-md-6 mb-4 pb-2 d-flex justify-content-center">
                                            <div className="form-outlin mb-4">
                                                <input id="Submit" className=" container btn btn-primary btn-lg" type="submit" value="Actualizar" />
                                               
                                            </div>
                                        </div>
                                    </div>

                                </form>
                                :
                                <div>
                                <div className="card-body">
                                    <h5 class="card-text mt-2">{element.user.user_name}</h5>
                                    <p class="card-text mt-2">{element.comment}</p>
                                    <p class="card-text mt-2">  {new Date(element.createdDate).toLocaleDateString().toString()}</p>
                                </div>
                                   <div className=" d-flex justify-content-end ">
                                   <div className=" pb-1 me-1 d-flex ">
                                       <div className="form-outlin ">
                                           {
                                               element.user.user_id == user.user_id ?
                                                   <button className=" container btn btn-primary" type='button' onClick={() => editComment(element.comment_id, element.comment)}> Editar Comentario</button>
                                                   :
                                                   null
                                           }
                                       </div>
                                   </div>
                               </div>
                               </div>
                            }
                         
                           
                        </div>)
            }

        </section>
    )
}




export default Comments;