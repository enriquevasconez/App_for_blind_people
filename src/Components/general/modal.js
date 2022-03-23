

const Modal = ({ children, btnTitle, btnClass }) => {

    return (
        <div>
            <button type="button" class={btnClass ? btnClass : "btn"} data-bs-toggle="modal" data-bs-target="#generalModal">
                {btnTitle}
            </button>
            <div class="modal fade" id="generalModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div class="modal-dialog modal-dialog-centered">
                    <div class="modal-content">
                        <div class="modal-body">
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Modal;