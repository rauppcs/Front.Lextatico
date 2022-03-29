import { createContext, useState } from 'react';
import { getUser } from '../services/authService';

const UserContext = createContext();

export const UserProvider = ({ children }) => {
    const [user, setUser] = useState(getUser());

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    )
}

export default UserContext
