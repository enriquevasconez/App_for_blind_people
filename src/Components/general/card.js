
const Card = ({ imageUri, title, description, serviceLink, price }) => {

    return (
        <div class="card mb-3 ">
            <div class="row align-items-center  ">
                <div class="col-sm-4 ">
                    <div>
                        <a href={serviceLink} >
                            <img src={imageUri} class="img-fluid rounded-start img-size" alt={`Imagen de servicio: ${title}`} />
                        </a>
                    </div>
                </div>
                <div class="col-sm-8">
                    <div class="card-body">
                        <a href={serviceLink} className="text-decoration-none">
                            <h5 class="card-title">
                                <span class="text-body">
                                    {title}
                                </span>
                            </h5>
                        </a>
                        <div class="">
                            <div class="row">
                                <div class="col-10 col-sm-9">
                                    <a href={serviceLink} className="text-decoration-none">
                                        <p class="card-text"><b>Precio: </b>{price}</p>
                                    </a>
                                    <a href={serviceLink} className="text-decoration-none">
                                        <p class="card-text"><b>Categoria: </b>{price}</p>
                                    </a>
                                    <a href={serviceLink} className="text-decoration-none">
                                        <p class="card-text"><b>Descripcion: </b>{description}</p>
                                    </a>
                                    <a href={serviceLink} className="text-decoration-none">
                                        <p class="card-text mt-2"><small class="text-muted"><b>Fecha de creacion: </b>12/12/2022</small></p>
                                    </a>
                                </div>
                                <div class="col d-flex align-items-end">
                                    <a href={serviceLink} className="text-decoration-none">
                                        <p class="card-text mt-2"><small >Calificacion</small></p>
                                        <h1>4.5</h1>
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Card;