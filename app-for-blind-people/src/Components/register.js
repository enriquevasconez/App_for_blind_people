import React from "react";
import 'C:/Users/USER/Desktop/Universidad/App_Tesis/App_for_blind_people/app-for-blind-people/src/App.css'
const Register = () => {
  
 const handleSubmit = e =>{
   e.preventDefault();
    console.log('Hellow this works :)')
  }
    return (
 
      <section onSubmit={handleSubmit} className="vh-100   gradient-custom">
        <div id="container" className= "container py-5 h-100">
          <div className="row justify-content-center align-items-center h-100">
            <div className="col-12 col-lg-9 col-xl-7">
              <div id="card" className="card shadow-2-strong card-registration" >
                <div className="card-body p-4 p-md-5">
                  <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Llenar campos</h3>
                  <form>
      
                    <div className="row">
                      <div className="form-outlin mb-4">
      
                        <div className="form-outline">
                        <label className="form-label" htmlFor="firstName"> Nombre</label>
                          <input type="text" id="firstName" placeholder="First name" className="form-control form-control-lg" />
                                            </div>
      
                      </div>
                     
                    </div>
      
                    <div className="row">
                      <div className="col-md-6 mb-4 ">
      
                        <div className="form-outline w-100">
                        <label className="form-label" htmlFor="emailAddress">Correo</label>
                        <input type="email" id="emailAddress" className="form-control form-control-lg" />
                          
                        </div>
      
                      </div>
                      <div className="col-md-6 mb-4 pb-2">

                        <div className="form-outline">
                            <label className="form-label" htmlFor="phoneNumber">Teléfono</label>
                            <input type="tel" id="emailAddress" className="form-control form-control-lg" />

                        </div>

                    </div>
                   
                    </div>
      
                    <div className="row">
                      <div className="col-md-6 mb-4 pb-2">
      
                        <div className="form-outline">
                          <label className="form-label" htmlFor="password">Contraseña</label>
                          <input type="password" id="password" className="form-control form-control-lg" />
                          
                        </div>
      
                      </div>
                      <div className="col-md-6 mb-4 pb-2">
                        <div className="form-outline">
                          <label className="form-label" htmlFor="password">Repetir Contraseña</label>
                          <input type="password" id="password" className="form-control form-control-lg" /> 
                        </div>
      
                      </div>
                    </div>
      
                    <div className="row">
                      <div className="col-md-6 mb-4 pb-2">
      
                      <div className="form-outline">
                          <label className="form-label" htmlFor="PorcentajeDiscapacidad">Porcentaje de Discapacidad</label>
                          <input type="number" id="PorcentajeDiscapacidad" className="form-control form-control-lg" />
                        </div>
                      </div>
                      <div className="col-md-6 mb-4 pb-2">
      
                        <div className="form-outline">
                            <br/>
                            
                        <input id="Submit" className=" container btn btn-primary btn-lg" type="submit" value="Crear" />
                            </div>
                        </div>

                    </div>
                    
                  </form>
                </div>
              </div>
            </div>
          </div>
        </div>
      
      </section>
 
    );
}
export default Register;
