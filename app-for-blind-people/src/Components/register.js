import React, { useState,useEffect } from "react";

import 'C:/Users/USER/Desktop/Universidad/App_Tesis/App_for_blind_people/app-for-blind-people/src/App.css'
import './login'


import { validEmail, validPassword } from './Regex.js';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink}  from 'react-router-dom'
import Navbar from './navbar'
import { Redirect } from 'react-router-dom';




const Register = () => {


  const [user_name, setName] = useState("")
  const [user_email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [repeat, setRepeat] = useState("")
  const [user_phone, setPhone] = useState("")
  const [blind_discapacity_percentage, setBlind] = useState("");
  const [redirect, setRedirect] = useState(false)
  const [emailErr, setEmailErr] = useState(false);
  const [pwdError, setPwdError] = useState(false);
  const [userEmty, setuserEmpty] = useState("");
  const [emailEmty, setEmailEmpty] = useState("");
  const [passError, setPassError] = useState("");
  const [phoneErr, setPhoneErr] = useState("");
  let mensaje =""



  const submit = async (e) => {
    e.preventDefault();

    if (user_name === "") {
      setuserEmpty("El campo no puede estar vació");
      
    } if (user_email === "") {
      
      setEmailEmpty("El campo de correo no puede estar vació");
     
    } else{
      if (!validEmail.test(user_email)) {
        setEmailErr(true);
        setEmailEmpty("El correo debe tener un formato válido");
      
      }
    }
    if (user_phone === ""){
      setPhoneErr("Ingrese teléfono")
    }else{ if(user_phone.length < 7)
      setPhoneErr("El número debe contener 7 dígidos")
    }
    if (password === "") {
        setPassError("EL campo debe estar lleno")
     }else { if (password !== repeat) {
         setPassError("Las contraseña deben ser iguales")
      } else {
        if (!validPassword.test(password)) {
        setPwdError(true);
        setPassError("Contraseña debe tener un formativo válido")
      } else {
        const response = await fetch('https://blind-people-app-backend.herokuapp.com/user', {
          method: 'POST',
          headers: { 'Content-type': 'application/json', "x-api-key" : "420f77de-2cea-4e13-841a-b43ca729a7a9" },
          body: JSON.stringify({
            user_name,
            user_email,
            password,
            user_phone,
            blind_discapacity_percentage
          })  
        })
        .then((resp)=> {
        if (resp.status>=300) {
            
          console.log(resp)
          setEmailEmpty("Ese correo ya está siendo utilizado");
        } else {
          setRedirect(true);
        }
        }).catch((error) => {
          console.log(error)
        });
      }
       
      }
    
  }
  
  }
  if (redirect) {
    return <Redirect to="/login" />

  }
  
  
  return (
    <section  onSubmit={submit}  className="vh-100   gradient-custom">
      <Navbar/>
      <div id="container" className="container py-5 h-100">
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
                        <input type="text" id="firstName"
                          className="form-control form-control-lg" onChange={e => setName(e.target.value)} />
                           {userEmty && <p>{userEmty}</p> }
                          
                      </div>

                    </div>

                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4 ">

                      <div className="form-outline w-100">
                        <label className="form-label" htmlFor="emailAddress">Correo</label>
                        <input type="text" id="emailAddress" className="form-control form-control-lg"
                          onChange={e => setEmail(e.target.value)} />
                           {emailEmty && <p>{emailEmty}</p>}
                          
         

                      </div>

                    </div>
                    <div className="col-md-6 mb-4 pb-2">

                      <div className="form-outline">
                        <label className="form-label" htmlFor="phoneNumber">Teléfono</label>
                        <input type="tel" id="Phone" className="form-control form-control-lg"
                          onChange={e => setPhone(e.target.value)} />
                           {phoneErr && <p>{phoneErr}</p>}
                          

                      </div>

                    </div>

                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4 pb-2">

                      <div className="form-outline">
                        <label className="form-label" htmlFor="password">Contraseña</label>
                        <input type="password" id="password" className="form-control form-control-lg"
                          onChange={e => setPassword(e.target.value)} />
                           {passError && <p>{passError}</p> }
                          

                      </div>

                    </div>
                    <div className="col-md-6 mb-4 pb-2">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="password">Repetir Contraseña</label>
                        <input type="password" id="password" className="form-control form-control-lg"
                         onChange={e => setRepeat(e.target.value)}
                        />
                        {passError && <p>{passError}</p> }
                      </div>

                    </div>
                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4 pb-2">

                      <div className="form-outline">
                        <label className="form-label" htmlFor="PorcentajeDiscapacidad">Porcentaje de Discapacidad</label>
                        <input type="number" id="PorcentajeDiscapacidad" className="form-control form-control-lg"
                          onChange={e => setBlind(e.target.value)} />
                      </div>
                    </div>
                    <div className="col-md-6 mb-4 pb-2">

                      <div className="form-outline">
                        <br />
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

export default Register
