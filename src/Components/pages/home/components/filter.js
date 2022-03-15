
const Filter = ({ mobileVersion }) => {


    const formFilter = (
        <div>
            <div class="mb-3">
                <label for={`${mobileVersion ? "mobile" : "desktop"}-categorias`} class="form-label">Categoria</label>
                <select id={`${mobileVersion ? "mobile" : "desktop"}-categorias`} class="form-select" aria-label="Seleccione una categoria de la lista.">
                    <option selected>Seleccione una categoria</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>
            </div>
            <div class="mb-3">
                <label for={`${mobileVersion ? "mobile" : "desktop"}-ciudad`} class="form-label">Ciudad</label>
                <select id={`${mobileVersion ? "mobile" : "desktop"}-ciudad`} class="form-select" aria-label="Seleccione una ciudad.">
                    <option selected>Seleccione una ciudad</option>
                    <option value="1">One</option>
                    <option value="2">Two</option>
                    <option value="3">Three</option>
                </select>
            </div>
            <div class="mb-3">
                <label for={`${mobileVersion ? "mobile" : "desktop"}-calificacion`} class="form-label">Calificación</label>
                <input type="number" class="form-control" id={`${mobileVersion ? "mobile" : "desktop"}-calificacion`} min="0" max="5" placeholder="5" />
            </div>
            <div class="row mb-3">
                <div className="col-6">
                    <label for={`${mobileVersion ? "mobile" : "desktop"}-minPrice`} class="form-label">Precio minimo</label>
                    <input type="number" class="form-control" id={`${mobileVersion ? "mobile" : "desktop"}-minPrice`} min="0" placeholder="0" />
                </div>
                <div className="col-6">
                    <label for={`${mobileVersion ? "mobile" : "desktop"}-maxPrice`} class="form-label">Precio maximo</label>
                    <input type="number" class="form-control" id={`${mobileVersion ? "mobile" : "desktop"}-maxPrice`} min="0" placeholder="99999" />
                </div>

            </div>
        </div>
    )

    return mobileVersion ?
        (<aside role="Filtar resultados de servicios." className="bg-success d-xl-none d-xxl-block">
            <div className="d-flex justify-content-center p-2">
                <button type="button" class="btn btn-primary ">Ordenar</button>
                <button type="button" class="btn btn-primary ms-2" data-bs-toggle="modal" data-bs-target="#filtrosModal">Filtrar</button>
            </div>
            <div class="modal fade" id="filtrosModal" tabindex="-1" aria-labelledby="filtroModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered ">
                    <div class="modal-content me-5 p-e-5">
                        <div class="modal-header">
                            <h5 class="modal-title" id="filtroModalLabel">Filtrar</h5>
                            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div class="modal-body">
                            {formFilter}
                        </div>
                        <div class="modal-footer">
                            <button type="button" class="btn btn-secondary" data-bs-dismiss="modal" aria-label="Limpiar Filtros">Limpiar filtros</button>
                            <button type="button" class="btn btn-primary" aria-label="Aplicar Filtros">Aplicar</button>
                        </div>
                    </div>
                </div>
            </div>
        </aside>)
        :
        (<aside role="Filtar resultados de servicios." className="d-none d-lg-block">
            <div className="card bg-success ">
                <form className="m-4" role="form">
                    <h3 >Filtrar</h3>
                    {formFilter}
                    <div className="d-flex align-items-end mt-4">
                        <button type="button" class="btn btn-secondary" aria-label="Limpiar Filtros">Limpiar filtros</button>
                        <button type="button" class="btn btn-primary ms-2" aria-label="Aplicar Filtros">Aplicar</button>
                    </div>
                </form>
            </div>
        </aside>)
}

export default Filter;