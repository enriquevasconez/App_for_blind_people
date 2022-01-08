import React, { useState, useEffect } from "react";

import './login'
import './footer'

import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  NavLink
} from 'react-router-dom'

import Navbar from './navbar'
import { Navigate } from 'react-router-dom';
import validate from "./validateRegister";
import useForm from "./useForm";
import { useHistory } from 'react-router-dom'
import Footer from "./footer";



const Register = () => {

  const {handleChange, values, handleSubmit, errors} = useForm(submit, validate);
  
  const [redirect, setRedirect] = useState(false)
  const [passError, setPassError] = useState("")

  async function submit() {
     
    const response = await fetch('https://blind-people-app-backend.herokuapp.com/user', {
      method: 'POST',
      headers: { 'Content-type': 'application/json', "x-api-key": "420f77de-2cea-4e13-841a-b43ca729a7a9" },
      body: JSON.stringify({
        user_name: values.user_name,
        user_email: values.user_email,
        password: values.password,
        user_phone: values.user_phone,
   
      })
    })
      .then((resp) => {
        if (resp.status >= 300) {

          console.log(resp)
          setPassError("Este correo ya está siendo utilizado");
        } else {
          setRedirect(true);
        }
      }).catch((error) => {
        console.log(error)
      });
  }

  /* const [user_name, setName] = useState("")
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
  const [phoneNum, setphoneNum] = useState(false);
  

 


  const submit = async (e) => {
    e.preventDefault();

    if (user_name === "") {
      setuserEmpty("El campo no puede estar vacío");

    } else {
      setuserEmpty("")
    }

    if (user_email === "") {

      setEmailEmpty("El campo no puede estar vacío");

    }
    else {
      if (!validEmail.test(user_email)) {
        setEmailErr(true);
        setEmailEmpty("El correo debe tener un formato válido");

      } else {
        setEmailEmpty("")
      }
    }
    if (user_phone === "") {
      setPhoneErr("El campo no puede estar vacío")

    } else {
      if (!onlyNumbers.test(user_phone)) {
        setphoneNum(true);
        setPhoneErr("Solo puede ingresar números")

      } else {
        if (user_phone.length < 7 || user_phone.length > 10) {
          setPhoneErr("El número debe contener 7 o 10 dígidos")
        } else {

          setPhoneErr("")
        }

      }
    }
    if (password === "") {
      setPassError("El campo no puede estar vacío")
    } else {
      if (password !== repeat) {
        setPassError("Las contraseñas deben ser iguales")
      } else {
        if (!validPassword.test(password)) {
          setPwdError(true);
          setPassError("La contraseña debe tener un formativo válido")
        } else {
          setPassError("")
          const response = await fetch('https://blind-people-app-backend.herokuapp.com/user', {
            method: 'POST',
            headers: { 'Content-type': 'application/json', "x-api-key": "420f77de-2cea-4e13-841a-b43ca729a7a9" },
            body: JSON.stringify({
              user_name,
              user_email,
              password,
              user_phone,
              blind_discapacity_percentage
            })
          })
            .then((resp) => {
              if (resp.status >= 300) {
    
                console.log(resp)
                setEmailEmpty("Este correo ya está siendo utilizado");
              } else {
                setRedirect(true);
              }
            }).catch((error) => {
              console.log(error)
            });
        }
    
      }
   
    }
    

  } onSubmit={submit} */
  
  const history = useHistory();
  
  useEffect(() => {
    if (localStorage.getItem('user-info')) {
      history.push("/")
    }
  }, [])

  

  if (redirect) {
    return <Navigate to="/login" />

  }

 


  return (
    <div>
    <section  className="vh-100   gradient-custom">
      <Navbar />
      <div id="container" className="container py-5 h-100">
        <div className="row justify-content-center align-items-center h-100">
          <div className="col-12 col-lg-9 col-xl-7">
            <div id="card" className="card shadow-2-strong card-registration" >
              <div className="card-body p-4 p-md-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Regístrese</h3>
                <form onSubmit={handleSubmit}>
                {passError && <p> {passError} </p>}
                  <div className="row">
                    <div className="form-outlin mb-4">

                      <div className="form-outline">
                        <label className="form-label" htmlFor="firstName"> Nombre</label>
                        <input type="text" id="firstName"
                          name ="user_name"
                          placeholder=" Ingrese Nombre"
                          className="form-control form-control-lg" 
                          value={values.user_name}
                          onChange={handleChange}
                          />
                           {errors.user_name && <p>{errors.user_name}</p>}
                        
                        {/*onChange={e => setName(e.target.value)} 
                         {userEmty && <p>{userEmty}</p>} */}

                      </div>

                    </div>

                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4 ">

                      <div className="form-outline w-100">
                        <label className="form-label" htmlFor="emailAddress">Correo</label>
                        <input type="text" id="emailAddress" className="form-control form-control-lg"
                          name="user_email"
                          placeholder=" Ingrese Correo" 
                          value={values.user_email}
                          onChange={handleChange}
                          />
                          {errors.email && <p>{errors.email}</p>}
                        
                        {/*onChange={e => setEmail(e.target.value)} 
                        {emailEmty && <label aria-labelledby={emailEmty} > {emailEmty}</label>} */}

                      </div>

                    </div>
                    <div className="col-md-6 mb-4 pb-2">

                      <div className="form-outline">
                        <label className="form-label" htmlFor="phoneNumber">Teléfono</label>
                        <input type="text" id="phoneNumber" className="form-control form-control-lg"
                          name="user_phone"
                          placeholder="Ingrese Teléfono"
                          value={values.user_phone}
                          onChange={handleChange}
                          />
                          {errors.user_phone && <p>{errors.user_phone}</p>}
                        {/* onChange={e => setPhone(e.target.value)}  
                        {phoneErr && <p>{phoneErr}</p>} */}


                      </div>

                    </div>

                  </div>

                  <div className="row">
                    <div className="col-md-6 mb-4 pb-2">


                      <div className="form-outline">
                        <label className="form-label" htmlFor="password">Contraseña</label>
                        <input type="password" id="password" className="form-control form-control-lg"
                          name="password2"
                          placeholder=" Ingrese Contraseña"
                          
                          value={values.password2}
                          onChange={handleChange}
                          />
                           {errors.password && <p>{errors.password}</p>}
                        {/*onChange={e => setPassword(e.target.value)}  
                        {passError && <p>{passError}</p>} */}


                      </div>

                    </div>
                    <div className="col-md-6 mb-4 pb-2">
                      <div className="form-outline">
                        <label className="form-label" htmlFor="Rpassword">Repetir Contraseña</label>
                        <input type="password" id="Rpassword" className="form-control form-control-lg"
                         name ="password"
                          placeholder=" Repetir Contraseña"
                         
                          value={values.password}
                          onChange={handleChange}
                        />
                          {errors.password && <p>{errors.password}</p>}
                        {/* onChange={e => setRepeat(e.target.value)}
                         {passError && <p>{passError}</p>} */}
                      </div>

                    </div>
                  </div>

                  <div className="row">
                    {/* <div className="col-md-6 mb-4 pb-2">

                      <div className="form-outline">
                        <label className="form-label" htmlFor="PorcentajeDiscapacidad">Porcentaje de Discapacidad</label>
                        <input type="number" id="PorcentajeDiscapacidad" className="form-control form-control-lg"
                          placeholder =" Porcentaje de Discapacidad"
                          onChange={e => setBlind(e.target.value)} />
                      </div>
                    </div> */}

                    <div className="col-md-12 mb-4 pb-2">

                      <div className="form-outline">
                        {/* <br /> */}
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
   
    </div>

  );
}

export default Register
