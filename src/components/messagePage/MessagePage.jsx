import './MessagePage.css'
import {Link} from "react-router-dom";

function MessagePage({title, text, linkUrlWithoutBase, linkText}) {
    return (
        <main className="outer-container">
            <div className="inner-container error-page">
                <h1>{title}</h1>
                <p>{text} <Link to={linkUrlWithoutBase}>{linkText}</Link></p>
            </div>
        </main>
    )
}

export default MessagePage;