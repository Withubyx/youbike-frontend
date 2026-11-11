import {useState} from "react";
import FormPage from "../../components/formPage/FormPage.jsx";
import {useForm} from "react-hook-form";
import axios from "axios";
import {youBikeApiBaseUrl} from "../../config/configuration.js";
import MessagePage from "../../components/messagePage/MessagePage.jsx";
import navigationUrls from "../../constants/navigationUrls.js";

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
        {
            inputId: "name",
            inputType: "text",
            inputName: "name",
            inputLabel: "Name *",
            inputPlaceholder: "?",
            validationRules: {
                required: {
                    value: true,
                    message: "Name is required."
                },
                minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters long."
                },
                maxLength: {
                    value: 20,
                    message: "Name must be at most 20 characters long."
                }
            }
        },
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
        {
            inputId: "country",
            inputType: "select",
            inputName: "countryCode",
            inputLabel: "Country *",
            inputOptions: [
                {value: "BE", label: "Belgium"},
                {value: "DE", label: "Germany"},
                {value: "NL", label: "Netherlands"},
            ],
            validationRules: {
                required: {
                    value: true,
                    message: "Country is required."
                }
            }
        },
        {
            inputId: "city",
            inputType: "text",
            inputName: "city",
            inputLabel: "City *",
            inputPlaceholder: "?",
            validationRules: {
                required: {
                    value: true,
                    message: "City is required."
                },
                minLength: {
                    value: 2,
                    message: "City must be at least 2 characters long."
                },
                maxLength: {
                    value: 20,
                    message: "City must be at most 20 characters long."
                }
            }
        },
        {
            inputId: "street",
            inputType: "text",
            inputName: "street",
            inputLabel: "Street *",
            inputPlaceholder: "?",
            validationRules: {
                required: {
                    value: true,
                    message: "Street is required."
                },
                minLength: {
                    value: 2,
                    message: "Street must be at least 2 characters long."
                },
                maxLength: {
                    value: 30,
                    message: "Street must be at most 30 characters long."
                }
            }
        },
        {
            inputId: "houseNumber",
            inputType: "text",
            inputName: "houseNumber",
            inputLabel: "House number *",
            inputPlaceholder: "?",
            validationRules: {
                required: {
                    value: true,
                    message: "House number is required."
                },
                maxLength: {
                    value: 10,
                    message: "House number must be at most 10 characters long."
                }
            }
        },
        {
            inputId: "email-field",
            inputType: "text",
            inputName: "email",
            inputLabel: "Email *",
            inputPlaceholder: "?",
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
            inputPlaceholder: "?",
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
        {
            inputId: "name",
            inputType: "text",
            inputName: "name",
            inputLabel: "Name *",
            inputPlaceholder: "?",
            validationRules: {
                required: {
                    value: true,
                    message: "Name is required."
                },
                minLength: {
                    value: 2,
                    message: "Name must be at least 2 characters long."
                },
                maxLength: {
                    value: 20,
                    message: "Name must be at most 20 characters long."
                }
            }
        },
        {
            inputId: "country",
            inputType: "select",
            inputName: "countryCode",
            inputLabel: "Country *",
            inputOptions: [
                {value: "BE", label: "Belgium"},
                {value: "DE", label: "Germany"},
                {value: "NL", label: "Netherlands"},
            ],
            validationRules: {
                required: {
                    value: true,
                    message: "Country is required."
                }
            }
        },
        {
            inputId: "city",
            inputType: "text",
            inputName: "city",
            inputLabel: "City *",
            inputPlaceholder: "?",
            validationRules: {
                required: {
                    value: true,
                    message: "City is required."
                },
                minLength: {
                    value: 2,
                    message: "City must be at least 2 characters long."
                },
                maxLength: {
                    value: 20,
                    message: "City must be at most 20 characters long."
                }
            }
        },
        {
            inputId: "email-field",
            inputType: "text",
            inputName: "email",
            inputLabel: "Email *",
            inputPlaceholder: "?",
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
            inputPlaceholder: "?",
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