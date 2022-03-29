import { createContext, useState } from 'react';
import { isAuthenticated } from '../services/authService';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isAuth, setIsAuth] = useState(isAuthenticated);

    return (
        <AuthContext.Provider value={{ isAuthenticated: isAuth, setIsAuthenticated: setIsAuth }}>
            {children}
        </AuthContext.Provider>
    )
}

export default AuthContext;
