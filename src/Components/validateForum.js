

export  default   function validateForum(comment) {
   
   
    let errors = {};



    if (!comment) {

        errors.comment = "Debe ingresar una solicitud"


    } 

 
    return errors;
} 