import Card from "../general/card"

const ServicePresenter = ({ services, onCurrentPageChange, maxPages, currentPage, cardFunction, charging }) => {


    const getPages = (maxPages) => {
        let pages = [];
        if (maxPages > 4) {
            if (currentPage + 1 < maxPages && currentPage + 1 > 3) {
                pages = [1, "...", currentPage + 1, "...", maxPages];
            } else {
                pages = [1, 2, 3, "...", maxPages];
            }
        } else {
            pages = Array.from({ length: maxPages }, (_, i) => i + 1);
        }
        return pages.map((element, index) => {
            return (
                <li
                    key={`nav-${index}`}
                    class={`page-item ${element === "..." ? "disabled" : ""}`}
                >
                    <button
                        class={` page-link ${element === currentPage + 1 ? "btn btn-success active" : ""}`}
                        aria-label={element === currentPage + 1 ? `Actualemente esta en la pagina ${element}` : `Ir a la pagina ${element}`}
                        onClick={(event) => {
                            event.preventDefault();
                            onCurrentPageChange(element - 1);
                        }}
                    >
                        {element}
                    </button>
                </li>
            )
        });
    }

    return (
        <div id="box" className="row">
            {
                services.length>0?
                services.map(
                    (service, key) =>
                        cardFunction !== undefined || cardFunction !== null ?
                            <Card
                                key={`service-card-${key}`}
                                imageUri={service.service_image}
                                title={service.service_name}
                                description={service.service_description}
                                serviceLink={`/serviceDetail/${service.service_id}`}
                                price={service.service_price}
                                category={service.sc.sc_name}
                                serviceID ={service.service_id}
                                
                            />
                            :
                            cardFunction(service, key)
                ):
                <h1 className="m-4">No se encontraron coincidencias con su busqueda</h1>
            }
            <div className={`d-flex justify-content-center mt-5 mb-5 ${charging?"":"d-none"}`}>
                <div class="spinner-border" role="status">
                    <span class="visually-hidden">Loading...</span>
                </div>
            </div>
            <nav aria-label="Navegador de paginas">
                <ul class="pagination justify-content-center">
                    <li class={`page-item ${currentPage === 0 ? "disabled" : ""}`}>
                        <button class="page-link" aria-label="Ir a la pagina anterior"
                            onClick={(event) => {
                                event.preventDefault();
                                onCurrentPageChange(currentPage - 1);
                            }}
                        >Anterior</button>
                    </li>
                    {getPages(maxPages)}
                    <li class={`page-item ${currentPage === maxPages - 1 ? "disabled" : ""}`}>
                        <button class="page-link" aria-label="Ir a la pagina siguiente"
                            onClick={(event) => {
                                event.preventDefault();
                                onCurrentPageChange(currentPage + 1);
                            }}>
                            Siguiente</button>
                    </li>
                </ul>
            </nav>

        </div>
    )
}

export default ServicePresenter;