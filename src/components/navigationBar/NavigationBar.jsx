import Button from "../button/Button.jsx";
import './NavigationBar.css'

function NavigationBar() {
    return (
        <div className="outer-container navigation-bar">
            <ul className="inner-container">
                <li>
                    <Button type="button">Home</Button>
                </li>
                <li>
                    <Button type="button">Bikes</Button>
                </li>
                <li>
                    <Button type="button">Bike Rides</Button>
                </li>
                <li>
                    <Button type="button">My Bikes & Bike Rides</Button>
                </li>
                <li>
                    <Button type="button">Sign In</Button>
                </li>
                <li>
                    <Button type="button">Create Free Account</Button>
                </li>
            </ul>
        </div>
    );
}

export default NavigationBar;