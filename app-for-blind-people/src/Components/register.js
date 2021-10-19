import React from "react";
import 'C:/Users/USER/Desktop/Universidad/App_Tesis/App_for_blind_people/app-for-blind-people/src/App.css'
const Register = () => {
    return (

      <body>
      <section class="vh-100   gradient-custom">
        <div id="container" class= "container py-5 h-100">
          <div class="row justify-content-center align-items-center h-100">
            <div class="col-12 col-lg-9 col-xl-7">
              <div id="card" class="card shadow-2-strong card-registration" >
                <div class="card-body p-4 p-md-5">
                  <h3 class="mb-4 pb-2 pb-md-0 mb-md-5">Llenar campos</h3>
                  <form>
      
                    <div class="row">
                      <div class="form-outlin mb-4">
      
                        <div class="form-outline">
                        <label class="form-label" for="firstName"> Nombre</label>
                          <input type="text" id="firstName" placeholder="First name" class="form-control form-control-lg" />
                      
                        </div>
      
                      </div>
                     
                    </div>
      
                    <div class="row">
                      <div class="col-md-6 mb-4 ">
      
                        <div class="form-outline w-100">
                        <label class="form-label" for="emailAddress">Correo</label>
                        <input type="email" id="emailAddress" class="form-control form-control-lg" />
                          
                        </div>
      
                      </div>
                      <div class="col-md-6 mb-4 pb-2">

                        <div class="form-outline">
                            <label class="form-label" for="phoneNumber">Teléfono</label>
                            <input type="tel" id="emailAddress" class="form-control form-control-lg" />

                        </div>

                    </div>
                   
                    </div>
      
                    <div class="row">
                      <div class="col-md-6 mb-4 pb-2">
      
                        <div class="form-outline">
                          <label class="form-label" for="password">Contraseña</label>
                          <input type="password" id="password" class="form-control form-control-lg" />
                          
                        </div>
      
                      </div>
                      <div class="col-md-6 mb-4 pb-2">
                        <div class="form-outline">
                          <label class="form-label" for="password">Repetir Contraseña</label>
                          <input type="password" id="password" class="form-control form-control-lg" /> 
                        </div>
      
                      </div>
                    </div>
      
                    <div class="row">
                      <div class="col-md-6 mb-4 pb-2">
      
                      <div class="form-outline">
                          <label class="form-label" for="PorcentajeDiscapacidad">Porcentaje de Discapacidad</label>
                          <input type="number" id="PorcentajeDiscapacidad" class="form-control form-control-lg" />
                        </div>
                      </div>
                      <div class="col-md-6 mb-4 pb-2">
      
                        <div class="form-outline">
                            <br/>
                            
                        <input id="Submit" class=" container btn btn-primary btn-lg" type="submit" value="Crear" />
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
      </body>
      
    );
}
export default Register;
