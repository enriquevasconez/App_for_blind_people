// import './custom.css'
import OwlCarousel from 'react-owl-carousel';
//import 'owl.carousel/dist/assets/owl.carousel.css';
//import 'owl.carousel/dist/assets/owl.theme.default.css';
import { Swiper, SwiperSlide } from 'swiper/react/swiper-react';
import { Navigation, Pagination } from 'swiper';

import 'swiper/swiper.scss';

import 'swiper/swiper.scss'; // core Swiper
import 'swiper/modules/navigation/navigation.scss'; // Navigation module
import 'swiper/modules/pagination/pagination.scss'; // Pagination module

import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";

const Categories = ({categorySelectedF }) => {
    const [category, setCategory] = useState([]);
    const [categoryCount, setCategoryCount] = useState(0);


    useEffect(() => {
        const getComments = async () => {
            const res = await fetch(
                `https://blind-people-app-backend.herokuapp.com/service-category?relations=service`,
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




    /*
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
    */


    return (
        <div>
            <Swiper
                slidesPerView={3}
                spaceBetween={1}
                pagination={{
                    clickable: true,
                }}

                modules={[Pagination, Navigation]}
                className="mySwiper"
                navigation={true}
            >
                {category.map((category, key) => (

                    <SwiperSlide  >


                        <div className='container-' key={category.sc_id}  >

                            <div class="row">
                                <div class="col">                      
                                        <div class="card h-100 carruselFiltro"    onClick={ 
                                            (event)=>{  
                                                categorySelectedF(category.sc_name)
                                            } }>
                                            <div class="card-body">
                                                <h5 class="card-title">{category.sc_name}</h5>
                                                <p class="card-text">{category.sc_description}</p>
                                            </div>
                                        </div>
                                </div>
                            </div>
                        </div>

                    </SwiperSlide >
                ))}

            </Swiper >
        </div >
    );
}

export default Categories;