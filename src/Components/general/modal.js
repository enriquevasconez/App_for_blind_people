

const Modal = ({ children, btnTitle, btnClass, modalLarge, keyName }) => {
    console.log(`#generalModal${keyName}`);
    return (
        <div>
            <button type="button" class={btnClass ? btnClass : "btn"} data-bs-toggle="modal" href={`#generalModal${keyName}`}
            // data-bs-target={`#generalModal${key}`}
            >
                {btnTitle}
            </button>
            {/* <a class={btnClass ? btnClass : "btn"} href={`#generalModal${keyName}`} role="button">{btnTitle}</a> */}
            <div class="modal fade" id={`generalModal${keyName}`} tabindex="-1" aria-hidden="true">
                <div class={`modal-dialog ${modalLarge ? "modal-xl" : ""} modal-dialog-centered modal-dialog-scrollable`}>
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