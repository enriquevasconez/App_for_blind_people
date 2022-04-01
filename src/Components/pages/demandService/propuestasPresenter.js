

const PropuestasPresenter = ({ services }) => {
    console.log(services)
    return (
        <div>
            {
                services.length !== 0 ?
                <div>
                    <h4>Propuestas de servicio</h4>
                    {services.map(
                        (service, key) => {
                            return (
                                <a key={`service${key}`} href={`/serviceDetail/${service.service_id}`} className="text-decoration-none">
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
                                </a>
                            )

                        }
                    )}
            </div>
                    : <h4>Aun no existen propuestas para esta solicitud</h4>
            }
        </div>
    )
}

export default PropuestasPresenter;