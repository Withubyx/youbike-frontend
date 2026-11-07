import './FormPage.css';
import Input from "../input/Input.jsx";
import Button from "../button/Button.jsx";

function FormPage({handleSubmit, handleFormSubmit, pageTitle, inputPropsList, buttonProps, register, errors, errorMessage}) {
    return (
        <main className="outer-container">
            <form onSubmit={handleSubmit(handleFormSubmit)} className="inner-container form-page">
                <h1>{pageTitle}</h1>
                {inputPropsList.map((inputProps) => {
                return (
                    <Input
                        key={inputProps.inputId}
                        inputType={inputProps.inputType}
                        inputName={inputProps.inputName}
                        inputId={inputProps.inputId}
                        inputLabel={inputProps.inputLabel}
                        inputPlaceholder={inputProps.inputPlaceholder}
                        inputOptions={inputProps.inputOptions}
                        validationRules={inputProps.validationRules}
                        register={register}
                        errors={errors}
                    />
                );
            })}
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <Button
                    type={buttonProps.type}
                    name={buttonProps.name}
                    variant={buttonProps.variant}
                    disabled={buttonProps.disabled}
                />
                <p className="required-text">* required</p>
            </form>
        </main>
    );
}

export default FormPage;