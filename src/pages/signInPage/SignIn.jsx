import FormPage from '../../components/formPage/FormPage.jsx';
import {useForm} from "react-hook-form";

const inputObjects = [
    {
        inputId: "email-field",
        inputType: "text",
        inputName: "email",
        inputLabel: "Email *",
        validationRules: {
            required: {
                value: true,
                message: "Email is required!"
            },
            maxLength: {
                value: 100,
                message: "Email must not exceed 100 characters."
            },
            validate: (value) => value.includes('@') || "This is not an email address.",
        }
    },
    {
        inputId: "password-field",
        inputType: "password",
        inputName: "password",
        inputLabel: "Password *",
        validationRules: {
            required: {
                value: true,
                message: "Password is required!"
            },
            minLength: {
                value: 10,
                message: "Password must be at least 8 characters long."
            },
            maxLength: {
                value: 100,
                message: "Password must not exceed 100 characters."
            }
        }
    },
];

function SignIn() {
    const {register, handleSubmit, formState: {errors}} = useForm({mode: 'onBlur'});

    function handleFormSubmit(data) {
        console.log(data);
    }

    return (
        <FormPage
            handleSubmit={handleSubmit}
            handleFormSubmit={handleFormSubmit}
            pageTitle="Meat, share, comment..."
            inputObjects={inputObjects}
            register={register}
            errors={errors}
        />
    );
}

export default SignIn;