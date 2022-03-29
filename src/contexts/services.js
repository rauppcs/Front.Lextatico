import { createContext, useState } from 'react';

const ServiceContext = createContext();

export const ServiceProvider = ({ children }) => {
    const [titleName, setTitleName] = useState("");

    const [snackBar, setSnackBar] = useState({
        open: false,
        severity: "info",
        message: ""
    });

    return (
        <ServiceContext.Provider value={{ snackBar, setSnackBar, titleName, setTitleName }}>
            {children}
        </ServiceContext.Provider>
    )
}

export default ServiceContext;
