import React, { useContext } from 'react';
import { UserContext } from "../context/userContext";
const AboutPage = () => {
    const { user } = useContext(UserContext)
    console.log('user', user)
    return (
        <div>
            About Page
        </div>
    );
}

export default AboutPage;
