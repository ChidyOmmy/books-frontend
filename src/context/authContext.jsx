// import React, {
//     createContext,
//     useContext,
//     useEffect,
//     useRef,
//     useState,
//     useCallback
// } from "react";
// import { jwtDecode } from "jwt-decode";
// import { UserContext, emptyUser } from "./UserContext";

// export const TokenContext = createContext();

// function getTokenExpiry(token) {
//     if (!token) {
//         console.log("Invalid token");
//         return null;
//     }
//     const decodedToken = jwtDecode(token);
//     if (decodedToken.exp) {
//         console.log("Token expiry date set to:", new Date(decodedToken.exp * 1000));
//         return decodedToken.exp * 1000;
//     }
//     return null;
// }

// const TokenProvider = React.memo(({ children }) => {
//     const { userData, setUserData } = useContext(UserContext);
//     const [expireDate, setExpireDate] = useState(getTokenExpiry(userData.access));
//     const refreshTimeout = useRef(null);
//     const isFirstRender = useRef(true);

//     useEffect(() => console.log("TokenContext mounted"), []);
//     const updateRefreshToken = useCallback(async () => {
//         try {
//             console.log("Attempting to refresh token...");
//             const response = await fetch("http://localhost:8000/token/refresh/", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json"
//                 },
//                 body: JSON.stringify({ refresh: userData.refresh })
//             });

//             if (!response.ok) {
//                 console.log("Token refresh failed, clearing local storage");
//                 localStorage.clear();
//                 setUserData(emptyUser);
//                 return;
//             }

//             const { access, refresh } = await response.json();
//             console.log("New Access Token:", access);
//             console.log("New Refresh Token:", refresh);

//             localStorage.setItem("access", access);
//             localStorage.setItem("refresh", refresh);
//             setUserData((prevUserData) => ({
//                 ...prevUserData,
//                 access,
//                 refresh
//             }));

//             const newExpireDate = getTokenExpiry(access);
//             setExpireDate(newExpireDate);
//         } catch (error) {
//             console.error("Error refreshing token:", error);
//         }
//     }, [userData.refresh, setUserData]);

//     const scheduleTokenRefresh = useCallback(
//         (expiryDate) => {
//             if (refreshTimeout.current) {
//                 console.log("Clearing existing refresh timeout");
//                 clearTimeout(refreshTimeout.current);
//             }

//             if (!userData.refresh) {
//                 console.log("Refresh token is empty, stopping refresh scheduling");
//                 return;
//             }

//             const now = Date.now();
//             let delay = expiryDate - now - 10000; // 10 seconds before expiry

//             if (delay > 1000) {
//                 console.log(`Scheduling token refresh in ${delay} milliseconds`);
//                 refreshTimeout.current = setTimeout(updateRefreshToken, delay);
//             } else {
//                 console.log("Token has already expired, refreshing immediately");
//                 updateRefreshToken();
//             }
//         },
//         [updateRefreshToken, userData.refresh]
//     );

//     useEffect(() => {
//         if (isFirstRender.current) {
//             isFirstRender.current = false;
//             console.log("First render, skipping effect execution");
//         } else {
//             console.log("Subsequent render, scheduling token refresh");
//             scheduleTokenRefresh(expireDate);
//         }

//         return () => {
//             if (refreshTimeout.current) {
//                 console.log("Cleaning up timeout on unmount");
//                 clearTimeout(refreshTimeout.current);
//             }
//         };
//     }, [expireDate, scheduleTokenRefresh]);

//     return (
//         <TokenContext.Provider value={{ scheduleTokenRefresh }}>
//             {children}
//         </TokenContext.Provider>
//     );
// });

// export default TokenProvider;