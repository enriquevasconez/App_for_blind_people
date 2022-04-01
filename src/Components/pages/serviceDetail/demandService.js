import React, { useState, useEffect } from 'react'

const Demand = ({ demand }) => {



    return (
        
        <section role="Comentarios de usuarios" className="mt-2">
            
            {
                demand?.map(
                    (element, key) =>

                        <div key={key} className="card mt-2 bg-success">
                            <div>
                                <div className="card-body">
                                    <h5 class="card-text mt-2">{element.demand_title}</h5>
                                    <p class="card-text mt-2"> {element.demand_description} </p>
                                    <p class="card-text mt-2"> <b>Publicado  por:</b> {element.user?.user_name}  </p>
                                    <p class="card-text mt-2"> <b>Publicado el:</b> {new Date(element.createdDate).toLocaleDateString().toString()}  </p>
                                </div>
                              
                            </div>

                        </div>)
            }

        </section>


    )
}

export default Demand;