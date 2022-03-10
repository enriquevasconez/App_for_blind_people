import React from "react";
import Navbar from '../../general/navbar'
import Footer from "../../general/footer"
import Breadcrumb from "../../general/breadcrumb"
import { RQRS } from "../../../Classes/rqrp";
import SearchBar from "../../general/searchBar";
import Filter from "./components/filter";
import ServicePresenter from "../../general/servicePresenter"


class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            serviceResponse: [],
            searchBarStr: "",
            pageMaxCount: 0,
            currentPage: 0,
            maxServicesPage: 12,
            gettingServices: false,
        };
    }

    componentDidMount() {
        this.getServices();
    }

    componentDidUpdate(prevProps, prevState, snapshot) {
        if (prevState.currentPage !== this.state.currentPage) {
            this.getServices();
        }
    }

    componentStateSetter = (keyName, value) => {
        let stateCopy = { ...this.state };
        stateCopy[keyName] = value;
        this.setState(stateCopy);
    }

    getServices = async () => {
        this.componentStateSetter("gettingServices", true);
        await new RQRS("service")
            .get(
                {
                    queryParams: {
                        service_description: this.state.searchBarStr,
                        service_price: this.state.searchBarStr,
                        service_name: this.state.searchBarStr,
                        order: "desc",
                        take: this.state.maxServicesPage,
                        skip: this.state.maxServicesPage * this.state.currentPage
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
            <div className="home">
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
                        this.getServices();
                    }}
                />
                <Filter
                    mobileVersion={true}
                />
                <main className="container mt-4">
                    <div className="row">
                        <div className="col-lg-4 ">
                            <Filter
                                mobileVersion={false}
                            />
                        </div>
                        <div className="col-lg-8">
                            <Breadcrumb routes={{ Inicio: "/" }} />
                            <h2>Servicios disponibles</h2>
                            <ServicePresenter
                                services={this.state.serviceResponse}
                                onCurrentPageChange={(value) => {
                                    this.componentStateSetter("currentPage", value);
                                }}
                                maxPages={this.state.pageMaxCount}
                                currentPage={this.state.currentPage}
                                charging={this.state.gettingServices}
                            />
                        </div>
                    </div>
                </main>
                <Footer />
            </div>
        );
    }

};
export default Home;