import HamburgerMenuIcon from '../../assets/hamburger-menu.svg?react';
import Navigation from "../navigation/Navigation.jsx";
import navigationUrls from "../../constants/navigationUrls.js";
import { useState} from "react";
import './HamburgerMenu.css';

function HamburgerMenu() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="hamburger-container">
            <button
                type="button"
                onClick={() => setMenuOpen((open) => !open)}
            >
                <HamburgerMenuIcon className="hamburger-menu-icon" />
            </button>
            {menuOpen && (
                <div className={"hamburger-dropdown"}>
                    <Navigation
                        navigationItems={navigationUrls}
                        classNameList="hamburger-menu-list"
                        closeHamburgerMenu={() => setMenuOpen(false)}
                    />
                </div>
            )}
        </div>
    );
}

export default HamburgerMenu;