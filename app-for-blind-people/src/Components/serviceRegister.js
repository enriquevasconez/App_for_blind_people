import React, { useState, useEffect } from "react";


import './footer'
import Navbar from './navbar'
import './service.css'
import { Redirect } from 'react-router-dom';
import validate from "./validateService";
import ServiceForm from "./serviceForm";
import { useHistory } from 'react-router-dom'


const Service = () => {

    const { handleChange, values, cities, selectedCity, selectedCounty, countryList,
        handleSubmit, handleCountrySelect, handleCitySelect, errors } = ServiceForm(submit, validate);

    const [redirect, setRedirect] = useState(false)
    const [passError, setPassError] = useState("")
    let user = JSON.parse(localStorage.getItem('user-info'))

    async function submit() {

        const response = await fetch('https://blind-people-app-backend.herokuapp.com/service', {
            method: 'POST',
            headers: { 'Content-type': 'application/json', "x-api-key": "420f77de-2cea-4e13-841a-b43ca729a7a9" },
            body: JSON.stringify({
                service_name: values.service_name,
                service_description: values.service_description,
                service_price: values.service_price,
                user: user.user_id

            })
        })
            .then((resp) => {
                if (resp.status >= 300) {

                    console.log(resp)
                    setPassError("Este correo ya está siendo utilizado");

                    alert("no funciona")

                } else {
                    setRedirect(true);
                    console.log(values.type);
                    console.log(selectedCounty)
                    console.log(selectedCity)
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


    return (

        <div>
            <Navbar />
            <div className="container" >
                <hr></hr>
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        <div className="col-xs-4 item-photo">
                            <img style={{ maxWidth: '100%' }} src="https://ak1.ostkcdn.com/images/products/8818677/Samsung-Galaxy-S4-I337-16GB-AT-T-Unlocked-GSM-Android-Cell-Phone-85e3430e-6981-4252-a984-245862302c78_600.jpg" />
                        </div>
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
                                <option value="One">One</option>
                                <option value='Two'>Two</option>
                                <option value='Three'>Three</option>
                            </select>
                            {errors.type && <p>  {errors.type}</p>}

                        </div>
                        <div className='col-md-4 mb-4'>
                            <label className="form-label" htmlFor="phone"> Teléfono</label>
                            <input type="text" id="phone"

                                placeholder=" Por convenir"
                                className="form-control form-control-lg" readOnly
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
                        <ul className="menu-items">
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