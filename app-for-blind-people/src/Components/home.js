import React, { useEffect, useState } from "react";
import Navbar from './navbar'

const Home = () => {

    const [data, setData] = useState([]);
    useEffect(async () => {

        let result = await fetch(
            "https://blind-people-app-backend.herokuapp.com/user",
            {
                headers: {
                    'Content-type': 'application/json',
                    "x-api-key": "420f77de-2cea-4e13-841a-b43ca729a7a9"
                }
            }

        );

        result = await result.json();
        setData(result)
        console.log(setData)
    }, [])


    return (


        <div className="home">

            <Navbar />
            <div id="main-content" className="container">


                <div id="box" className="p-.5 mb-4 rounded-3">
                    <div id="jumbotron" className="container-fluid bg-light py-4">

                    </div>
                </div>
                <div id="home-titles" className="row p-.5 mb-4">

                    <div className="col-md-4 col-sm-6 col-xs-12  ">

                        <a href="menu-categories.html">

                            <div id="menu-tile">

                                <img src="https://usmile581.github.io/Bistro_Restaurant/images/menu-tile.jpg" alt="Restaurant"
                                    className="img " />
                                {
                                      data.map((user) =>
                                     <>
                                    
                                        <span> {user.user_id} </span>
                                       
                                     </>
                                 
                                    ) 
                                }
                            </div>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default Home;