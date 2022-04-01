import React from "react";
import Navbar from "../../general/navbar"
import { RQRS } from '../../../Classes/rqrp'
import ServicePresenter from "../../general/servicePresenter"
import Modal from '../../general/modal'
import UserForm from './userForm/UserForm'
import ProfileForm from './userForm/editProfile'
import DemandServicePresenter from "./extras/demandServicePresenter"

class Profile extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            gettingServices: false,
            serviceResponse: [],
            pageMaxCount: 0,
            maxServicesPage: 12,
            user: {},
            currentPage: 0,
            tabActive: 0
        }
    }

    componentDidMount() {
        if (!localStorage.getItem('user-info')) {
            window.location.href = "/login";
        } else {
            this.getUserData();
            this.getServices();
        }
    }

    getUserData = async () => {
        let aux = { ...this.state }
        aux.user = await JSON.parse(localStorage.getItem('user-info'));
        this.setState(aux);
        console.log(this.state)
    }

    componentStateSetter = (keyName, value) => {
        let stateCopy = { ...this.state };
        stateCopy[keyName] = value;
        this.setState(stateCopy);
    }

    getServices = async () => {
        this.componentStateSetter("gettingServices", true);
        const user = await JSON.parse(localStorage.getItem('user-info'));
        await new RQRS("service")
            .get(
                {
                    queryParams: {
                        order: "desc",
                        take: this.state.maxServicesPage,
                        skip: this.state.maxServicesPage * this.state.currentPage,
                        relations: "sc",
                        user_id:user.user_id
                    }
                }
            )
            .then(
                result => {
                    return result.json();
                }
            )
            .then(
                response_json => {
                    const data = response_json.result;
                    const count = response_json.count;
                    this.componentStateSetter("pageMaxCount", Math.ceil(count / 12));
                    this.componentStateSetter("serviceResponse", data);
                    console.log("State", this.state);
                }
            )
            .catch(
                error => {
                    alert(error.toString());
                }
            )
            .finally(() => {
                this.componentStateSetter("gettingServices", false);
            })
    }

    render() {
        return (
            <div>
                <Navbar />
                <div className="container mt-4">
                    <section role="Datos de usuario" className="card">
                        <div className="card-body">
                            <h1>{this.state.user?.user_name}</h1>
                            <div className="row">
                                <div className="col-10">
                                    <h4><b>Ciudad: </b>{this.state.user?.user_name}</h4>
                                    <h4><b>Telefono: </b>{this.state.user?.user_phone}</h4>
                                    <h4><b>Correo: </b>{this.state.user?.user_email}</h4>
                                </div>
                                <div className="col d-flex flex-column ">
                                    <Modal
                                        btnTitle="Editar Perfil"
                                        btnClass="btn btn-success"
                                    >
                                        {/* <ProfileForm/> */}
                                        <UserForm
                                            userData={this.state.user}
                                        />
                                    </Modal>
                                    <button type="button" class="btn btn-primary mt-2">Editar contraseña</button>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section role="Servicios publicados y solicitados" className="mt-4">
                        <ul class="nav nav-pills">
                            <li class="nav-item">
                                <button
                                    class={`nav-link btn btn-success ${this.state.tabActive === 0 ? "active" : ""}`}
                                    aria-current={this.state.tabActive === 0 ? "page" : "false"}
                                    aria-label={this.state.tabActive === 0 ? "Se encuentra en la pestaña de servicios publicados" : "Ir a servicios solicitados"}
                                    onClick={(event) => {
                                        this.componentStateSetter("tabActive", 0);
                                    }}
                                >
                                    Servicios publicados
                                </button>
                            </li>
                            <li class="nav-item">
                                <button
                                    class={`nav-link btn btn-success ${this.state.tabActive === 1 ? "active" : ""}`}
                                    aria-label={this.state.tabActive === 0 ? "Se encuentra en la pestaña de servicios solicitados" : "Ir a servicios publicados"}
                                    aria-current={this.state.tabActive === 1 ? "page" : "false"}
                                    onClick={(event) => {
                                        this.componentStateSetter("tabActive", 1);
                                    }}
                                >
                                    Servicios solicitados
                                </button>
                            </li>
                        </ul>
                        <div className="container">
                            {
                                this.state.tabActive === 0 ?
                                    <ServicePresenter
                                        services={this.state.serviceResponse}
                                        onCurrentPageChange={(value) => {
                                            this.componentStateSetter("currentPage", value);
                                        }}
                                        maxPages={this.state.pageMaxCount}
                                        currentPage={this.state.currentPage}
                                        charging={this.state.gettingServices}
                                    />
                                    : <DemandServicePresenter/>}
                        </div>
                    </section>
                </div>
            </div>
        );
    }
}

export default Profile;