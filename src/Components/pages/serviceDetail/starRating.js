import React, { useState, useEffect } from 'react'
import { RQRS } from "../../../Classes/rqrp";

const Star = ({ serviceID }) => {
    
    let user = JSON.parse(localStorage.getItem('user-info'))

    const [rating, setRating] = useState(null)

    const colors = {
        yellow:"#ffc107",
        grey:"#e4e5e9"

    }

    const [state, setState] = useState(
        {
            score: {
                score_number: 0,
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

    const newScore = async (event) => {
        event.preventDefault();
        await new RQRS("score")
            .post(
                {
                    bodyParams: {
                        ...state.score
                    }
                }
            )
            .then(
                (result) => {
                   


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




    const acutalScore =  (event) => {
        event.preventDefault();
        console.log(rating)
    }
   

  
    return (
        
        <section role="Comentarios de usuarios" className="mt-2">
            <h5>De su calificación</h5>
            
                       
                            <div>
                                <div className="input-group">
                                    {[...Array(5)].map ((star, position) => {

                                        return( 
                                        <div className="d-flex justify-content-center flex-wrap input">
                                        <label className='d-none df' for={"star"+position}  > Sistema </label> 

                                            <input id={"star"+position}  type="radio" name="ratingvalue" value={ state.score.score_number} onClick={()=>setRating( position+1)} />
                                            <i  aria-label='Sistema de calificacion' className="fa-solid fa-star star"
                                             style = {  state.score.score_number <= rating  ?   {"color":"black"} :  {"color":"gray"} }  > </i>
                                                                                 
                                        </div>
                                        )
                                    })}                                   
                                </div>
                              
                            </div>

                       
            

        </section>

    )
}

export default Star;