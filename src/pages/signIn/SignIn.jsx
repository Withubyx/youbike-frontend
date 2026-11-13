import FormPage from '../../components/formPage/FormPage.jsx';
import {useForm} from "react-hook-form";
import axios from "axios";
import {youBikeApiBaseUrl} from "../../config/configuration.js";
import {useContext, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import {emailInputProps, passwordInputProps} from "../../constants/inputProps.js";

const inputPropsList = [
    {...emailInputProps,
        inputPlaceholder: "?"},
    {...passwordInputProps,
        inputPlaceholder: "?"}
];

function SignIn() {
    const {register, handleSubmit, formState: {errors}} = useForm({mode: 'onChange'});
    const {login} = useContext(AuthContext);
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
    );
}

export default SignIn;