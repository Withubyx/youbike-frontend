import './NavigationBar.css';
import Navigation from "../navigation/Navigation.jsx";
import navigationUrls from "../../constants/navigationUrls.js";

function NavigationBar() {
    return (
        <div className="outer-container navigation-bar">
            <div className="inner-container">
                <Navigation navigationItems={navigationUrls} classNameList="navigation-bar-list" />
            </div>
        </div>
    );
}

export default NavigationBar;