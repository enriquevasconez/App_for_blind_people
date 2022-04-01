import { RQRS } from '../../../Classes/rqrp'

const ServicesAdder = ({ services, dserviceId, update }) => {


    const addServiceDemandService = async (service_id, dserviceId) => {
        await new RQRS(`service/addServiceDemand/${service_id}`)
            .patch({
                queryParams: { "demand-service-id": dserviceId }
            })
            .then(
                response => {
                    update();
                    console.log(`service/addServiceDemand/${service_id}`, response)
                }
            )
            .catch(err => {
                console.log(`service/addServiceDemand/${service_id}`, err)
            })
    }

    return (
        <div>
            {
                services.length !== 0 ?
                    <div>
                        <h4>Seleccione un servicio de la lista</h4>
                        {services.map(
                            (service, key) => {
                                return (
                                    <div className="btn"
                                        key={`service${key}`}
                                        alt={`Añadir propuesta de servicio ${service.service_name}`}
                                        data-bs-dismiss="modal"
                                        aria-label="Close"
                                        onClick={
                                            (event) => {
                                                addServiceDemandService(service.service_id, dserviceId)
                                            }
                                        }
                                    >
                                        <div className="card mb-3">
                                            <div class="row align-items-center">
                                                <div class="col-sm-4 ">
                                                    <div>
                                                        <img src={service.service_image} class="img-fluid rounded-start img-size" alt={`Imagen de servicio: ${service.service_name}`} />
                                                    </div>
                                                </div>
                                                <div class="col-sm-8">
                                                    <div class="card-body">
                                                        <h5 class="card-title">
                                                            <span class="text-body">
                                                                {service.service_name}
                                                            </span>
                                                        </h5>
                                                        <div class="">
                                                            <p class="card-text"><b>Precio: </b>{service.service_price}</p>
                                                            <p class="card-text"><b>Descripcion: </b>{service.service_description}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                )

                            }
                        )}
                    </div>
                    : <h4>Aun no existen propuestas para esta solicitud</h4>
            }
        </div>
    )
}

export default ServicesAdder;