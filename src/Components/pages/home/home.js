import React, { useEffect, useState, useContext } from "react";
import Navbar from '../../general/navbar'
import ReactPaginate from 'react-paginate';
import { Link, useNavigate } from "react-router-dom";
import { GlobalContext } from "../../../globals/globalContext"
import Footer from "../../general/footer"
import Breadcrumb from "../../general/breadcrumb"
// import Categories from "./homeComponents/categories"
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
            maxServicesPage: 12
        };
    }
    // const { serviceValuesasa } = useContext(GlobalContext);

    // const [servicios, setServicios] = useState([]);
    // const [busqueda, setBusqueda] = useState("");
    // const [redirect, setRedirect] = useState(false);
    // const [pageCount, setpageCount] = useState(0);
    // const [filtro, setFiltro] = useState(busqueda);
    // const [categorySelected, setCategorySelected] = useState(null)

    // const[componentState, setComponentState] = useState(

    // );

    // useEffect(() => {
    //     const getComments = async (props) => {
    //         const res = await new RQRS("service")
    //             .get(
    //                 {
    //                     queryParams: {
    //                         service_description: filtro,
    //                         service_price: filtro,
    //                         service_name: filtro,
    //                         order: "desc",
    //                         take: 12,
    //                         skip: 0
    //                     }
    //                 }
    //             )
    //         const response = await res.json();
    //         const data = response.result;
    //         const count = response.count;
    //         console.log(data, count);
    //         setpageCount(Math.ceil(count / 12));

    //         setServicios(data);


    //     };
    //     getComments();
    // }, [filtro])

    componentStateSetter = (keyName, value) => {
        let stateCopy = { ...this.state };
        stateCopy[keyName] = value;
        this.setState(stateCopy);
    }

    getServices = async () => {
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
    }

    componentDidMount() {
        this.getServices();
    }

    // const fetchComments = async (currentPage) => {
    //     const res = await fetch(
    //         `https://blind-people-app-backend.herokuapp.com/service?service_description=${filtro}&service_price=${filtro}&service_name=${filtro}&order=desc&take=12&skip=${currentPage}`, {
    //         headers: {
    //             'Content-type': 'application/json',
    //             "x-api-key": "420f77de-2cea-4e13-841a-b43ca729a7a9"
    //         }
    //     }
    //     );
    //     const data = await res.json();

    //     return data.result;
    // }



    // const handlePageClick = async (data) => {

    //     let currentPage = data.selected * 12

    //     console.log("Current page is" + currentPage)

    //     const commentsFormServer = await fetchComments(currentPage);
    //     window.scrollTo(0, 0)
    //     setServicios(commentsFormServer)

    // };

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
                        this.getServices();
                    }}
                />
                <main className="container mt-4">
                    <div className="row">
                        <div className="col-4">
                            <Filter />
                        </div>
                        <div className="col">
                            <Breadcrumb routes={{ Inicio: "/" }} />
                            <h2>Servicios disponibles</h2>
                            <ServicePresenter
                                services={this.state.serviceResponse}
                                onCurrentPageChange={(value)=>{
                                    this.componentStateSetter("currentPage", value);
                                }}
                                maxPages={this.state.pageMaxCount}
                                currentPage={this.state.currentPage}
                                pageUpdater={()=>{this.getServices()}}
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