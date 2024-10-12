import { createContext, useState, useEffect, useMemo } from "react";
import { jwtDecode } from 'jwt-decode'
export const UserContext = createContext();

const local_user = {
    username: localStorage.getItem('username'),
    fullname: localStorage.getItem('fullname'),
    access: localStorage.getItem('access'),
    refresh: localStorage.getItem('refresh'),
    id: localStorage.getItem('id'),
}
const empty_user = {
    username: '',
    fullname: '',
    access: '',
    refresh: '',
    id: '',
}
export const UserContextProvider = ({ children }) => {
    const [emptyUser] = useState(empty_user)
    const [user, setUser] = useState(local_user);

    function getTokenExpiry(token) {
        if (!token) {
            console.log("Invalid token");
            return null;
        }
        try {
            const decodedToken = jwtDecode(token);
            if (decodedToken.exp) {
                console.log("Token expiry date set to:", new Date(decodedToken.exp * 1000));
                return decodedToken.exp * 1000;
            }
        } catch (error) {
            console.log(error.message)
        }
        return null;
    }
    const updateAuthTokens = async () => {
        const refreshToken = localStorage.getItem('refresh')
        if (!refreshToken) {
            localStorage.clear()
            setUser(emptyUser)
            return console.log('Invalid refresh token')
        }
        try {
            console.log("Attempting to refresh token...");
            const response = await fetch("http://localhost:8000/refresh", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${refreshToken}`
                },
            });

            if (!response.ok) {
                console.log("Token refresh failed, clearing local storage");
                localStorage.clear();
                setUser(emptyUser);
                return;
            }

            const { access, refresh } = await response.json();
            console.log('New access', access)
            localStorage.setItem("access", access);
            localStorage.setItem("refresh", refresh);
            setUser((prevUser) => ({
                ...prevUser,
                access,
                refresh
            }));
        } catch (error) {
            console.error("Error refreshing token:", error.message);
        }
    }

    useEffect(() => {
        const username = localStorage.getItem('username')
        const fullname = localStorage.getItem('fullname')
        const access = localStorage.getItem('access')
        const refresh = localStorage.getItem('refresh')
        const id = localStorage.getItem('id')

        if(access){
            setUser({
                username,fullname,id,access,refresh
            })
        }
        return () => { };
    },[]);
    
    useEffect(() => {
         if (user.access) {
            console.log('Access', user.access)
            const accessExpiry = getTokenExpiry(user.access)
            const refreshExpiry = getTokenExpiry(user.refresh)

            // Check how many time till expiry
            if (refreshExpiry - Date.now() > 0) {
                const timeLeft = accessExpiry - Date.now()
                if (timeLeft < 0) {
                    console.log('Token already expired, refreshing immediately..')
                    updateAuthTokens()
                } else {
                    console.log('Scheduling token refresh in', timeLeft)
                    setTimeout(updateAuthTokens, timeLeft)
                }
            } else {
                localStorage.clear()
                setUser(emptyUser)
            }
        } else  console.log('Invalid access, cant refresh', user.access)

        return () => {};
    }, [user.access]);
    return (
        <UserContext.Provider
            value={{ user, setUser, emptyUser }}>
            {" "}
            {children}{" "}
        </UserContext.Provider>
    );
};
