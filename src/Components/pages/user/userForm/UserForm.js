import React, { useState, useEffect } from 'react'
import { RQRS } from "../../../../Classes/rqrp";
import { validateForm } from './validateForm';

const UserForm = ({ userData }) => {

    const createUserFlag = userData ? false : true;
    const [state, setState] = useState(
        {
            user: {
                user_name: userData?.user_name || "",
                user_email: userData?.user_email || "",
                password: userData?.password || "",
                user_phone: userData?.user_phone || ""
            },
            extras: {
                password: "",
                equalserr: false
            },
            error: {
                msg: "",
                status: false,
            },
            formState: {
                loading: false,
                name: "needs-validation"
            }
        }
    );

   console.log("createUserFlag", createUserFlag)

    const stateSetter = (keyName, subkey, value) => {
        let stateCopy = { ...state };
        stateCopy[keyName][subkey] = value;
        setState(stateCopy);
    }

    const createUser = async (event) => {
        event.preventDefault();
        if (createUserFlag)
            await validateForm(state)
                .then(
                    () => {
                        return new RQRS("user")
                            .post(
                                {
                                    bodyParams: {
                                        ...state.user
                                    }
                                }
                            )
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
                        stateSetter("error", "status", false);
                        window.location.href = "/";
                    }
                )
                .catch(
                    error => {
                        stateSetter("error", "msg", "Error, este correo esta actualemente siendo utilizado.")
                        stateSetter("error", "status", true);
                    }
                )
                .finally(() => { })
        else
            await new RQRS("user")
                .post(
                    {
                        bodyParams: {
                            ...state.user
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
                        stateSetter("error", "status", true);
                        window.location.href = "/";
                    }
                )
                .catch(
                    error => {
                        stateSetter("error", "msg", "Errorpor favor verifique los datos ingresados.")
                        stateSetter("error", "status", true);
                    }
                )
                .finally(() => {
                    stateSetter("formState", "name", "needs-validation")
                })
    }

    const error = (event) => {
        event.preventDefault();
        stateSetter("formState", "name", "was-validated")
    }
    
    return (
        <form onSubmit={createUser} onError={error} className={`container ${state.formState.name}`}>
            <h3 className=" text-center">{`¡Hola! ${createUserFlag ? "Completa" : "Modifica"} tus datos`}</h3>
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
                        aria-label="Ingrese su telefono."
                        minLength="7"
                        maxLength="10"
                        pattern="^[0-9].{7,10}$"
                        value={state.user.user_phone}
                        onChange={(event) => {
                            stateSetter("user", "user_phone", event.target.value)
                        }}
                        placeholder="0999999999"
                        aria-describedby="passwordHelp"
                        required
                    />

                </div>
            </div>
            {createUserFlag ?
                <div>
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
                                aria-label="Repita su contraseña."
                                placeholder="************"
                                minLength="6"
                                pattern="^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$"
                                value={state.extras.password}
                                onChange={(event) => {
                                    stateSetter("extras", "password", event.target.value)
                                    if (state.user.password !== state.extras.password)
                                        stateSetter("extras", "equalserr", true)
                                    else
                                        stateSetter("extras", "equalserr", false)
                                }}
                                aria-describedby="passwordHelp"
                                required
                            />

                        </div>
                        <small id="passwordHelp" class={`form-text  ${state.extras.equalserr ? "text-danger" : "text-muted"}`}>
                            {state.extras.equalserr ? "Las contraseñas ingresadas deben ser iguales" : "La contraseña debe contener al menos 8 digitos y valores alfanumericos."}
                        </small>
                    </div>
                </div> : null}
            <div class="container">
                <div class="row">
                    <div class="col-12 text-center">
                        <button class="btn btn-success" type="submit">{createUserFlag ? "Registrarse" : "Actualizar"}</button>
                    </div>
                    {createUserFlag ?
                        <div className="col-12 text-center mt-4">
                            <a class="text-decoration-none" href="/login">Iniciar sesión</a>
                        </div> : null}
                </div>
            </div>
        </form>
    )
}

export default UserForm;