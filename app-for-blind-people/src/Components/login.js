import React from "react";
import '../App.css'

const Login = () => {
    return (

      <body>
      <section class="vh-100   gradient-custom">
        <div id="container" class= "container py-5 h-100">
          <div class="row justify-content-center align-items-center h-100">
            <div class="col-12 col-lg-9 col-xl-7">
              <div id="card" class="card shadow-2-strong card-registration" >
                <div class="card-body p-4 p-md-5">
                  <h3 class="mb-4 pb-2 pb-md-0 mb-md-5"> Llenar Datos</h3>
                  <form>
      
                    <div class="row">
                      <div class="form-outlin mb-4">
      
                        <div class="form-outline">
                        <label class="form-label" for="emailAddress">Correo</label>
                        <input type="email" id="emailAddress" class="form-control form-control-lg" />
                      
                        </div>
      
                      </div>
                     
                    </div>
      
                      
                    <div class="row">
                      <div class="form-outlin mb-4">
      
                        <div class="form-outline">
                          <label class="form-label" for="password">Contraseña</label>
                          <input type="password" id="password" class="form-control form-control-lg" />
                          
                        </div>
      
                      </div>
                     
                    </div>
      
                    <div class="row">
                                        
                      <div class="col-md-12 mb-4 pb-2">
      
                        <div class="form-outlin mb-4">
                                                     
                        <input id="Submit" class=" container btn btn-primary btn-lg" type="submit" value="Iniciar Sesión" />
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
export default Login;
