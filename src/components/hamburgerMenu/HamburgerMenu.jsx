import HamburgerMenuIcon from '../../assets/hamburger-menu.svg?react';
import Navigation from "../navigation/Navigation.jsx";
import navigationItems from "../../constants/navigation-Items.js";
import { useState} from "react";
import './HamburgerMenu.css';

function HamburgerMenu() {
    const [menuOpen, setMenuOpen] = useState(false);

    return (
        <div className="hamburger-container">
            <button
                type="button"
                className="hamburger-button"
                onClick={() => setMenuOpen((open) => !open)}
            >
                <HamburgerMenuIcon className="hamburger-menu-icon" />
            </button>
            {menuOpen && (
                <div className={"hamburger-dropdown"}>
                    <Navigation
                        navigationItems={navigationItems}
                        classNameList="hamburger-menu-list"
                        closeHamburgerMenu={() => setMenuOpen(false)}
                    />
                </div>
            )}
        </div>
    );
}

export default HamburgerMenu;