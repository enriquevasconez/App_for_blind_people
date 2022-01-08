

export  default   function validateInfo(values) {
   
   
    let errors = {};



    if (!values.email) {

        errors.email = "Campo no puede estar vacío"


    } else {
        if (!/^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/.test(values.email)) {

            errors.email = "El correo no es válido";
        } 

    }

    if (!values.password) {

        errors.password = "El campo no puede estar vacío";

    } else {
        if (!/^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$/.test(values.password)) {

            errors.password = "Contraseña debe tener un formato válido";
        } 
    }
    

 
    return errors;
} 