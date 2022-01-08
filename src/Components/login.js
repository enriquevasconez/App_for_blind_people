import React, { useEffect, useState,  } from "react";
import { Navigate } from 'react-router-dom';
import '../App.css'
import { validEmail, validPassword } from './Regex.js';
import Navbar from './navbar';
import Home from './home'
import useForm from "./useForm";
import validate from "./validateInfo";

import { useHistory } from 'react-router-dom'

const Login = () => {
  
  const {handleChange, values, handleSubmit, errors} = useForm(submit, validate);
  
  const [redirect, setRedirect] = useState(false)
  const [passError, setPassError] = useState("")

  async function submit() {
     
    let response =  await fetch('https://blind-people-app-backend.herokuapp.com/auth/login', {
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
          
          setPassError("Usuario no encontrado verificar que correo y contraseña sean las correctas")
    
      } else {
        setPassError("")
          setRedirect(true);

          response = resp.json()
              .then(response_json => {

                  localStorage.setItem("user-info", JSON.stringify(response_json))
                  console.log(response_json)
                  history.push("/")
              })
      }
  }).catch((error) => {
      console.log(error)

  }); 
  }
/*   const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [redirect, setRedirect] = useState(false)
  const [emailErr, setEmailErr] = useState(false);
  const [pwdError, setPwdError] = useState(false);
  const [emailEmty, setEmailEmpty] = useState("");
  const [passError, setPassError] = useState(""); */

  const history = useHistory();
  useEffect(() => {
    if (localStorage.getItem('user-info')) {
      history.push("/")
    }
  }, [])

 /*  const submit = async (e) => {



    e.preventDefault();

    
    if (email === "") {

      setEmailEmpty("El campo no puede estar vacío");


    } else {
      if (!validEmail.test(email)) {
        setEmailErr(true);
        setEmailEmpty("El correo no es válido");
      }
    }
      if (password === "") {
        setPassError("El campo no puede estar vacío")
      } else {
        if (!validPassword.test(password)) {
          setPwdError(true);
          setPassError("Contraseña debe tener un formato válido")
        } else {

          let response = await fetch('https://blind-people-app-backend.herokuapp.com/auth/login', {
            method: 'POST',
            headers: { 'Content-type': 'application/json', "x-api-key": "420f77de-2cea-4e13-841a-b43ca729a7a9" },
            body: JSON.stringify({
              email,
              password,
            })

          }).then((resp) => {
            if (resp.status >= 300) {
              console.log(resp)
              setEmailEmpty("Usuario no encontrado")
            } else {
              setRedirect(true);

              response = resp.json()
                .then(response_json => {

                  localStorage.setItem("user-info", JSON.stringify(response_json))
                  console.log(response_json)
                  history.push("/")

                })


            }
          }).catch((error) => {
            console.log(error)

          });


        }
      }

    if (redirect) {
      return <Navigate to="/home" />
    }

  }
  onSubmit={submit}
 */
  
  return (

    <section  className="vh-100   gradient-custom">

      <div id="container" className="container py-5 h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-12 col-lg-9 col-xl-7">
            <div id="card" className="card shadow-2-strong card-registration" >
              <div className="card-body p-4 p-md-5">
                <Navbar />
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5"> Llenar Datos</h3>
                   {passError && <p> {passError} </p>}
                <form className='from'  onSubmit={handleSubmit} >
    
                  <div className="row">
                    <div className="form-outlin mb-4">

                      <div className="form-outline">
                        <label className="form-label" htmlFor="emailAddress" >Correo</label>
                        <input type="text" name = "email" placeholder="Ingrese correo" id="emailAddress" className="form-control form-control-lg"
                          placeholder=" Ingrese correo"
                          value={values.email}
                          onChange={handleChange}
                         // onChange={e => setEmail(e.target.value)} 
                         />
                         {errors.email && <p>{errors.email}</p>}
                   
                         
                          
                        {/* {emailEmty && <p>{emailEmty}</p>} */}
                      </div>

                    </div>

                  </div>


                  <div className="row">
                    <div className="form-outlin mb-4">

                      <div className="form-outline">
                        <label className="form-label" htmlFor="password">Contraseña</label>
                        <input type="password"  name ="password" id="password" className="form-control form-control-lg"
                          placeholder=" Ingrese contraseña"
                          value={values.password}
                          onChange={handleChange}
                          //onChange={e => setPassword(e.target.value)}
                           />
                           {errors.password && <p>{errors.password}</p>}
               
                      
                           
                          {/* {passError && <p>{passError}</p> } */}

                      </div>

                    </div>

                  </div>

                  <div className="row">

                    <div className="col-md-12 mb-4 pb-2">

                      <div className="form-outlin mb-4">

                        <input id="Submit" className=" container btn btn-primary btn-lg" type="submit"
                          value="Iniciar Sesión" />
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

export default Login;
