import React, { useState, useEffect } from "react";
import { Navigate } from 'react-router-dom';
import validate from "../../../validateRegister";
import UpdateForm from "../../../updateForm";
import { useNavigate } from 'react-router-dom'

const ProfileForm = () => {
  let user = JSON.parse(localStorage.getItem('user-info'))



  const { handleChange, values, handleSubmit, errors } = UpdateForm(submit, validate);


  const [redirect, setRedirect] = useState(false)
  const [passError, setPassError] = useState("")


  async function submit() {
    values.access_token = user.access_token;
    values.user_id = user.user_id
    const baseURI = "https://blind-people-app-backend.herokuapp.com/user/"
    const id_URI = user.user_id
    const response = await fetch(baseURI + id_URI, {
      method: 'PATCH',
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
          resp.json()
            .then((response_json) => {

              const { password, password2, ...result } = values;
              localStorage.setItem("user-info", JSON.stringify(result))
              console.log(response_json);
              history("/");
            })
        }
      }).catch((error) => {
        console.log(error)
      });
  }


  const history = useNavigate();

  useEffect(() => {
    if (!localStorage.getItem('user-info')) {
      history("/")
    }
  }, [])



  if (redirect) {
    return <Navigate to="/login" />

  }

  function cancel() {
    history("/")
  }




  return (
    <form onSubmit={handleSubmit}>
      <h3 className="mb-4 pb-2 pb-md-0 mb-md-5">Actualizar Datos</h3>
      {passError && <p> {passError} </p>}
      <div className="row">
        <div className="form-outlin mb-4">

          <div className="form-outline">
            <label className="form-label" htmlFor="firstName"> Nombre</label>
            <input type="text" id="firstName"
              name="user_name"
              placeholder=" Ingrese Nombre"
              className="form-control form-control-lg"
              value={values.user_name}
              onChange={handleChange}
            />
            {errors.user_name && <p>{errors.email}</p>}
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

          </div>

        </div>

      </div>

      <div className="row">
        <div className="col-md-6 mb-4 pb-2">


          <div className="form-outline">
            <label className="form-label" htmlFor="password">Contraseña</label>
            <input type="password" id="password" className="form-control form-control-lg"
              name="password"
              placeholder=" Ingrese Contraseña"

              value={values.password}
              onChange={handleChange}
            />
            {errors.password && <p>{errors.password}</p>}

          </div>

        </div>
        <div className="col-md-6 mb-4 pb-2">
          <div className="form-outline">
            <label className="form-label" htmlFor="Rpassword">Repetir Contraseña</label>
            <input type="password" id="Rpassword" className="form-control form-control-lg"
              name="password2"
              placeholder=" Repetir Contraseña"

              value={values.password2}
              onChange={handleChange}
            />

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

        <div className="col-md-6 mb-4 pb-2">

          <div className="form-outline">
            {/* <br /> */}
            <input id="Submit" className=" container btn btn-primary btn-lg" type="submit" value="Actualizar" />

          </div>
        </div>
        <div className="col-md-6 mb-4 pb-2">

          <div className="form-outline">
            {/* <br /> */}
            <input id="Submit" onClick={cancel} className=" container btn btn-primary btn-lg" type="cancel" value="Cancelar" />

          </div>
        </div>


      </div>

    </form>
  );
}

export default ProfileForm
