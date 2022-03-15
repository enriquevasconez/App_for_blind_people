import React, { useEffect, useState, } from "react";
import PageWHalfImage from "../pageWHalfImage"
import { RQRS } from "../../../Classes/rqrp";
import LoadingModal from "../../general/loadingModal"

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {
        email: "",
        password: "",
      },
      error: {
        msg: "",
        status: false,
      },
      loading: false
    };
  }

  componentDidMount() {
    if (localStorage.getItem('user-info')) {
      window.location.href = "/";
    }
  }

  loginUser = async (event) => {
    event.preventDefault();
    await new RQRS("auth/login")
      .post(
        {
          bodyParams: {
            ...this.state.user
          }
        }
      )
      .then(
        (result) => {
          return result.json();
        }
      )
      .then(
        (result) => {
          localStorage.setItem("user-info", JSON.stringify(result));
          this.stateSetter("error", "status", false);
          window.location.href = "/";
        }
      )
      .catch(
        error => {
          this.stateSetter("error", "msg", "Error en autenticacion, por favor verifique los datos ingresados.")
          this.stateSetter("error", "status", true);
        }
      )
      .finally(() => { })
  }

  stateSetter(keyName, subkey, value) {
    let stateCopy = { ...this.state };
    stateCopy[keyName][subkey] = value;
    this.setState(stateCopy);
  }

  render() {
    return (
      <PageWHalfImage>
        <main className="col-10 col-md-8 col-lg-4 col-xl-4 ">
          <div class="card" role="Inicio de sesion" >
            <div className="card-body ">
              <form onSubmit={this.loginUser} className="container needs-validation">
                <h3 className=" text-center">¡Hola! Ingresa tu correo y contraseña</h3>
                {this.state.error.status ? <div class="alert alert-danger" role="alert">
                  {this.state.error.msg}
                </div>
                  : null}
                <div class="mb-3 mt-3">
                  <label for="emailInput" class="form-label">Correo</label>
                  <input
                    type="email"
                    class="form-control"
                    id="emailInput"
                    placeholder="correo@correo.com"
                    aria-label="Ingrese su correo."
                    value={this.state.user.email}
                    onChange={(event) => {
                      this.stateSetter("user", "email", event.target.value)
                    }}
                    required
                  />
                </div>
                <div class="mb-3">
                  <label for="passwordInput" class="form-label">Contraseña</label>
                  <input
                    type="password"
                    class="form-control"
                    id="passwordInput"
                    aria-label="Ingrese su contraseña."
                    placeholder="************"
                    minLength="8"
                    pattern="^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$"
                    value={this.state.email}
                    onChange={(event) => {
                      this.stateSetter("user", "password", event.target.value)
                    }}
                    aria-describedby="passwordHelp"
                    required
                  />
                  <small id="passwordHelp" class="form-text text-muted">
                    La contraseña debe contener al menos 8 digitos y valores alfanumericos.
                  </small>
                </div>
                <div class="container">
                  <div class="row">
                    <div class="col-12 text-center">
                      <button class="btn btn-success" type="submit">Iniciar sesión</button>
                    </div>
                    <div className="col-12 text-center mt-2">
                      <a class="text-decoration-none" href="/register">Crear cuenta</a>
                    </div>
                    <div className="col-12 text-center mt-4">
                      <a class="text-decoration-none" href="/forgotpass">Olvide mi contraseña</a>
                    </div>
                  </div>
                </div>
              </form>
            </div>

          </div>
        </main>
        {/* <LoadingModal/> */}
      </PageWHalfImage>
    )
  }
}
// const Logins = () => {

//   const hStyle = { color: 'red' };

//   const { handleChange, values, handleSubmit, errors } = useForm(submit, validate);

//   const [redirect, setRedirect] = useState(false)
//   const [passError, setPassError] = useState("")

//   async function submit() {

//     let response = await fetch('https://blind-people-app-backend.herokuapp.com/auth/login', {
//       method: 'POST',
//       headers: { 'Content-type': 'application/json', "x-api-key": "420f77de-2cea-4e13-841a-b43ca729a7a9" },
//       body: JSON.stringify({
//         email: values.email,
//         password: values.password,
//       })

//     }).then((resp) => {
//       if (resp.status >= 300) {
//         values.error = resp.status

//         console.log(resp);

//         setPassError("Usuario no encontrado verificar que correo y contraseña sean las correctas")

//       } else {
//         setPassError("")
//         setRedirect(true);

//         response = resp.json()
//           .then(response_json => {

//             localStorage.setItem("user-info", JSON.stringify(response_json))
//             console.log(response_json)
//             history("/")
//           })
//       }
//     }).catch((error) => {
//       console.log(error)

//     });
//   }


//   const history = useNavigate();
//   useEffect(() => {
//     if (localStorage.getItem('user-info')) {
//       history("/")
//     }
//   }, [])

//   return (

//     <PageWHalfImage>
//       {/* <div className="col-10 col-md-8 col-lg-4 col-xl-4">
//         <div id="card" className="card shadow-2-strong card-registration" >
//           <div className="card-body p-4 p-md-5">
//             <h3 className="mb-4 pb-2 pb-md-0 mb-md-5"> Llenar Datos</h3>
//             {passError && <p style={hStyle}> {passError} </p>}
//             <form className='from' onSubmit={handleSubmit} >

//               <div className="row">
//                 <div className="form-outlin mb-4">

//                   <div className="form-outline">
//                     <label className="form-label" htmlFor="emailAddress" >Correo</label>
//                     <input
//                       type="text"
//                       name="email"
//                       placeholder="Ingrese correo"
//                       id="emailAddress"
//                       className="form-control form-control-lg"
//                       placeholder=" Ingrese correo"
//                       value={values.email}
//                       onChange={handleChange}

//                     />
//                     {errors.email && <p style={hStyle}>{errors.email}</p>}


//                   </div>

//                 </div>

//               </div>


//               <div className="row">
//                 <div className="form-outlin mb-4">

//                   <div className="form-outline">
//                     <label className="form-label" htmlFor="password">Contraseña</label>
//                     <input type="password" name="password" id="password" className="form-control form-control-lg"
//                       placeholder=" Ingrese contraseña"
//                       value={values.password}
//                       onChange={handleChange}
//                     />
//                     {errors.password && <p style={hStyle}>{errors.password}</p>}

//                   </div>

//                 </div>

//               </div>

//               <div class="container">
//                   <div class="row">
//                     <div class="col-12 text-center">
//                       <button class="btn btn-success" type="submit">Iniciar sesión</button>
//                     </div>
//                     <div className="col-12 text-center mt-2">
//                       <a class="text-decoration-none" href="/register">Crear cuenta</a>
//                     </div>
//                     <div className="col-12 text-center mt-4">
//                       <a class="text-decoration-none" href="/forgotpass">Olvide mi contraseña</a>
//                     </div>
//                   </div>
//                 </div>

//             </form>
//           </div>
//         </div>
//       </div> */}
//     </PageWHalfImage>


//   );
// }

export default Login;
