import LogoYouBike from '../../assets/logo-youbike.svg?react';
import './Footer.css';

function Footer() {

    return (
        <footer className="outer-container footer">
            <div className="inner-container">
                <LogoYouBike className="footerLogo" />
                <p className="footerText" >
                    &copy; {new Date().getFullYear()} YouBike. All rights reserved.
                </p>
            </div>
        </footer>
    );
}

export default Footer;