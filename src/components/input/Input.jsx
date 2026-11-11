import './Input.css';

function Input({ inputType, inputName, inputLabel, inputId, inputPlaceholder, inputOptions, validationRules, register, errors }) {
    return (
        <>
            {inputType === 'radio' && (
                <fieldset className="radio-type-input-fieldset">
                    <legend>{inputLabel}</legend>
                        <div className="radio-type-input-wrapper">
                        {inputOptions.map(option => (
                            <label key={option.value} className="radio-type-input-label">
                                <input
                                    className="radio-type-input"
                                    type="radio"
                                    value={option.value}
                                    {...register(inputName, validationRules)}
                                />
                            {option.label}
                            </label>
                        ))}
                    </div>
                    {errors[inputName] && <p className="validation-message">{errors[inputName].message}</p>}
                </fieldset>
            )}
            {inputType === 'select' && (
                <>
                    <label htmlFor={inputId}>{inputLabel}</label>
                    <select id={inputId} {...register(inputName, validationRules)}>
                        <option value="">Select</option>
                        {inputOptions.map(option => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    {errors[inputName] && <p className="validation-message">{errors[inputName].message}</p>}
                </>
            )}
            {(inputType === 'text' || inputType === 'password') && (
                <>
                    <label htmlFor={inputId}>{inputLabel}</label>
                    <input
                        type={inputType}
                        id={inputId}
                        placeholder={inputPlaceholder}
                        {...register(inputName, validationRules)}
                    />
                    {errors[inputName] && <p className="validation-message">{errors[inputName].message}</p>}
                </>
            )}
            {inputType === 'textarea' && (
                <>
                    <label htmlFor={inputId}>{inputLabel}</label>
                    <textarea
                        id={inputId}
                        placeholder={inputPlaceholder}
                        {...register(inputName, validationRules)}
                    />
                    {errors[inputName] && <p className="validation-message">{errors[inputName].message}</p>}
                </>
            )}
            {inputType === 'file' && (
                <>
                    <label htmlFor={inputId}>{inputLabel}</label>
                    <input
                        className="file-type-input"
                        type={inputType}
                        id={inputId}
                        placeholder={inputPlaceholder}
                        {...register(inputName, validationRules)}
                    />
                    {errors[inputName] && <p className="validation-message">{errors[inputName].message}</p>}
                </>
            )}
        </>
    );
}

export default Input;