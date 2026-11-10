import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import axios from 'axios';
import {AuthContext} from "./AuthContext.jsx";
import checkTokenExpired from "../helpers/checkTokenExpired.js";
import {youBikeApiBaseUrl} from "../config/configuration.js";

function AuthContextProvider( { children } ) {
    const [ isAuth, setIsAuth ] = useState( {
        isAuth: false,
        user: null,
        status: 'pending',
    } );
    const navigate = useNavigate();

    function changeUsername ( newUsername ) {
        setIsAuth( {
            ...isAuth,
            user: {
                ...isAuth.user,
                username: newUsername
            }
        });
    }

    async function fetchUserData( decoded, token, redirectUrl ) {
        try {
            let result = {};

            if (decoded.role === 'ROLE_BIKE_COMPANY') {
                result = await axios.get(`${youBikeApiBaseUrl}/bike-companies/${decoded.bike_company_id}`, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    },
                });
                setIsAuth( {
                    ...isAuth,
                    isAuth: true,
                    user: {
                        userRole: decoded.role,
                        id: decoded.bike_company_id,
                        email: decoded.sub,
                        username: result.data.name,
                    },
                    status: 'done',
                } );
            } else {
                if (decoded.role === 'ROLE_CYCLIST') {
                    result = await axios.get(`${youBikeApiBaseUrl}/cyclists/${decoded.cyclist_id}`, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        },
                    });
                }
                setIsAuth( {
                    ...isAuth,
                    isAuth: true,
                    user: {
                        userRole: decoded.role,
                        id: decoded.cyclist_id,
                        email: decoded.sub,
                        username: result.data.name,
                    },
                    status: 'done',
                } );
            }

            if ( redirectUrl ) {
                navigate( redirectUrl );
            }

        } catch ( e ) {
            console.error( e );
            localStorage.removeItem('token');
            setIsAuth( {
                isAuth: false,
                user: null,
                status: 'done',
            } );
        }
    }

    useEffect( () => {
        const token = localStorage.getItem( 'token' );

        if ( token ) {
            const decoded = jwtDecode( token );
            if (checkTokenExpired(decoded.exp)) {
                localStorage.removeItem('token');
                setIsAuth({
                    isAuth: false,
                    user: null,
                    status: 'done',
                } );
            } else {
                void fetchUserData(decoded, token);
            }
        } else {
            setIsAuth( {
                isAuth: false,
                user: null,
                status: 'done',
            } );
        }
    }, [] );

    function login( JWT ) {
        localStorage.setItem( 'token', JWT );
        const decoded = jwtDecode( JWT );
        void fetchUserData( decoded, JWT, '/' );
    }

    function logout() {
        localStorage.removeItem('token');
        setIsAuth( {
            isAuth: false,
            user: null,
            status: 'done',
        } );
        console.log( 'User logged out' );
        navigate( '/' );
    }

    const contextData = {
        ...isAuth,
        login,
        logout,
        changeUsername
    };

    return (
        <AuthContext.Provider value={ contextData }>
            { isAuth.status === 'done' ? children : <p>Loading...</p> }
        </AuthContext.Provider>
    );
}

export default AuthContextProvider;