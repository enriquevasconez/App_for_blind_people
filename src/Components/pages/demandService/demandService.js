import React from "react";
import Navbar from "../../general/navbar"
import { RQRS } from '../../../Classes/rqrp'
import ServicePresenter from "../../general/servicePresenter"
import Modal from '../../general/modal'
import SearchBar from "../../general/searchBar";
import CreateDemandService from "./createDemandService"
import Card from './card'
import Breadcrumb from '../../general/breadcrumb';

class DemandService extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            searchBarStr: "",
            demandServiceResponse: [],
            customerServiceResponse: [],
            pageMaxCount: 0,
            currentPage: 0,
            maxServicesPage: 12,
            gettingServices: false,
        }
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.currentPage !== this.state.currentPage) {
            this.getDemandServices();
        }
    }

    componentDidMount() {
        if (!localStorage.getItem('user-info')) {
            window.location.href = "/login";
        } else {
            this.getDemandServices();
            this.getCustomerServices();
        }
    }

    componentStateSetter = (keyName, value) => {
        let stateCopy = { ...this.state };
        stateCopy[keyName] = value;
        this.setState(stateCopy);
    }

    getDemandServices = async () => {
        this.componentStateSetter("gettingServices", true);
        await new RQRS("demand-service")
            .get(
                {
                    queryParams: {
                        order: "desc",
                        take: this.state.maxServicesPage,
                        skip: this.state.maxServicesPage * this.state.currentPage,
                        relations: "user,service",
                        demand_title: this.state.searchBarStr
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
                    this.componentStateSetter("demandServiceResponse", data);
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

    getCustomerServices = async () => {
        const user=await JSON.parse(localStorage.getItem('user-info'));
        await new RQRS("service")
            .get(
                {
                    queryParams: {
                        order: "desc",
                        user_id: user.user_id
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
                    this.componentStateSetter("customerServiceResponse", data);
                    console.log("State", this.state);
                }
            )
            .catch(
                error => {
                    alert(error.toString());
                }
            )
    }

    render() {
        return (
            <div>
                <Navbar />
                <SearchBar
                    value={this.state.searchBarStr}
                    handleOnChange={(event) => {
                        event.preventDefault();
                        this.componentStateSetter("searchBarStr", event.target.value);
                    }}
                    handleSubmit={(event) => {
                        event.preventDefault();
                        this.componentStateSetter("currentPage", 0);
                        this.getDemandServices();
                    }}
                    message="Ingrese el nombre del servicio demandado"
                />
                <div className="container mt-3">
                <Breadcrumb
                    routes={{ Inicio: "/",
                            "Solicitar Servicio":"/Forum"
                 }}
                />
                    <CreateDemandService update={this.getDemandServices}/>
                    <main className="mt-3">
                        <h2>Servicios solicitados recientemente</h2>
                        <div className="m-3 ">
                            <ServicePresenter
                                services={this.state.demandServiceResponse}
                                onCurrentPageChange={(value) => {
                                    this.componentStateSetter("currentPage", value);
                                }}
                                maxPages={this.state.pageMaxCount}
                                currentPage={this.state.currentPage}
                                cardFunction={(demandService, key) => {
                                    return (
                                        <Card dKey={key} dService={demandService} customerLoggedService={this.state.customerServiceResponse} update={this.getDemandServices} />
                                    )
                                }}
                                charging={this.state.gettingServices}
                            />
                        </div>
                    </main>
                </div>
            </div>
        );
    }
}

export default DemandService;