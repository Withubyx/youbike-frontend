import './Button.css';

function Button({ type, name, onClick, variant, disabled }) {
    return (
        <button type={type} name={name} onClick={onClick} className={variant} disabled={disabled}>
            {name}
        </button>
    );
}

export default Button;