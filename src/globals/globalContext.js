import React, { useState, createContext } from 'react';
import {serviceInit} from './defaults'

export const GlobalContext = createContext({});

const GlobalProvider = ({ children }) => {
    const [serviceValues, setServiceValues] = useState(serviceInit);

    const values = {
        serviceValues, setServiceValues
    }

    console.log("values", values)
    return (
        <GlobalContext.Provider value={values}>
            {children}
        </GlobalContext.Provider>
    )
}


export default GlobalProvider;


