import { useState, useEffect } from "react";

const ServiceForm = (callback, validate) => {

    const [values, setValues] = useState({

        service_name: '',
        service_description: '',
        service_price: 'Por defecto',
        type:''
       
    })

    const [cities, setCities] = useState([]);
    const [selectedCounty, setSelectedCountry] = useState("");
    const [selectedCity, setSelectedCity] = useState("");

    const countries = {
        France: ["Paris", "Marseille", "Lille", "Lyon"],
        Usa: ["New York", "San Francisco", "Austin", "Dallas"],
        Brazil: ["São Paulo", "Rio de Janeiro", "Salvador"]
    };

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false)

    const countryList = Object.keys(countries).map(key => ({
        name: key
    }));

    const handleCountrySelect = e => {
        console.log("Selected country", e.target.value);
        const countrySel = e.target.value;
        const citiesSel = countrySel !== "" ? countries[countrySel] : [];
        setSelectedCountry(countrySel);
        setCities(citiesSel);
        setSelectedCity("");
    }

    const handleCitySelect = e => {
        console.log("Selected city", e.target.value);
    const citiesSel = e.target.value;
    setSelectedCity(citiesSel);
    }

    const handleChange = e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleSubmit = e => {
        e.preventDefault();

        setErrors(validate(values,selectedCounty, selectedCity));

        setIsSubmitting(true);


    };



    useEffect(() => {

        if (Object.keys(errors).length === 0 && isSubmitting) {

            callback();

        }
    },
        [errors]
    )
    return { handleChange, values, handleSubmit, cities,selectedCity, selectedCounty, countryList, handleCountrySelect ,handleCitySelect, errors }
};

export default ServiceForm;



