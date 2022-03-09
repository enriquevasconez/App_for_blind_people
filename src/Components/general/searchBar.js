

const SearchBar=({value, handleOnChange, handleSubmit})=>{
    return(
        <div className="brand-image ">
                <div className="row" className="  row height d-flex justify-content-center align-items-center ">
                    <div className="col-md-7" >
                        <form id="searchbox" className="d-flex mx-4" onSubmit={e => { e.preventDefault(); }}>
                            <div class="input-group input-group-lg mb-5 mt-5">
                                <input
                                    type="text" className="form-control" type="search"
                                    name="busqueda"
                                    value={value}
                                    placeholder="Ingrese nombre del servicio"
                                    aria-label="Ingrese nombre de servicio a buscar en la plataforma."
                                    onChange={handleOnChange}
                                    onKeyPress={
                                        (event) => {
                                            if (event.key === 'Enter') {
                                                handleSubmit();
                                            }
                                        }
                                    }
                                />
                                <button class="btn btn-success"
                                    onClick={handleSubmit}
                                    type="button"
                                    aria-label="Buscar servicios"
                                >
                                    Buscar
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
    )

}

export default SearchBar;