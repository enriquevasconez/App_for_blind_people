import { useState, useEffect } from "react";

let countries={};
fetch(
    `https://blind-people-app-backend.herokuapp.com/city`,
    {
        headers: {
            'Content-type': 'application/json',
            "x-api-key": "420f77de-2cea-4e13-841a-b43ca729a7a9"
        }

    }

)
    .then(
        (resp) => {
            console.log("continua")
            return resp.json();
        }
    )
    .then((
        resp => {
            let countriesAux = {};
            const data = resp.result;
            const count = resp.count;
            const states = resp.states;
            states.forEach(
                state => {
                    countriesAux[state] = data.filter(element => 
                        element.state === state
                    )
                }
            )
            countries=countriesAux;
        }
    ));

const ServiceForm = (callback, validate) => {

    const [values, setValues] = useState({

        service_name: '',
        service_description: '',
        service_price: '',
        sc: '',
        img: ''

    })

    // const [countries, setCountries] = useState({});

    


    const [cities, setCities] = useState([]);
    const [selectedCounty, setSelectedCountry] = useState("");
    const [selectedCity, setSelectedCity] = useState("");



    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [imgPreview, setImgPreview] = useState({
        file: [],
        filepreview: null,
    });

    const countryList = Object.keys(countries).map(key => ({
        name: key
    }));
console.log("countryList",countryList);

    const handleCountrySelect = e => {
        let cities=[]
        console.log("Selected country", e.target.value);
        const countrySel = e.target.value;
        countries[countrySel].forEach(
            country=>{
                cities.push({
                    name:country['city'],
                    id:country['place_id']
                });
            }
            );
            console.log("cities1",cities)
        const citiesSel = countrySel !== "" ? cities : [];
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

    const handeInputChange = (event) => {
        setImgPreview({
            ...imgPreview,
            file: event.target.files[0],
            filepreview: URL.createObjectURL(event.target.files[0]),
        })
    }

    const handeDelteChange = (event) => {

        setImgPreview({
            ...imgPreview,
            file: [],
            filepreview: null,
        })
    }


    const handleSubmit = e => {
        e.preventDefault();

        setErrors(validate(values, selectedCounty, selectedCity));

        setIsSubmitting(true);


    };



    useEffect(() => {

        if (Object.keys(errors).length === 0 && isSubmitting) {

            callback();

        }
    },
        [errors]
    )
    return { handleChange, handeDelteChange, values, handleSubmit, cities, selectedCity, selectedCounty, countryList, handleCountrySelect, handleCitySelect, imgPreview, handeInputChange, errors }
};

export default ServiceForm;



