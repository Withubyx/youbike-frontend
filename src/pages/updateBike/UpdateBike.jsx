import FormPage from "../../components/formPage/FormPage.jsx";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import {youBikeApiBaseUrl} from "../../config/configuration.js";
import axios from "axios";
import navigationUrls from "../../constants/navigationUrls.js";

const inputPropsList = [
    {
        inputId: "bikeType",
        inputType: "select",
        inputName: "bikeType",
        inputLabel: "Bike Type *",
        inputOptions: [
            {value: "RACE", label: "Race"},
            {value: "CYCLOCROSS", label: "Cyclocross"},
            {value: "GRAVEL", label: "Gravel"},
            {value: "MTB", label: "MTB"},
            {value: "OTHER", label: "Other"},
        ],
        validationRules: {
            required: {
                value: true,
                message: "Bike type is required."
            }
        }
    },
    {
        inputId: "brand",
        inputType: "text",
        inputName: "brand",
        inputLabel: "Brand *",
        validationRules: {
            required: {
                value: true,
                message: "Brand is required."
            },
            maxLength: {
                value: 20,
                message: "Brand must be at most 20 characters long."
            }
        }
    },
    {
        inputId: "model",
        inputType: "text",
        inputName: "model",
        inputLabel: "Model *",
        validationRules: {
            required: {
                value: true,
                message: "Model is required."
            },
            maxLength: {
                value: 20,
                message: "Model must be at most 20 characters long."
            }
        }
    },
    {
        inputId: "color",
        inputType: "text",
        inputName: "color",
        inputLabel: "Color",
        validationRules: {
            maxLength: {
                value: 20,
                message: "Color must be at most 20 characters long."
            }
        }
    },
    {
        inputId: "description",
        inputType: "textarea",
        inputName: "description",
        inputLabel: "Description",
        validationRules: {
            maxLength: {
                value: 255,
                message: "Description must be at most 255 characters long."
            }
        }
    },
]

function UpdateBike() {
    const {register, handleSubmit, setValue, formState: {errors}} = useForm({mode: "onChange"});
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, toggleLoading] = useState(false);
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const {bikeId} = useParams();

    const buttonProps = {
        type: "submit",
        name: "Save Settings",
        variant: "button-main",
        disabled: loading,
    }

    async function handleFormSubmit(data) {
        setErrorMessage("");
        toggleLoading(true);
        try {
            await axios.put(`${youBikeApiBaseUrl}/bikes/${bikeId}`,
                {
                    bikeType: data.bikeType,
                    brand: data.brand,
                    model: data.model,
                    color: data.color,
                    description: data.description,
                },
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                },
            );
            navigate(navigationUrls.find(url => url.id === 'User content page').url);
        } catch (e) {
            console.error(e);
            setErrorMessage("Error editing your Bike")
        } finally {
            toggleLoading(false);
        }
    }

    useEffect(() => {
        const controller = new AbortController();

        async function fetchBikeData() {
            try {
                const result = await axios.get(`${youBikeApiBaseUrl}/bikes/${bikeId}`,
                    {signal: controller.signal});
                setValue("bikeType", result.data.bikeType);
                setValue("brand", result.data.brand);
                setValue("model", result.data.model);
                setValue("color", result.data.color);
                setValue("description", result.data.description);
        } catch (e) {
            console.error(e);
            setErrorMessage("Error getting bike data")
            }
        }
        fetchBikeData()

        return function cleanup() {
            controller.abort();
        }
    },[bikeId, setValue]);

    return (
        <FormPage
            handleSubmit={handleSubmit}
            handleFormSubmit={handleFormSubmit}
            pageTitle="Edit the Bike"
            inputPropsList={inputPropsList}
            buttonProps={buttonProps}
            register={register}
            errors={errors}
            errorMessage={errorMessage}
        />
    );
}

export default UpdateBike;