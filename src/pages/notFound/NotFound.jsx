import MessagePage from "../../components/messagePage/MessagePage.jsx";
import NavigationUrls from "../../constants/navigationUrls.js";

function NotFound() {
    return (
        <MessagePage
            title={"You have entered a dead-end street."}
            text={"The url doesn't exist... go to "}
            linkUrlWithoutBase={(NavigationUrls.find((item) => item.id === 'Home').url)}
            linkText={"Home"}
        />
    );
}

export default NotFound;