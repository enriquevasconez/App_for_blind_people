import React from "react";
import PageWHalfImage from "../pageWHalfImage"

class RecoverPassword extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      correo: "",
      code: "",
      newPass: "",
      step: 0
    }
  }

  componentDidMount() {
    if (localStorage.getItem('user-info')) {
      window.location.href = "/";
    }
  }

  stateSetter(key, value) {
    let aux = { ...this.state };
    aux[key] = value;
    this.setState(aux);
  }

  getNameStep(stepNumber) {
    const names = ["Enviar verificación", "Validar codigo", "Reiniciar contraseña"]
    return names[stepNumber];
  }

  recoverPassword = async (event) => {
    event.preventDefault();
    let stepFunctions = {
      "Enviar verificación": () => {
        this.stateSetter("step", 1)
      },
      "Validar codigo": () => {
        this.stateSetter("step", 2)
      },
      "Reiniciar contraseña": () => {
        this.stateSetter("step", 0)
        window.location.href = "/login";

      }
    }
    console.log("forgot", this);
    const step = this.getNameStep(this.state.step);
    stepFunctions[step]();

  }

  render() {
    return (
      <PageWHalfImage>
        <main className="col-10 col-md-8 col-lg-4 col-xl-4">
          <div class="card" role="Inicio de sesion" >
            <div className="card-body ">
              <form onSubmit={this.recoverPassword} className="container needs-validation">
                <h3 className=" text-center">Ingresa tu correo electronico.</h3>
                <div className="mb-3">
                  <label for="emailInput" class="form-label">Correo</label>
                  <input
                    type="email"
                    class="form-control"
                    id="emailInput"
                    placeholder="correo@correo.com"
                    aria-label="Ingrese su correo."
                    value={this.state.correo}
                    onChange={(event) => {
                      this.stateSetter("correo", event.target.value)
                    }}
                    required
                    disabled={this.state.step !== 0}
                    aria-describedby="correoHelp"
                  />
                  <small id="correoHelp" class="form-text text-muted">
                    Ingrese su correo electronico.
                  </small>
                </div>
                {this.state.step > 0 ?
                  <div className="mb-3">
                    <label for="codeInput" class="form-label">Codigo de verificacion</label>
                    <input
                      type="text"
                      class="form-control"
                      id="codeInput"
                      minLength="4"
                      maxLength="4"
                      placeholder="1234"
                      aria-label="Ingrese el codigo de verificacion enviado a su correo."
                      value={this.state.code}
                      onChange={(event) => {
                        this.stateSetter("code", event.target.value)
                      }}
                      required
                      disabled={this.state.step !== 1}
                      aria-describedby="codeHelp"
                    />
                    <small id="codeHelp" class="form-text text-muted">
                      Ingrese el codigo de verificación que enviamos a su correo electrónico.
                    </small>
                  </div>
                  : null
                }
                {this.state.step > 1 ?
                  <div className="mb-3">
                    <label for="emailInput" class="form-label">Contraseña</label>
                    <input
                      type="password"
                      class="form-control"
                      id="passwordInput"
                      aria-label="Ingrese su nueva contraseña."
                      placeholder="************"
                      minLength="8"
                      pattern="^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$"
                      value={this.state.password}
                      onChange={(event) => {
                        this.stateSetter("password", event.target.value)
                      }}
                      aria-describedby="passwordHelp"
                      required
                    />
                    <small id="passwordHelp" class="form-text text-muted">
                      Ingrese su nueva contraseña. La contraseña debe contener al menos 8 digitos y valores alfanumericos.
                    </small>
                  </div>
                  : null
                }
                <div class="container">
                  <div class="row">
                    <div class="col-12 text-center">
                      <button class="btn btn-success" type="submit">{this.getNameStep(this.state.step)}</button>
                    </div>
                    <div className="col-12 text-center mt-4">
                      <a class="text-decoration-none" href="/login">Crear cuenta</a>
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

export default RecoverPassword;