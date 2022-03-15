
import Navbar from '../general/navbar'
const PageWHalfImage = ({ children }) => {
    // TODO corregir overflow-hidden ya que en pantallas muy pequeñas puede dar problemas.
    return (
        <div className="vh-100 brand-image bg-light half-image overflow-hidden">
            <div className="w-100 position-fixed">
                <Navbar navigate={false} />
            </div>
            <div className="row justify-content-center align-items-center h-100">
                {children}
            </div>
        </div>
    )
}

export default PageWHalfImage;