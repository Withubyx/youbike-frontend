import {useState} from "react";
import FormPage from "../../components/formPage/FormPage.jsx";
import {useForm} from "react-hook-form";
import axios from "axios";
import {youBikeApiBaseUrl} from "../../config/configuration.js";
import MessagePage from "../../components/messagePage/MessagePage.jsx";
import navigationUrls from "../../constants/navigationUrls.js";
import {cityInputProps, countryInputProps, emailInputProps, houseNumberInputProps, nameInputProps, passwordInputProps, streetInputProps} from "../../constants/inputProps.js";

const inputPropsList = {
    bikeCompanyUser: [
        {
            inputId: "userType",
            inputType: "radio",
            inputName: "userType",
            inputLabel: "Choose one, you are a .....",
            inputOptions: [
                {value: "CYCLIST", label: "Cyclist"},
                {value: "BIKE COMPANY", label: "Bike Company"},
            ]
        },
        nameInputProps,
        {
            inputId: "companyType",
            inputType: "select",
            inputName: "bikeCompanyType",
            inputLabel: "Company type *",
            inputOptions: [
                {value: "BIKE_CAFE", label: "Bike cafe"},
                {value: "BIKE_REPAIR", label: "Bike repair"},
                {value: "BIKE_SHOP", label: "Bike shop"},
            ],
            validationRules: {
                required: {
                    value: true,
                    message: "Company type is required."
                }
            }
        },
        countryInputProps,
        {...cityInputProps,
            inputPlaceholder: "?"},
        {...streetInputProps,
            inputPlaceholder: "?"},
        {...houseNumberInputProps,
            inputPlaceholder: "?"},
        {...emailInputProps,
            inputPlaceholder: "?"},
        {...passwordInputProps,
            inputPlaceholder: "?"}
    ],
    cyclistUser: [
        {
            inputId: "userType",
            inputType: "radio",
            inputName: "userType",
            inputLabel: "Choose one, you are a .....",
            inputOptions: [
                {value: "CYCLIST", label: "Cyclist"},
                {value: "BIKE COMPANY", label: "Bike Company"},

            ]
        },
        {...nameInputProps,
            inputPlaceholder: "?"},
        countryInputProps,
        {...cityInputProps,
            inputPlaceholder: "?"},
        {...emailInputProps,
            inputPlaceholder: "?"},
        {...passwordInputProps,
            inputPlaceholder: "?"}
    ],
}

function CreateFreeAccount() {
    const {register, handleSubmit, formState: {errors}, watch} = useForm({mode: "onChange", defaultValues: {userType: "CYCLIST"}});
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, toggleLoading] = useState(false);
    const userType = watch("userType");

    let userTypeBasedInputPropsList;
    if (userType === "BIKE COMPANY") {
        userTypeBasedInputPropsList = inputPropsList.bikeCompanyUser
    } else {
        userTypeBasedInputPropsList = inputPropsList.cyclistUser
    }

    const buttonProps = {
        type: "submit",
        name: "Create Account",
        variant: "button-main",
        disabled: loading,
    }

    async function handleFormSubmit(data) {
        setErrorMessage("");
        setSuccessMessage("");
        toggleLoading(true);
        try {
            if (userType === "BIKE COMPANY") {
                await axios.post(`${youBikeApiBaseUrl}/bike-companies`,
                    {
                        name: data.name,
                        bikeCompanyType: data.bikeCompanyType,
                        addressLocation: {
                            countryCode: data.countryCode,
                            city: data.city,
                            street: data.street,
                            houseNumber: data.houseNumber
                        },
                        email: data.email,
                        password: data.password
                    }
                );
            } else {
                if (userType === "CYCLIST") {
                    await axios.post(`${youBikeApiBaseUrl}/cyclists`,
                        {
                            name: data.name,
                            cityCountryLocation: {
                                countryCode: data.countryCode,
                                city: data.city
                            },
                            email: data.email,
                            password: data.password
                        }
                    );
                }
            }
            setSuccessMessage("🎉 Account is created successfully!");
        } catch (e) {
            console.error(e);
            setErrorMessage("Error creating account");
        } finally {
            toggleLoading(false);
        }
    }

    return (
        <>
            {successMessage
                ? <MessagePage
                    title={successMessage}
                    text="Enjoy all the services available to account holders... go to "
                    linkUrlWithoutBase={navigationUrls.find((item) => item.id === 'Sign In').url}
                    linkText="Sign In"
                />
                : <FormPage
                    handleSubmit={handleSubmit}
                    handleFormSubmit={handleFormSubmit}
                    pageTitle="Create a Free account"
                    inputPropsList={userTypeBasedInputPropsList}
                    buttonProps={buttonProps}
                    register={register}
                    errors={errors}
                    errorMessage={errorMessage}
                />
            }
        </>
    );
}

export default CreateFreeAccount;