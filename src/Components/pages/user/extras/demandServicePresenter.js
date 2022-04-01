import React, { useState, useEffect } from "react";
import { RQRS } from '../../../../Classes/rqrp'
import ServicePresenter from "../../../general/servicePresenter"
import Card from './card'

const DemandServicePresenter = (props) => {

    const [state, setState] = useState({
        searchBarStr: "",
        demandServiceResponse: [],
        customerServiceResponse: [],
        pageMaxCount: 0,
        currentPage: 0,
        maxServicesPage: 12,
        gettingServices: false,
    }
    )

    useEffect(async () => {
        getDemandServices();
    }, [])

    // useEffect(async ()=>{
    //     getDemandServices();
    // }, [])
    // componentDidUpdate(prevProps, prevState, snapshot) {
    //     if (prevState.currentPage !== state.currentPage) {
    //         getDemandServices();
    //     }
    // }

    const componentStateSetter = (keyName, value) => {
        let stateCopy = { ...state };
        stateCopy[keyName] = value;
        setState(stateCopy);
    }

    const getDemandServices = async () => {
        componentStateSetter("gettingServices", true);
        const user = await JSON.parse(localStorage.getItem('user-info'));
        await new RQRS("demand-service")
            .get(
                {
                    queryParams: {
                        take: state.maxServicesPage,
                        skip: state.maxServicesPage * state.currentPage,
                        relations: "user,service",
                        // user_id: user.user_id
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
                    componentStateSetter("pageMaxCount", Math.ceil(count / 12));
                    componentStateSetter("demandServiceResponse", data);
                    console.log("State", state);
                }
            )
            .catch(
                error => {
                    alert(error.toString());
                }
            )
            .finally(() => {
                componentStateSetter("gettingServices", false);
            })
    }


    return (
        <div className="container mt-3">
            <div className="m-3 ">
                <ServicePresenter
                    services={state.demandServiceResponse}
                    onCurrentPageChange={(value) => {
                        componentStateSetter("currentPage", value);
                    }}
                    maxPages={state.pageMaxCount}
                    currentPage={state.currentPage}
                    cardFunction={(demandService, key) => {
                        return (
                            <Card dKey={key} dService={demandService}  update={getDemandServices} />
                        )
                    }}
                    charging={state.gettingServices}
                />
            </div>
        </div>
    );
}

export default DemandServicePresenter;