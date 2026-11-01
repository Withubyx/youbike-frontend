import navigationUrls from "../../constants/navigationUrls.js";
import {NavLink} from "react-router-dom";
import './Navigation.css';
import {AuthContext} from "../../context/AuthContext.jsx";
import {useContext} from "react";
import Button from "../button/Button.jsx";

function Navigation({ classNameList, closeHamburgerMenu }) {
    const {isAuth, user, logout} = useContext(AuthContext);

    let shortUsername = ""
    if (user != null) {
        if (user.username.length < 8) {
            shortUsername = user.username;
        } else {
            shortUsername = user.username.slice(0, 6) + "...";
        }
    }

    const navigationItems = {
        authIsFalse: [
            {id: 'Home', type: "link", label: 'Home'},
            {id: 'Bikes', type: "link", label: 'Bikes'},
            {id: 'Bike Rides', type: "link", label: 'Bike Rides'},
            {id: 'User content page', type: "link", label: 'My Bikes & Bike Rides'},
            {id: 'Sign In', type: "link", label: 'Sign In'},
            {id: 'Create Free Account', type: "link", label: 'Create Free Account'},
        ],
        authIsTrueUserRoleBikeCompany: [
            {id: 'Home', type: "link", label: 'Home'},
            {id: 'Bikes', type: "link", label: 'Bikes'},
            {id: 'Bike Rides', type: "link", label: 'Bike Rides'},
            {id: 'User content page', type: "link", label: 'My Bike Rides'},
            {id: 'Sign Out', type: "button", name: 'Sign Out', onClick: logout},
            {id: 'My Account', type: "link", label: `My Account (${user && shortUsername})`},
        ],
        authIsTrueUserRoleCyclist: [
            {id: 'Home', type: "link", label: 'Home'},
            {id: 'Bikes', type: "link", label: 'Bikes'},
            {id: 'Bike Rides', type: "link", label: 'Bike Rides'},
            {id: 'User content page', type: "link", label: 'My Bikes & Bike Rides'},
            {id: 'Sign Out', type: "button", name: 'Sign Out', onClick: logout},
            {id: 'My Account', type: "link", label: `My Account (${user && shortUsername})`},
        ]
    };

    let authAndRoleBasedNavigationItems = [];
    if (!isAuth) {
        authAndRoleBasedNavigationItems = navigationItems.authIsFalse;
    } else if (isAuth) {
        if (user && user.userRole === 'ROLE_BIKE_COMPANY') {
            authAndRoleBasedNavigationItems = navigationItems.authIsTrueUserRoleBikeCompany;
        } else if (user && user.userRole === 'ROLE_CYCLIST') {
            authAndRoleBasedNavigationItems = navigationItems.authIsTrueUserRoleCyclist;
        }
    }

    const renderedNavigationItems = authAndRoleBasedNavigationItems.map((item) => {
    if (item.type === 'link') {
        return (
            <li key={item.id}>
                <NavLink
                    to={(navigationUrls.find((url)=> url.id === item.id)).url}
                    onClick={closeHamburgerMenu}
                    className={({ isActive }) => isActive ? `active-link` : 'default-link'}
                >
                    {item.label}
                </NavLink>
            </li>
        )
    }
    if (item.type === 'button') {
        return (
            <li key={item.id}>
                <Button
                    type={item.type}
                    name={item.name}
                    onClick={() => {item.onClick(); closeHamburgerMenu();}}
                />
            </li>
        )}
    })

    return (
        <nav>
            <ul className={classNameList}>
                {renderedNavigationItems}
            </ul>
        </nav>
    );
}

export default Navigation;