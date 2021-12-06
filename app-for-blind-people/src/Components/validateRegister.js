export default function validateRegister(values) {


    let errors = {};

    if (!values.user_name) {
        errors.user_name = "Campo no puede estar vacío"
    }


    if (!values.user_email) {

        errors.email = "Campo no puede estar vacío"


    } else {
        if (!/^[a-zA-Z0-9._:$!%-]+@[a-zA-Z0-9.-]+.[a-zA-Z]$/.test(values.user_email)) {

            errors.email = "El correo no es válido";
        }

    }





    if (!values.password) {

        errors.password = "El campo no puede estar vacío";

    } else {
        if (!/^(?=.*?[A-Za-z])(?=.*?[0-9]).{6,}$/.test(values.password)) {

            errors.password = "Contraseña debe tener un formato válido";
        } else {
            if (values.password !== values.password2) {
                errors.password = "Cantraseñas deben coincidir"
            }
        }
    }

    if (!values.user_phone) {
        errors.user_phone = "El campo no puede estar vacío"
    } else {
        if (!/^[0-9]+$/.test(values.user_phone)) {

            errors.user_phone = "Solo puede ingresar números";
        } else {
            if (values.user_phone.length < 7 || values.user_phone.length > 10) {
                errors.user_phone= "El número debe contener 7 o 10 dígidos";
            }
        }

    }
    return errors;
}