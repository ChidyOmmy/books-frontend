import { createContext, useState, useEffect } from "react";

export const UserContext = createContext();

export const UserContextProvider = ({ children }) => {
    const [user, setUser] = useState({});

    useEffect(() => {
        const username = localStorage.getItem('username')
        const fullname = localStorage.getItem('fullname')
        const access = localStorage.getItem('access')
        const refresh = localStorage.getItem('refresh')
        const id = localStorage.getItem('id')

        if (localStorage.getItem('access')) {
            setUser({ username, fullname, access, refresh, id })
        }
        return () => { };
    }, []);

    return (
        <UserContext.Provider
            value={{ user, setUser }}>
            {" "}
            {children}{" "}
        </UserContext.Provider>
    );
};
