import React, { useState, useEffect } from 'react';
import { RQRS } from '../../../../Classes/rqrp'

const initState = {
    category_name: "",
    city_name: "",
    score_min: "",
    price_min: "",
    price_max: "",
}



const Filter = ({ mobileVersion, applyFilterf, state, setState }) => {

    // const [state, setState] = useState(initState);
    const [categoriesState, setCategoriesState] = useState([]);
    const [citiesState, setCitiesState] = useState([]);

    useEffect(async () => {
        setCategoriesState(await getOptions("service-category", "sc_name"));
        setCitiesState(await getOptions("city", "city"));
    }, []);

    const changeValue = (key, value) => {
        let stateCopy = { ...state };
        stateCopy[key] = value;
        setState(stateCopy);
    }

    const getOptions = async (resource, column) => {
        let data = await new RQRS(resource).get();
        data = await data.json();
        data = data.result.map(
            (element, index) =>
                <option key={`${column}-${index}`} value={element[column]}>
                    {element[column]}
                </option>
        );
        console.log("data", data);
        return data;
    }

    const onHandleClick = (event) => {
        let statePivot = {}
        for (let key in state) {
            if (state[key] !== "") {
                statePivot[key] = state[key];
            }
        }
        console.log(statePivot)
        applyFilterf()
    }

    const formFilter = (
        <div>
            <div class="mb-3">
                <label for={`${mobileVersion ? "mobile" : "desktop"}-categorias`} class="form-label">Categoria</label>
                <select
                    id={`${mobileVersion ? "mobile" : "desktop"}-categorias`}
                    class="form-select"
                    aria-label="Seleccione una categoria de la lista."
                    value={state["category_name"]}
                    onChange={(event) => { changeValue("category_name", event.target.value) }}
                >
                    <option value="">-- Seleccione una categoría --</option>
                    {categoriesState}
                </select>
            </div>
            <div class="mb-3">
                <label for={`${mobileVersion ? "mobile" : "desktop"}-ciudad`} class="form-label">Ciudad</label>
                <select
                    id={`${mobileVersion ? "mobile" : "desktop"}-ciudad`}
                    class="form-select"
                    aria-label="Seleccione una ciudad."
                    value={state["city_name"]}
                    onChange={(event) => { changeValue("city_name", event.target.value) }}
                >
                    <option value="">-- Seleccione una ciudad --</option>
                    {citiesState}
                </select>
            </div>

            <div class="row mb-3">
                <div className="col-6">
                    <label for={`${mobileVersion ? "mobile" : "desktop"}-minPrice`} class="form-label">Precio minimo</label>
                    <input
                        type="number"
                        class="form-control"
                        id={`${mobileVersion ? "mobile" : "desktop"}-minPrice`}
                        min="0"
                        placeholder="0"
                        value={state["price_min"]}
                        onChange={(event) => { changeValue("price_min", event.target.value) }}
                    />
                </div>
                <div className="col-6">
                    <label for={`${mobileVersion ? "mobile" : "desktop"}-maxPrice`} class="form-label">Precio maximo</label>
                    <input
                        type="number"
                        class="form-control"
                        id={`${mobileVersion ? "mobile" : "desktop"}-maxPrice`}
                        min="0"
                        placeholder="99999"
                        value={state["price_max"]}
                        onChange={(event) => { changeValue("price_max", event.target.value) }}
                    />
                </div>
            </div>
        </div>
    )

    return mobileVersion ?
        (<aside role="Filtar resultados de servicios." className="bg-success d-lg-none d-xl-none d-xxl-none">
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
                            <button type="button" class="btn btn-secondary" onClick={() => { setState(initState) }} data-bs-dismiss="modal" aria-label="Limpiar Filtros">Limpiar filtros</button>
                            <button type="button" class="btn btn-primary" onClick={applyFilterf} data-bs-dismiss="modal" aria-label="Aplicar Filtros">Aplicar</button>
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
                        <button type="button" class="btn btn-secondary"
                            onClick={() => {
                                setState(initState)
                            }}
                            aria-label="Limpiar Filtros">Limpiar filtros</button>
                        <button type="button" class="btn btn-primary ms-2" onClick={applyFilterf} aria-label="Aplicar Filtros">Aplicar</button>
                    </div>
                </form>
            </div>
        </aside>)
}

export default Filter;