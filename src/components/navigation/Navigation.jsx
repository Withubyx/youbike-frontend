import {NavLink} from "react-router-dom";
import './Navigation.css';

function Navigation({ navigationItems, classNameList, closeHamburgerMenu }) {
    const list = navigationItems.map((item) => {
        if (item.type === 'link') {
            return (
                <li>
                    <NavLink to={item.url} onClick={closeHamburgerMenu} className={({ isActive }) => isActive ? `active-link` : 'default-link'}>
                        {item.label}
                    </NavLink>
                </li>
            )}
        if (item.type === 'button') {
            return (
                <li>
                    <button type={item.type} onClick={item.onClick} className={item.className}>
                        {item.label}
                    </button>
                </li>
            )}
        }
    )
    return (
        <nav>
            <ul className={classNameList}>
                {list}
            </ul>
        </nav>
    );
}

export default Navigation;