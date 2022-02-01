// import './custom.css'
import OwlCarousel from 'react-owl-carousel';
import 'owl.carousel/dist/assets/owl.carousel.css';
import 'owl.carousel/dist/assets/owl.theme.default.css';
import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

const Categories = ({ }) => {
    const [category, setCategory] = useState([]);
    const [categoryCount, setCategoryCount] = useState(0);
    const [buscar, setBuscar] = useState("");

    useEffect(() => {
        const getComments = async () => {
            const res = await fetch(
                `https://blind-people-app-backend.herokuapp.com/service-category`,
                {
                    headers: {
                        'Content-type': 'application/json',
                        "x-api-key": "420f77de-2cea-4e13-841a-b43ca729a7a9"
                    }

                }

            );
            const response = await res.json();
            const data = response.result;
            const count = response.count;
            console.log(data, count);
            setCategoryCount(count);

            setCategory(data);


        };
        getComments();


    }, [])

    let content = null

    if (category) {


        content = category.map((category, key) =>


            <div key={category.sc_id} className="col-md-4 mb-3">
                <Link style={{ "color": "black" }} to={"/serviceDetail/" + category.sc_id} className="nav-link"  >
                    <div className="card">

                        <div className="card-body">
                            <h5 className="card-title">{category.sc_name}</h5>
                            <p className="card-text">
                                {category.sc_id} <br />
                                {category.sc_description}
                            </p>
                        </div>

                    </div>
                </Link>
            </div>


        )
    } else {
        content = "Error inesperado"
    }


    const handleOnChange = (e) => {
        
       
        console.log(buscar);

    };


    return (
        <div>
     
            <div class='container-fluid' >
                <OwlCarousel items={3}
                    className="owl-theme "

                    nav
                    margin={8} >

                    {category.map((category, key) => (
                 
                       
                       <div key={category.sc_id} >
                            <Link style={{ "color": "black" }} to={"/serviceDetail/"+ category.sc_name} className="nav-link"  >
                            <div className="col-md">
                                <div className="card h-100 " >
                                    <div className="card-body ">
                                        <h5 className="card-title">{category.sc_name}</h5>
                                        <p className="card-text">
                                            {category.sc_description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                            </Link>
                        </div>
  
                    ))}
                </OwlCarousel>
            </div>

        </div>
    );
}

export default Categories;