import './NavigationBar.css';
import Navigation from "../navigation/Navigation.jsx";
import navigationItems from "../../constants/navigation-Items.js";

function NavigationBar() {
    return (
        <div className="outer-container navigation-bar">
            <div className="inner-container">
                <Navigation navigationItems={navigationItems} classNameList="navigation-bar-list" />
            </div>
        </div>
    );
}

export default NavigationBar;