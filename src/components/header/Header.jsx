import LogoYouBike from '../../assets/logo-youbike.svg?react';
import HamburgerMenu from "../hamburgerMenu/HamburgerMenu.jsx";
import './Header.css'

function Header() {
    return (
        <header className="outer-container header">
            <div className="inner-container">
                <HamburgerMenu className="hamburger-menu" />
                <span className="youbike-logo-wrapper">
                    <LogoYouBike className="youbike-logo" />
                </span>
            </div>
        </header>
    );
}

export default Header;