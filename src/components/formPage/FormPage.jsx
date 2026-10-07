import './FormPage.css';
import Input from "../input/Input.jsx";
import Button from "../button/Button.jsx";

function FormPage({handleSubmit, handleFormSubmit, pageTitle, inputObjects, register, errors}){
    return (
        <main className="outer-container">
            <form onSubmit={handleSubmit(handleFormSubmit)} className="inner-container form-page">
                <h1>{pageTitle}</h1>
                {inputObjects.map((inputObject) => {
                return (
                    <Input
                        key={inputObject.inputId}
                        inputType={inputObject.inputType}
                        inputName={inputObject.inputName}
                        inputId={inputObject.inputId}
                        inputLabel={inputObject.inputLabel}
                        validationRules={inputObject.validationRules}
                        register={register}
                        errors={errors}
                    />
                );
            })}
                <Button type="submit" name="Sign In" variant="button-main" />
                <p className="required-text">* required</p>
            </form>
        </main>
    );
}

export default FormPage;