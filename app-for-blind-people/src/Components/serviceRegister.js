import React, { useState, useEffect, useRef } from "react";


import './footer'
import Navbar from './navbar'
import './service.css'
import { Redirect } from 'react-router-dom';
import validate from "./validateService";
import ServiceForm from "./serviceForm";
import { useHistory } from 'react-router-dom'


const Service = () => {

    const { handleChange, handeDelteChange, values, cities, selectedCity, selectedCounty, countryList,
        handleSubmit, handleCountrySelect, handleCitySelect, imgPreview, handeInputChange, errors } = ServiceForm(submit, validate);

    const [redirect, setRedirect] = useState(false)
    const [passError, setPassError] = useState("")
    

    const ref = useRef()


    let user = JSON.parse(localStorage.getItem('user-info'))
    //'application/json', 'Content-type':'application/json'  }), 

    async function submit() {
        const formData = new FormData();

        // formData.append('service_name', values.service_name);
        // formData.append('service_description', values.service_description);
        // formData.append('service_price', values.service_price);
        // formData.append('service_image', 'https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1994.9056586446607!2d-78.47027376508179!3d-0.10735069635238306!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x91d58ff788cdc717%3A0x21a2388f2fae63c1!2sGADERE!5e0!3m2!1ses!2sec!4v1624144214641!5m2!1ses!2sec');
        // formData.append('user',user.user_id);
        const response = await fetch('https://blind-people-app-backend.herokuapp.com/service', {
            method: 'POST',
            headers: { 'Content-type': 'application/json', "x-api-key": "420f77de-2cea-4e13-841a-b43ca729a7a9" },
            body:
                JSON.stringify({
                    service_name: values.service_name,
                    service_description: values.service_description,
                    service_price: values.service_price,
                    //  service_image:'https://i.blogs.es/09b647/googlefotos/1366_2000.jpg',
                    user: user.user_id
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
                console.log(error)
            });
    }



    const history = useHistory();
    useEffect(() => {
        if (!localStorage.getItem('user-info')) {
            history.push("/")
        }
    }, [])



    if (redirect) {
        return <Redirect to="/login" />

    }

    const reset = () => {
        ref.current.value = "";


    };

    function borrar() {
        ref.current.value = "";

    }



    return (

        <div>
            <Navbar />
            <div className="container" >
                <hr></hr>
                <form onSubmit={handleSubmit}>
                    {passError && <p> {passError} </p>}
                    <div className="row">
                        <div className="  col-md-12 col-xs-4 item-photo mb-5">
                            {/* <img style={{ maxWidth: '100%' }} src="https://ak1.ostkcdn.com/images/products/8818677/Samsung-Galaxy-S4-I337-16GB-AT-T-Unlocked-GSM-Android-Cell-Phone-85e3430e-6981-4252-a984-245862302c78_600.jpg" /> */}
                            <input ref={ref} class="form-control" type="file" id="formFile"

                                onChange={handeInputChange}
                            />

                        </div>

                        {imgPreview.filepreview !== null ?
                            <img className="previewimg ServiceItem-img " src={imgPreview.filepreview} alt="uploadimage" /> : null
                        }

                        <div className="row">
                            <div className="  col-md-2  mb-5">

                                <button  onClick={() => { handeDelteChange(); borrar() }} className=" container btn btn-primary btn-lg" type="button" value="Borrar" >Borrar</button>
                            </div>
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
                                aria-label=".form-select-lg example"
                                name="type"
                                value={values.type}
                                onChange={handleChange}
                            >

                                {/* <option selected >Open this select menu</option> */}
                                <option value="titulo" selected hidden> Seleccione opcion </option>
                                <option value="Reparaciones - Técnicos">Reparaciones - Técnicos</option>
                                <option value='Clases-Cursos'>Clases-Cursos</option>
                                <option value='Mudanzas-Transporte'>Mudanzas-Transporte</option>
                            </select>
                            {errors.type && <p>  {errors.type}</p>}

                        </div>
                        <div className='col-md-4 mb-4'>
                            <label className="form-label" htmlFor="phone"> Teléfono</label>
                            <input type="text" id="phone"

                                
                                className="form-control form-control-lg" readOnly
                                value={user.user_phone}
                            />
                        </div>
                    </div>
                    <div className="row">
                        {/* <!-- Detalles especificos del producto --> */}

                        <div className='col-md-6 mb-4'>
                            <label className="title-attr" htmlFor="price" style={{ marginTop: '15px' }} ><small>Precio</small></label>

                            <input type="text" id="price"
                                name="service_price"

                                className="form-control form-control-lg" readOnly
                                value={values.service_price}
                                onChange={handleChange}

                            />
                        </div>

                        <div className='col-md-6  mb-4'>
                            <label className="title-attr" htmlFor="privincia" style={{ marginTop: '15px' }} ><small>Provincia</small></label>

                            <select className="form-select form-select-lg mb-3"
                                aria-label=".form-select-lg example"
                                name="Countries"
                                value={selectedCounty}
                                onChange={handleCountrySelect}

                            >
                                {/* <option selected >Open this select menu</option> */}
                                <option value="titulo" selected hidden> Seleccione opcion </option>
                                {countryList.map((country, key) => (
                                    <option key={key} value={country.name}>
                                        {country.name}
                                    </option>
                                ))}
                            </select>
                            {errors.selectedCounty && <p> {errors.selectedCounty}</p>}

                        </div>

                    </div>
                    <div className="row">
                        {/* <!-- Detalles especificos del producto --> */}

                        <div className='col-md-6 mb-4'>
                            <label className="title-attr" htmlFor="ciudad" style={{ marginTop: '15px' }} ><small>Ciudad</small></label>

                            <select className="form-select form-select-lg mb-3"
                                aria-label=".form-select-lg example"
                                name="Cities"
                                value={selectedCity}
                                onChange={handleCitySelect}

                            >
                                {/* <option selected >Open this select menu</option> */}
                                <option value="titulo" selected hidden> Seleccione opcion </option>
                                {cities.map((city, key) => (
                                    <option key={key} value={city}>
                                        {city}
                                    </option>
                                ))}
                            </select>
                            {errors.selectedCity && <p>  {errors.selectedCity}</p>}

                            {/* <input type="text" id="ciudad"

                                placeholder=" Por convenir"
                                className="form-control form-control-lg" readOnly
                            /> */}
                        </div>

                        <div className='col-md-6  mb-4'>
                            <label className="title-attr" htmlFor="direccion" style={{ marginTop: '15px' }} ><small>Dirección</small></label>

                            <input type="text" id="direccion"

                                placeholder=" Seleccione provincia"
                                className="form-control form-control-lg" readOnly
                            />
                        </div>

                    </div>

                    <div className="col-xs-9">
                        <ul className="menu-items list-inline">
                            <li className="active">Detalle del producto</li>

                        </ul>
                        <div style={{ width: '100%', borderTop: '1px solid silver' }}>
                            <p style={{ padding: '15px' }}>
                                <textarea class="form-control"
                                    name="service_description"
                                    value={values.service_description}
                                    onChange={handleChange}
                                />
                            </p>
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



    );
}

export default Service