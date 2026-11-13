import FormPage from "../../components/formPage/FormPage.jsx";
import {useEffect, useState, useContext} from "react";
import MessagePage from "../../components/messagePage/MessagePage.jsx";
import NavigationUrls from "../../constants/navigationUrls.js";
import {AuthContext} from "../../context/AuthContext.jsx";
import {useForm} from "react-hook-form";
import axios from "axios";
import {youBikeApiBaseUrl} from "../../config/configuration.js";
import {cityInputProps, countryInputProps, houseNumberInputProps, nameInputProps, streetInputProps} from "../../constants/inputProps.js";

const inputPropsList = {
    bikeCompanyUser: [
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
        cityInputProps,
        streetInputProps,
        houseNumberInputProps
    ],
    cyclistUser: [
        nameInputProps,
        countryInputProps,
        cityInputProps,
    ],
}

function MyAccount() {
    const {register, handleSubmit, setValue, formState: {errors}} = useForm({mode: "onChange"});
    const {user, changeUsername} = useContext(AuthContext);
    const [errorMessage, setErrorMessage] = useState("");
    const [successMessage, setSuccessMessage] = useState("");
    const [loading, toggleLoading] = useState(false);

    const token = localStorage.getItem('token');

    let userTypeBasedInputPropsList;
    if (user.userRole === "ROLE_BIKE_COMPANY") {
        userTypeBasedInputPropsList = inputPropsList.bikeCompanyUser;
    } else {
        userTypeBasedInputPropsList = inputPropsList.cyclistUser;
    }

    const buttonProps = {
        type: "submit",
        name: "Save Settings",
        variant: "button-main",
        disabled: loading,
    }

    async function handleFormSubmit(data) {
        setErrorMessage("");
        setSuccessMessage("");
        toggleLoading(true);
        try {
            if (user.userRole === "ROLE_BIKE_COMPANY") {
                await axios.put(`${youBikeApiBaseUrl}/bike-companies`,
                    {
                        name: data.name,
                        bikeCompanyType: data.bikeCompanyType,
                        addressLocation: {
                            countryCode: data.countryCode,
                            city: data.city,
                            street: data.street,
                            houseNumber: data.houseNumber,
                        }
                    },
                    {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `Bearer ${token}`,
                        }
                    },
                );
            } else {
                if (user.userRole === "ROLE_CYCLIST") {
                    await axios.put(`${youBikeApiBaseUrl}/cyclists`,
                        {
                            name: data.name,
                            cityCountryLocation: {
                                countryCode: data.countryCode,
                                city: data.city,
                            }
                        },
                        {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `Bearer ${token}`,
                            }
                        },
                    );
                }
            }
            changeUsername(data.name)
            setSuccessMessage("Your YouBike profile has been saved.");
        } catch (e) {
            console.error(e);
            setErrorMessage("Error editing your profile");
        } finally {
            toggleLoading(false);
        }
    }

    useEffect(() => {
        const controller = new AbortController();

        async function fetchUserData() {
            setErrorMessage("");
            try {
                if (user.userRole === "ROLE_BIKE_COMPANY") {
                    const result = await axios.get(`${youBikeApiBaseUrl}/bike-companies/${user.id}`,
                        {signal: controller.signal});
                    setValue("name", result.data.name);
                    setValue("bikeCompanyType", result.data.bikeCompanyType);
                    setValue("countryCode", result.data.addressLocation.countryCode);
                    setValue("city", result.data.addressLocation.city);
                    setValue("street", result.data.addressLocation.street);
                    setValue("houseNumber", result.data.addressLocation.houseNumber);
            } else {
                if (user.userRole === "ROLE_CYCLIST") {
                    const result = await axios.get(`${youBikeApiBaseUrl}/cyclists/${user.id}`,
                        {signal: controller.signal,});
                    setValue("name", result.data.name);
                    setValue("countryCode", result.data.cityCountryLocation.countryCode);
                    setValue("city", result.data.cityCountryLocation.city);
                }
            }
        } catch (e) {
            console.error(e);
            setErrorMessage("Error getting your profile");
            }
        }
        fetchUserData()

        return function cleanup() {
            controller.abort();
        }
    }, [user, setValue]);

    return (
        <>
            {successMessage
                ? <MessagePage
                    title={successMessage}
                    text={`View your ${user.userRole === 'ROLE_BIKE_COMPANY' ? "Bike Rides" : "Bikes & Bike Rides"} on YouBike on `}
                    linkUrlWithoutBase={NavigationUrls.find((item) => item.id === 'User content page').url}
                    linkText={user.userRole === 'ROLE_BIKE_COMPANY' ? "My Bike Rides" : "My Bikes & Bike Rides"}
                />
                : <FormPage
                    handleSubmit={handleSubmit}
                    handleFormSubmit={handleFormSubmit}
                    pageTitle="Edit your YouBike profile"
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

export default MyAccount;