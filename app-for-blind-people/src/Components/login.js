import React, { useEffect, useState } from "react";
import { Redirect } from 'react-router-dom';
import '../App.css'
import axios from 'axios';
import { validEmail, validPassword } from './Regex.js';
import Navbar from './navbar';
import Home from './home'

import {useHistory} from 'react-router-dom'
const Login = () => {


  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [redirect, setRedirect] = useState(false)
  const [emailErr, setEmailErr] = useState(false);
  const [pwdError, setPwdError] = useState(false);
  const [emailEmty, setEmailEmpty] = useState("");
  const [passError, setPassError] = useState("");

  const history = useHistory();
  useEffect(()=>{
    if (localStorage.getItem('user-info')) {
        history.push("/")
    }
  }, [])

  const submit = async (e) => {
    
    
    
    e.preventDefault();

    if (email === "") {

      setEmailEmpty("LLene el campo");
      

    } else {
      if (!validEmail.test(email)) {
        setEmailErr(true);
        setEmailEmpty("El correo no es válido");
      }
      else {
        
        let response = await fetch('https://blind-people-app-backend.herokuapp.com/user/login', {
          method: 'POST',
          headers: { 'Content-type': 'application/json' , "x-api-key" : "420f77de-2cea-4e13-841a-b43ca729a7a9"},
           body: JSON.stringify({
            email,
            password,
          }) 
          
        }) .then((resp) => {
          if (resp.status >= 300) {
            console.log(resp)
            alert("Usuario no encontrado")
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

  }
  if (redirect) {
    return <Redirect to="/home" />
  }

 

  return (
    
    <section onSubmit={submit} className="vh-100   gradient-custom">
      
      <div id="container" className="container py-5 h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-12 col-lg-9 col-xl-7">
            <div id="card" className="card shadow-2-strong card-registration" >
              <div className="card-body p-4 p-md-5">
              <Navbar />
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5"> Llenar Datos</h3>
                <form>

                  <div className="row">
                    <div className="form-outlin mb-4">

                      <div className="form-outline">
                        <label className="form-label" htmlFor="emailAddress">Correo</label>
                        <input type="email" id="emailAddress" className="form-control form-control-lg"
                          onChange={e => setEmail(e.target.value)} />
                           {emailEmty && <p>{emailEmty}</p> }
                      </div>

                    </div>

                  </div>


                  <div className="row">
                    <div className="form-outlin mb-4">

                      <div className="form-outline">
                        <label className="form-label" htmlFor="password">Contraseña</label>
                        <input type="password" id="password" className="form-control form-control-lg"
                          onChange={e => setPassword(e.target.value)} />

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

export default Login
