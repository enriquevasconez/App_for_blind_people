import { useState, useEffect } from "react";

//import { useHistory } from 'react-router-dom';


const UpdateForm =  (callback, validate) => {


    //-const history = useHistory();

    //const [redirect, setRedirect] = useState(false)
   
    let user = JSON.parse(localStorage.getItem('user-info'))


    const [values, setValues] = useState({

        user_name: user.user_name,
        user_email: user.user_email,
        user_phone:user.user_phone,
        user_id: user.user_id,
        password:'',
        password2:'',
        access_token:''

    })

    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false)


    const handleChange =  e => {
        const { name, value } = e.target
        setValues({
            ...values,
            [name]: value
        })
    }

    const handleSubmit =  e => {
        e.preventDefault();

        setErrors(validate(values));
         
        setIsSubmitting(true);


    };

 

    useEffect( () => {

       
        if (Object.keys(errors).length === 0 && isSubmitting) {
            
            callback();
        
        }
    },
    [errors]
    )

    return { handleChange, values, handleSubmit, errors }
};


export default UpdateForm;



