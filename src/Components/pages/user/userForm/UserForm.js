import React, { useState } from 'react'
import { RQRS } from "../../../../Classes/rqrp";

const UserForm = ({ userData }) => {

    const [state, setState] = useState(
        {
            user: {
                user_name: userData?.user_name || "",
                user_email: userData?.user_email || "",
                password: userData?.password || "",
                user_phone: userData?.user_phone || ""
            },
            extras: {
                password: ""
            },
            error: {
                msg: "",
                status: false,
            },
            loading: false
        }
    );

    const stateSetter = (keyName, subkey, value) => {
        let stateCopy = { ...state };
        stateCopy[keyName][subkey] = value;
        setState(stateCopy);
    }

    const createUser = async (event) => {
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
                    this.stateSetter("error", "status", true);
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

    return (
        <form onSubmit={createUser} className="container needs-validation">
            <h3 className=" text-center">¡Hola! Completa tus datos</h3>
            {state.error.status ? <div class="alert alert-danger" role="alert">
                {state.error.msg}
            </div>
                : null}
            <div class="mb-3 mt-3">
                <label for="nameInput" class="form-label">Nombre</label>
                <input
                    type="text"
                    class="form-control"
                    id="nameInput"
                    minLenght="5"
                    placeholder="Elias Ramos"
                    aria-label="Ingrese su nombre."
                    value={state.user.user_name}
                    onChange={(event) => {
                        stateSetter("user", "user_name", event.target.value)
                    }}
                    aria-describedby="nameHelp"
                    required
                />
                <small id="nameHelp" class="form-text text-muted">
                    Ingrese su nombre completo.
                </small>
            </div>
            <div className="row mb-3">
                <div className="col-6 ">
                    <label for="emailInput" class="form-label">Correo</label>
                    <input
                        type="email"
                        class="form-control"
                        id="emailInput"
                        placeholder="correo@correo.com"
                        aria-label="Ingrese su correo."
                        value={state.user.user_email}
                        onChange={(event) => {
                            stateSetter("user", "user_email", event.target.value)
                        }}
                        required
                    />
                </div>
                <div className="col-6">
                    <label for="phoneInput" class="form-label">Telefono</label>
                    <input
                        type="number"
                        class="form-control"
                        id="phoneInput"
                        aria-label="Ingrese su contraseña."
                        minLength="7"
                        maxLength="10"
                        value={state.user.user_phone}
                        onChange={(event) => {
                            stateSetter("user", "user_phone", event.target.value)
                        }}
                        aria-describedby="passwordHelp"
                        required
                    />
                   
                </div>
            </div>
            <div className="row mb-3">
                <div className="col-6 ">
                    <label for="passwordInput" class="form-label">Contraseña</label>
                    <input
                        type="password"
                        class="form-control"
                        id="passwordInput"
                        aria-label="Ingrese su contraseña."
                        placeholder="************"
                        minLength="8"
                        pattern="^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$"
                        value={state.user.password}
                        onChange={(event) => {
                            stateSetter("user", "password", event.target.value)
                        }}
                        aria-describedby="passwordHelp"
                        required
                    />
                </div>
                <div className="col-6">
                    <label for="repasswordInput" class="form-label">Reingrese contraseña</label>
                    <input
                        type="password"
                        class="form-control"
                        id="repasswordInput"
                        aria-label="Ingrese su contraseña."
                        placeholder="************"
                        minLength="6"
                        pattern="^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$"
                        value={state.extras.password}
                        onChange={(event) => {
                            stateSetter("extras", "password", event.target.value)
                        }}
                        aria-describedby="passwordHelp"
                        required
                    />

                </div>
                <small id="passwordHelp" class="form-text text-muted">
                    La contraseña debe contener al menos 8 digitos y valores alfanumericos.
                </small>
            </div>
            <div class="container">
                <div class="row">
                    <div class="col-12 text-center">
                        <button class="btn btn-success" type="submit">Registrarse</button>
                    </div>
                    <div className="col-12 text-center mt-4">
                        <a class="text-decoration-none" href="/login">Iniciar sesión</a>
                    </div>
                </div>
            </div>
        </form>
    )
}

export default UserForm;