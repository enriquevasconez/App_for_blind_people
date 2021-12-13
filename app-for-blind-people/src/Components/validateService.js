
export default function validateService(values , selectedCounty, selectedCity) {


    let errors = {};

    
    if(!values.service_name){
        errors.service_name ="Campo no puede estar vacio"
    }

    if(!values.service_description){
        errors.service_description ="Campo no puede estar vacio"
    }

    if(!values.type){
        errors.type ="Campo no puede estar vacio"
    }

    
    if(!selectedCounty){
        errors.selectedCounty ="Campo no puede estar vacio"
    }

    if(!selectedCity){
        errors.selectedCity ="Campo no puede estar vacio"
    }

    return errors;
}