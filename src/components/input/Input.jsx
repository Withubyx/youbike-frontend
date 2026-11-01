import './Input.css';

function Input({ inputType, inputName, inputLabel, inputId, validationRules, register, errors }) {
    return (
        <>
            <label htmlFor={inputId}>{inputLabel}</label>
            <input
                type={inputType}
                id={inputId}
                {...register(inputName, validationRules)}
            />
            {errors[inputName] && <p className="validation-message">{errors[inputName].message}</p>}
        </>
    );
}

export default Input;