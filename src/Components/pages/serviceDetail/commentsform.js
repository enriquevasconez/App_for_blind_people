import { useState, useEffect } from "react";

const CommentForm = (callback) => {

    const [commnets, setComment] = useState("")

 
    const [errors, setErrors] = useState({});
    const [isSubmitting, setIsSubmitting] = useState(false)

   
    
    const handleChange = e => {
        setComment(e.target.value)

    }

    const handleSubmit = e => {
        e.preventDefault();
     
        setIsSubmitting(true);
        

    };

    useEffect(() => {

        if (isSubmitting) {

            callback();
            setComment("");

        }
    },
        [errors]
    )
    return { handleChange,  commnets, handleSubmit }
};

export default CommentForm;


