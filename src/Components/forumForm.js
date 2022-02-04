import { useState, useEffect } from "react";

const useForm = (callback, validate) => {

    const [comment, setComment] = useState("")

 
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false)

   
    
    const handleChange = e => {
        setComment(e.target.value)
    }

    const handleSubmit = e => {
        e.preventDefault();
     

        setErrors(validate(comment));

        setIsSubmitting(true);
       


    };



    useEffect(() => {

        if (Object.keys(errors).length === 0 && isSubmitting) {

            callback();
            setComment("")

        }
    },
        [errors]
    )
    return { handleChange, comment, handleSubmit, errors }
};

export default useForm;



