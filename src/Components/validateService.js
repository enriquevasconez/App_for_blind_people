
export default function validateService(values , selectedCounty, selectedCity) {


    let errors = {};

    
    if(!values.service_name){
        errors.service_name ="Ingrese el nombre del servicio"
    }

    if(!values.service_description){
        errors.service_description ="Debe agregar una descripción"
    }

    if(!values.sc){
        errors.type ="Seleccione el tipo de servicio"
    }

    
    if(!selectedCounty){
        errors.selectedCounty ="Seleccione una provicnia"
    }

    if(!selectedCity){
        errors.selectedCity ="Seleccione una ciudad"
    }

    return errors;
}