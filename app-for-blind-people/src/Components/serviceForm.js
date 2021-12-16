import { useState, useEffect } from "react";

const ServiceForm = (callback, validate) => {

    const [values, setValues] = useState({

        service_name: '',
        service_description: '',
        service_price: 'Por defecto',
        type:'',
        img:''
       
    })

    const [cities, setCities] = useState([]);
    const [selectedCounty, setSelectedCountry] = useState("");
    const [selectedCity, setSelectedCity] = useState("");

    const countries = {
        Esmeraldas: ["Atacames", "Eloy Alfaro", "Esmeraldas", "La Concordia","Muisne","Quinindé",
        "Rioverde","San Lorenzo"],
        Pichincha: ["Cayambe", "Machachi", "Tabacundo", "  Pedro Vicente Maldonado","  Puerto Quito",
        "Quito","Sangolquí", "San Miguel De Los Bancos"],
       
        Brazil: ["São Paulo", "Rio de Janeiro", "Salvador"]
    };

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false)

    const [imgPreview, setImgPreview] = useState({
        file:[],
        filepreview:null,
    });

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

    const handeInputChange = (event) => {
        setImgPreview({
            ...imgPreview,
            file: event.target.files[0],
            filepreview: URL.createObjectURL(event.target.files[0]),
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
    return { handleChange, values, handleSubmit, cities,selectedCity, selectedCounty, countryList, handleCountrySelect ,handleCitySelect, imgPreview,handeInputChange ,errors }
};

export default ServiceForm;



