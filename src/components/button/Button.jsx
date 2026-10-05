import './Button.css';

function Button({ type, name, onClick, variant}) {
    return (
        <button> type={type} name={name} onClick={onClick} className={variant}</button>
    );
}

export default Button;