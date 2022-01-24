import React from "react";

const Footer = () => {
    return (
        <div class="crazy mt-5">
        
        <footer id="footer"
                class="text-center text-lg-start text-white"
                style={{ backgroundColor: '#3e4551' }}
                >
       
          <div class="container p-4 pb-0">
         
            <section class="">
              
              <div class="row ">
        
                <div class="col-lg-9 col-md-6 mb-4 mb-md-0">
                  <h5 class="text-uppercase">Info página</h5>
      
                  <p>
                    Aplicacion web para que personas pueden ofertar sus servicios
                  </p>
                </div>
             
      
         
      
                <div class="col-lg-3 col-md-6 mb-4 mb-md-0 float-end ">
                  <h5 class="text-uppercase">Links</h5>
                  <ul class="list-unstyled ">
                    <li>
                      <a href="#!" class="text-white">Términos y condiciones</a>
                    </li>
                    <li>
                      <a href="#!" class="text-white">Link 2</a>
                    </li>
                    <li>
                      <a href="#!" class="text-white">Link 3</a>
                    </li>
                    <li>
                      <a href="#!" class="text-white">Link 4</a>
                    </li>
                  </ul>
                </div>
           
              </div>
          
            </section>
          
          </div>
          <div
               class="text-center p-3"
               style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)' }}
               >
            © 2020 Copyright:
            <a class="text-white" href="https://google.com/"
               >EPN</a
              >
          </div>
        
        </footer>
       
      </div>
    );
}

export default Footer;