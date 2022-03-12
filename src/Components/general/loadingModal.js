

const LoadingModal = ({ }) => {

    return (
        <div className="position-absolute bg-primary h-100 w-100">
            <div className="d-flex aligns-items-center justify-content-center">
                <div class="spinner-border text-primary" role="status">
                    <span class="visually-hidden">Cargando</span>
                </div>
            </div>
        </div>
    )
}

export default LoadingModal