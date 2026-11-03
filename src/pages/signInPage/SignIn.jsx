import FormPage from '../../components/formPage/FormPage.jsx';
import {useForm} from "react-hook-form";
import axios from "axios";
import {youBikeApiBaseUrl} from "../../config/configuration.js";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import ErrorPage from "../../components/errorPage/ErrorPage.jsx";
import NavigationUrls from "../../constants/navigationUrls.js";

const inputPropsList = [
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
    const {isAuth, login} = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, toggleLoading] = useState(false);

    const buttonProps = {
        type: "submit",
        name: "Sign In",
        variant: "button-main",
        disabled: loading,
    }

    async function handleFormSubmit(data) {
        setErrorMessage("");
        try {
            toggleLoading(true);
            const response = await axios.post(
                `${youBikeApiBaseUrl}/login`,
                {
                    email: data.email,
                    password: data.password
                }
            );
            const JWT = response.headers['authorization'].substring(7);
            await login(JWT);
        } catch (e) {
        console.error(e);
        if (e.response && e.response.status === 401) {
            setErrorMessage("Wrong email and/or password");
        } else {
            setErrorMessage("Sign in failed");
        }
        } finally {
            toggleLoading(false);
        }
    }

    return (
        <>
            {isAuth
                ?
                <ErrorPage
                    title={"You are already signed in."}
                    text={"Sign out and then sign in as another user or... go to "}
                    linkUrlWithoutBase={(NavigationUrls.find((item) => item.id === 'Home').url)}
                    linkText={"Home"}
                />
                :
                <FormPage
                    handleSubmit={handleSubmit}
                    handleFormSubmit={handleFormSubmit}
                    pageTitle="Meet, share, comment..."
                    inputPropsList={inputPropsList}
                    buttonProps={buttonProps}
                    register={register}
                    errors={errors}
                    errorMessage={errorMessage}
                />
            }
        </>
    );
}

export default SignIn;