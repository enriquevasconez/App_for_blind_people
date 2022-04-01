import React, { useState, useEffect, useRef } from "react";


import './general/footer'
import Navbar from './general/navbar'
import './service.css'
import { Navigate } from 'react-router-dom';
import validate from "./validateService";
import ServiceForm from "./serviceForm";

import { useNavigate, Link } from 'react-router-dom'
import { FirebaseCnn } from "../Classes/firebase.base"
import PageWHalfImage from './pages/pageWHalfImage'
const Service = () => {

    const { handleChange, handeDelteChange, values, cities, selectedCity, selectedCounty, countryList,
        handleSubmit, handleCountrySelect, handleCitySelect, imgPreview, handeInputChange, errors } = ServiceForm(submit, validate);

    const [redirect, setRedirect] = useState(false)
    const [passError, setPassError] = useState("")
    const [categorias, setCategorias] = useState([]);
    const [get_redirect, setGet_Redirect] = useState(false);
    const firebase = new FirebaseCnn();

    const ref = useRef()


    let user = JSON.parse(localStorage.getItem('user-info'))
    //'application/json', 'Content-type':'application/json'  }), 

    useEffect(async () => {

        const res = await fetch(
            `https://blind-people-app-backend.herokuapp.com/service-category`,
            {
                headers: {
                    'Content-type': 'application/json',
                    "x-api-key": "420f77de-2cea-4e13-841a-b43ca729a7a9"
                }

            }

        ).then((resp) => {
            if (resp.status >= 300) {

                console.log(resp)
                //  setPassError("Error inesperado compruebe su conexión a internet");

            } else {

                setGet_Redirect(true);
                return resp.json();

            }
        }).then(data => {


            console.log("OJO", data);
            setCategorias(data.result);


        }).catch((error) => {
            console.log(error);
        });
        console.log("res", res)
    }, [])









    async function submit() {
        const formData = new FormData();

        // formData.append('service_image', 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1994.9056586446607!2d-78.47027376508179!3d-0.10735069635238306!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d58ff788cdc717%3A0x21a2388f2fae63c1!2sGADERE!5e0!3m2!1ses!2sec!4v1624144214641!5m2!1ses!2sec');
        // formData.append('user',user.user_id);

        await firebase.uploadImage(imgPreview.file)
            .then(
                url => {

                    const response = fetch('https://blind-people-app-backend.herokuapp.com/service', {
                        method: 'POST',
                        headers: { 'Content-type': 'application/json', "x-api-key": "420f77de-2cea-4e13-841a-b43ca729a7a9" },
                        body:
                            JSON.stringify({
                                service_name: values.service_name,
                                service_description: values.service_description,
                                service_price: values.service_price,
                                service_image: url,
                                user: user.user_id,
                                city: selectedCity,
                                sc: values.sc,
                            })
                    })
                        .then((resp) => {
                            if (resp.status >= 300) {

                                console.log(resp)
                                setPassError("Error inesperado compruebe su conexión a internet");

                            } else {
                                setRedirect(true);
                                console.log(values.type);
                                console.log(selectedCounty)
                                console.log(selectedCity)
                                console.log(imgPreview.file)
                            }
                        }).catch((error) => {
                            console.log("ERROR", error)
                        });
                }
            )
            .catch(
                err => {
                    alert(err);
                }
            )

    }



    const history = useNavigate();
    useEffect(() => {
        if (!localStorage.getItem('user-info')) {
            history("/")
        }
    }, [])



    if (redirect) {
        return <Navigate to="/login" />

    }



    function borrar() {
        ref.current.value = "";

    }



    return (

        <div>
            <PageWHalfImage>
                <main className="col-10 col-md-8 col-lg-4 col-xl-4 ">
                    <div class="card" role="Inicio de sesion" >
                        <div className="card-body ">
                            <h2>Completa los datos de tu servicio</h2>
                            <form onSubmit={handleSubmit}>
                                {passError && <p> {passError} </p>}
                                <div className="row position-relative">
                                    <div className="div-container">
                                        {imgPreview.filepreview !== null ?
                                            <img className="previewimg ServiceItem-img img-bg" src={imgPreview.filepreview} alt="uploadimage" /> : null
                                        }
                                        <div className="  col-md-12 col-xs-4 item-photo mb-5 p-5 ">
                                            {/* <img style={{ maxWidth: '100%' }} src="https://ak1.ostkcdn.com/images/products/8818677/Samsung-Galaxy-S4-I337-16GB-AT-T-Unlocked-GSM-Android-Cell-Phone-85e3430e-6981-4252-a984-245862302c78_600.jpg" /> */}
                                            <input ref={ref} class="form-control" type="file" id="formFile"

                                                onChange={handeInputChange}
                                            />

                                        </div>



                                        {/* <div className="row">
                                        <div className="  col-md-2  mb-5">

                                            <button onClick={() => { handeDelteChange(); borrar() }} className=" container btn btn-primary btn-lg" type="button" value="Borrar" >Borrar</button>
                                        </div>
                                    </div> */}
                                    </div>
                                </div>
                                <div className="row">
                                    <div className="col-md-4  mb-4" style={{ border: '0px solid gray' }}>
                                        {/* <!-- Datos del vendedor y titulo del producto --> */}

                                        <label className="form-label" htmlFor="serviceName"> Nombre del servicio</label>
                                        <input type="text" id="serviceName"
                                            name="service_name"
                                            placeholder=" Ingrese Nombre"
                                            className="form-control form-control-lg"
                                            value={values.service_name}
                                            onChange={handleChange}
                                        />
                                        {errors.service_name && <p>  {errors.service_name}</p>}

                                    </div>

                                    {/* <!-- Precios --> */}
                                    <div className='col-md-4  mb-4'>
                                        <label className="form-label" htmlFor="type"> Tipo de servicio</label>
                                        <select className="form-select form-select-lg mb-3"
                                            aria-label="ciudad"
                                            name="sc"
                                            value={values.sc}
                                            onChange={handleChange}
                                        >
                                            <option selected hidden >Seleccione Categoría</option>
                                            {categorias.map((category, key) => (
                                                <option key={category.sc_id} value={category.sc_id}>
                                                    {category.sc_name}
                                                </option>

                                            ))}
                                        </select>
                                        {errors.type && <p>  {errors.type}</p>}


                                    </div>
                                    <div title="El teléfono fue definido en su perfil de usuario" className='col-md-4 mb-4'>
                                        <label className="form-label" htmlFor="phone"> Teléfono</label>
                                        <input type="text" id="phone"
                                            className="form-control form-control-lg" readOnly
                                            value={user.user_phone}
                                        />
                                    </div>
                                </div>
                                <div className="row">
                                    {/* <!-- Detalles especificos del producto --> */}

                                    <div className='col-md-4 mb-4'>
                                        <label className="title-attr" htmlFor="price" style={{ marginTop: '15px' }} ><small>Precio</small></label>

                                        <input type="text" id="price"
                                            name="service_price"
                                            className="form-control form-control-lg"
                                            value={values.service_price}
                                            onChange={handleChange}
                                        />
                                        {errors.service_price && <p> {errors.service_price}</p>}
                                    </div>

                                    <div className='col-md-4  mb-4'>
                                        <label className="title-attr" htmlFor="provincia" style={{ marginTop: '15px' }} ><small>Provincia</small></label>
                                        <select className="form-select form-select-lg mb-3"
                                            aria-label=".form-select-lg example"
                                            name="Countries"
                                            value={selectedCounty}
                                            onChange={handleCountrySelect}

                                        >
                                            {/* <option selected >Open this select menu</option> */}
                                            <option value="titulo" selected hidden> Seleccione provincia </option>
                                            {countryList.map((country, key) => (
                                                <option key={key} value={country.name}>
                                                    {country.name}
                                                </option>
                                            ))}
                                        </select>
                                        {errors.selectedCounty && <p> {errors.selectedCounty}</p>}

                                    </div>
                                    <div className='col-md-4 mb-4'>
                                        <label className="title-attr" htmlFor="ciudad" style={{ marginTop: '15px' }} ><small>Ciudad</small></label>

                                        <select className="form-select form-select-lg mb-3"
                                            aria-label="ciudad"
                                            name="Cities"
                                            value={selectedCity}
                                            onChange={handleCitySelect}

                                        >

                                            {/* <option selected >Open this select menu</option> */}
                                            <option value="titulo" selected hidden> Seleccione ciudad </option>
                                            {console.log("CIT", cities)}
                                            {
                                                cities.map((city, key) => (
                                                    <option key={key} value={city.id}>
                                                        {city.name}
                                                    </option>
                                                ))
                                            }
                                        </select>
                                        {errors.selectedCity && <p>  {errors.selectedCity}</p>}

                                        {/* <input type="text" id="ciudad"

                                placeholder=" Por convenir"
                                className="form-control form-control-lg" readOnly
                            /> */}
                                    </div>

                                </div>


                                <div className="col-xs-9">
                                    <label className="title-attr" htmlFor="detalle" style={{ marginTop: '15px' }} ><small>Detalle del producto</small></label>

                                    <div style={{ width: '100%' }}>

                                        <textarea
                                            id="detalle"
                                            class="form-control"
                                            name="service_description"
                                            value={values.service_description}
                                            onChange={handleChange}
                                        />
                                        {errors.service_description && <p>  {errors.service_description}</p>}



                                    </div>

                                </div>

                                <div className="row">
                                    <div className="col-md-12 mb-4 pb-2">

                                        <div className="form-outline">

                                            <input id="Submit" className=" container btn btn-primary btn-lg" type="submit"
                                                value="Registar servicio" />

                                        </div>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </main>
            </PageWHalfImage>
        </div>



    );
}

export default Service