import LogoYouBike from '../../assets/logo-youbike.svg?react';
import HamburgerMenu from "../hamburgerMenu/HamburgerMenu.jsx";
import './Header.css';

function Header() {
    return (
        <header className="outer-container header">
            <div className="inner-container header-wrapper">
                <div className="split-inner-container-hamburger-menu-part">
                    <HamburgerMenu className="hamburger-menu" />
                </div>
                <div className="split-inner-container-youbike-logo-part">
                    <span className="youbike-logo-wrapper">
                        <LogoYouBike className="youbike-logo" />
                    </span>
                </div>
            </div>
        </header>
    );
}

export default Header;