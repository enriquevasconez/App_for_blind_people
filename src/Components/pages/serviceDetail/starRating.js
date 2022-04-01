import { act } from '@testing-library/react';
import React, { useState, useEffect } from 'react'
import { RQRS } from "../../../Classes/rqrp";

const Star = ({ serviceID }) => {
    
    let user = JSON.parse(localStorage.getItem('user-info'))

    const [rating, setRating] = useState(null);
    
    const colors = {
        yellow:"#ffc107",
        grey:"#e4e5e9"

    }

    const [state, setState] = useState(
        {
            score: {
                score_number: null,
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
        console.log(state.score.score_number)
    }


  
    return (
        
        <section role="De su calificación" className="mt-2">
            <h5>De su calificación</h5>
            
                       
                            <div>
                                <div className="input-group">
                                    {[...Array(5)].map ((star, i) => {
                                        
                                        const ratingvalue = i + 1;
                                       
                                        return( 
                                        
                                        <div className="d-flex ">
                                      <label className='d-none' for={"star"+i}> Calificar con {i + 1} estrella   </label>                          
                                      
                                   
                                        <div className=' null' onClick={newScore}>   
                                        <fieldset>
                                            <legend></legend>
                                            <input    id={"star"+i} type="radio" name="rating" value={ratingvalue}  />
                                             <i   className="fa-solid fa-star star"
                                            onClick={(event) => stateSetter("score", "score_number", ratingvalue)}
                                             style = {  ratingvalue <= state.score.score_number  ?   {"color":"black"} :  {"color":"gray"} }
                                             />
                                        </fieldset>
                                        </div> 
                                           
                                                                    
                                        </div>
                                     
                                        )
                                    })}                                   
                                </div>
                            
                            </div>
        </section>

    )
}

export default Star;