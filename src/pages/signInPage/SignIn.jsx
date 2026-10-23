import FormPage from '../../components/formPage/FormPage.jsx';
import {useForm} from "react-hook-form";
import axios from "axios";
import backendApiBaseUrl from "../../config/configuration.js";

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
                message: "Password must be at least 10 characters long."
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

    async function handleFormSubmit(data) {
        const response = await axios.post(
            backendApiBaseUrl + "/sign-in",
            {
                email: data.email,
                password: data.password
            }
        );
        const JWT = response.data.jwt
        await login(JWT);
    }

    return (
        <FormPage
            handleSubmit={handleSubmit}
            handleFormSubmit={handleFormSubmit}
            pageTitle="Meet, share, comment..."
            inputObjects={inputObjects}
            register={register}
            errors={errors}
        />
    );
}

export default SignIn;