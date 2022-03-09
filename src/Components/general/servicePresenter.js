import { Link, useNavigate } from "react-router-dom";

const ServicePresenter = ({ services, onCurrentPageChange, maxPages, currentPage, pageUpdater }) => {


    const getPages = (maxPages) => {
        let pages = [];
        if (maxPages > 4) {
            pages = [1, 2, 3, "...", maxPages];
        } else {
            pages = Array.from({length: maxPages}, (_, i) => i + 1);
        }
        return pages.map((element, index) => {
            return (
                <li
                    id={`nav-${index}`}
                    class="page-item"
                >
                    <button
                        class={`btn btn-success page-link ${element===currentPage+1?"active":""}`}
                        aria-label={element===currentPage+1?`Actualemente esta en la pagina ${element}`:`Ir a la pagina ${element}`}
                        onClick={(event) =>{
                            event.preventDefault();
                            onCurrentPageChange(element-1);
                            pageUpdater();
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
                services.map(
                    (service, key) =>
                        <div key={service.service_id} className="col-md-4 mb-3">
                            <Link style={{ "color": "black" }} to={"/serviceDetail/" + service.service_id} className="nav-link"  >
                                <div className="card">

                                    <img
                                        style={{ "maxwidth": "250", "maxheight": "250" }}
                                        src={service.service_image}
                                        className="card-img-top ListItem-img"
                                        alt={service.service_name}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{service.service_name}</h5>
                                        <p className="card-text">
                                            Precio($ ): {service.service_price}


                                        </p>
                                    </div>

                                </div>
                            </Link>
                        </div>
                )
            }
            <nav aria-label="Navegador de paginas">
                <ul class="pagination justify-content-center">
                    <li class="page-item">
                        <button class="page-link" aria-label="Ir a la pagina ">Anterior</button>
                    </li>
                    {getPages(maxPages)}
                    <li class="page-item">
                        <button class="page-link" aria-label="Ir a la pagina ">Siguiente</button>
                    </li>
                </ul>
            </nav>
            {/* <nav aria-label="Sección de paginación ">
                                <ReactPaginate

                                    previousLabel={'Previous'}
                                    nextAriaLabel={'Next'}
                                    breakLabel={'...'}
                                    pageCount={pageCount}
                                    marginPagesDisplayed={2}
                                    pageRangeDisplayed={3}
                                    onPageChange={handlePageClick}
                                    containerClassName={'pagination justify-content-center'}
                                    pageClassName={'page-item'}
                                    pageLinkClassName={'page-link'}
                                    previousClassName={'page-item'}
                                    previousLinkClassName={'page-link'}
                                    nextClassName={'page-item'}
                                    nextLinkClassName={'page-link'}
                                    breakClassName={'page-item'}
                                    breakLinkClassName={'page-link'}
                                    activeClassName={'active'}
                                />

                            </nav> */}
        </div>
    )
}

export default ServicePresenter;