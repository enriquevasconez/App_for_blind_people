import React, { useEffect, useState, } from "react";
import Navbar from './navbar';
import useForm from "./forumForm";
import validate from "./validateForum";
import { useNavigate } from 'react-router-dom'

const Forum = () => {

  const hStyle = { color: 'red' };
  let user = JSON.parse(localStorage.getItem('user-info'))
  const current = new Date();
  const date = `${current.getDate()}/${current.getMonth() + 1}/${current.getFullYear()}`;

  const { handleChange, comment, handleSubmit, errors } = useForm(submit, validate);

  const [redirect, setRedirect] = useState(false);
  const[commentList, setCommentList] = useState([]);
  const [passError, setPassError] = useState("");

  async function submit() {

  /*   let response = await fetch('https://blind-people-app-backend.herokuapp.com/auth/login', {
      method: 'POST',
      headers: { 'Content-type': 'application/json', "x-api-key": "420f77de-2cea-4e13-841a-b43ca729a7a9" },
      body: JSON.stringify({
        email: values.email,
        password: values.password,
      })

    }).then((resp) => {
      if (resp.status >= 300) {
        values.error = resp.status

        console.log(resp);

        setPassError("Error inesperado")

      } else {
        setPassError("")
        setRedirect(true);

        response = resp.json()
          .then(response_json => {

            localStorage.setItem("user-info", JSON.stringify(response_json))
            console.log(response_json)
            history("/")
          })
      }
    }).catch((error) => {
      console.log(error)

    }); */
    console.log("hol"+comment)
  }
 

  const history = useNavigate();
  useEffect(() => {
    if (!localStorage.getItem('user-info')) {
      history("/")
    }
  }, [])


  /*
     if (servicios) {
 
 
         content = servicios.map((service, key) =>
 
 
             <div key={service.service_id} className="col-md-4 mb-3">
                 <Link style={{ "color": "black" }} to={"/serviceDetail/" + service.service_id} className="nav-link"  >
                     <div className="card">
 
                         <img
                             style={{ "maxwidth": "250", "maxheight": "250" }}
                             src={service.service_image}
                             className="card-img-top ListItem-img"
                             alt={service.service_name}
                         />
                         <div className="card-body">
                             <h5 className="card-title">{service.service_name}</h5>
                             <p  className="card-text">
                                 Precio($ ): {service.service_price} 
 
 
                             </p>
                         </div>
 
                     </div>
                 </Link>
             </div>
         )
     } else {
         content = "Error inesperado"
     }
 */

  return (

    <section className="vh-100   gradient-custom">

      <div >
    
            <div  style={{ 'margin': '50px' }} >
              <div className=" p-4 p-md-5 ">
                <Navbar />
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 d-flex justify-content-center" > Foro de Comentarios</h3>
                {passError && <p> {passError} </p>}
                <form className='from' onSubmit={handleSubmit} >

                  <div className="row">
                    <div className="form-outlin mb-4">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="date-and-name" > {date}{' '}{user.user_name} </label> 
                        
                        <textarea class="form-control"
                          name="comment"
                          value={comment}
                          placeholder="Ingrese servicio a solicitar"
                          arial-label="Area para ingresar solicitud"
                          onChange={handleChange}
                          style={{ "resize": "none", "height": "50px", "backgroundColor": "white" }}
                        />
                        {errors.comment && <p style={hStyle}>{errors.comment}</p>}
                      </div>
                    </div>
                  </div>
                  <div className="row d-flex justify-content-center">
                    <div className="col-md-6 mb-4 pb-2 d-flex justify-content-center">
                      <div className="form-outlin mb-4">
                        <input id="Submit" className=" container btn btn-primary btn-lg" type="submit"
                          value="Comentar" />
                         
                      </div>
                    </div>
                  </div>
                </form>
                <hr />
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 d-flex justify-content-center" > Solicitudes Realizadas</h3>
              </div>
            
            </div>
           
          </div>
   

    </section>

  );
}

export default Forum;
