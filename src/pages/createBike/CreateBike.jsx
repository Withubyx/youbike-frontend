import FormPage from "../../components/formPage/FormPage.jsx";
import {useForm} from "react-hook-form";
import {useState} from "react";
import {youBikeApiBaseUrl} from "../../config/configuration.js";
import axios from "axios";
import {useNavigate} from "react-router-dom";
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
        inputPlaceholder: "?",
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
        inputPlaceholder: "?",
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
        inputPlaceholder: "?",
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
        inputPlaceholder: "?",
        validationRules: {
            maxLength: {
                value: 255,
                message: "Description must be at most 255 characters long."
            }
        }
    },
    {
        inputId: "imageFile",
        inputType: "file",
        inputName: "imageFile",
        inputLabel: "Bike image *",
        validationRules: {
            required: {
                value: true,
                message: "Image is required."
            }
        }
    }
]

function CreateBike() {
    const {register, handleSubmit, formState: {errors}} = useForm({mode: "onChange"});
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, toggleLoading] = useState(false);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const buttonProps = {
        type: "submit",
        name: "Add the Bike",
        variant: "button-main",
        disabled: loading,
    }

    async function handleFormSubmit(data) {
        setErrorMessage("");
        toggleLoading(true);
        try {
            const formData = new FormData();
            const bikeData = {
                bikeType: data.bikeType,
                brand: data.brand,
                model: data.model,
                color: data.color,
                description: data.description,
            };

            formData.append("bike", new Blob([JSON.stringify(bikeData)], {type: "application/json"}));
            formData.append("file", data.imageFile[0]);

            await axios.post(`${youBikeApiBaseUrl}/bikes`,
                formData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                },
            );
            navigate(navigationUrls.find(url => url.id === 'User content page').url);
        } catch (e) {
            console.error(e);
            setErrorMessage("Error adding the Bike");
        } finally {
            toggleLoading(false);
        }
    }

    return (
        <FormPage
            handleSubmit={handleSubmit}
            handleFormSubmit={handleFormSubmit}
            pageTitle="Add a Bike"
            inputPropsList={inputPropsList}
            buttonProps={buttonProps}
            register={register}
            errors={errors}
            errorMessage={errorMessage}
        />
    );
}

export default CreateBike