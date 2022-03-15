

export const validateForm=(data) => {
    return new Promise(
        (resolve, reject) => {
            if(data.user.password===data.extras.password){
                resolve("ok")
            }else{
                reject("Las contraseñas no coinciden, por favor reviselas.")
            }
        }
        )
}