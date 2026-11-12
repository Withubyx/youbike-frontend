import FormPage from "../../components/formPage/FormPage.jsx";
import {useForm} from "react-hook-form";
import {useState} from "react";
import {useNavigate} from "react-router-dom";
import axios from "axios";
import {youBikeApiBaseUrl} from "../../config/configuration.js";
import navigationUrls from "../../constants/navigationUrls.js";

const inputPropsList = [
    {
        inputId: "title",
        inputType: "text",
        inputName: "title",
        inputLabel: "Title *",
        inputPlaceholder: "?",
        validationRules: {
            required: {
                value: true,
                message: "Title is required.",
            },
            maxLength: {
                value: 40,
                message: "Title must be at most 40 characters long.",
            }
        }
    },
    {
        inputId: "startDateTime",
        inputType: "datetime-local",
        inputName: "startDateTime",
        inputLabel: "Start date and time *",
        validationRules: {
            required: {
                value: true,
                message: "Start Date and Time is required.",
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
                message: "Description must be at most 255 characters long.",
            }
        }
    },
    {
        inputId: "distance",
        inputType: "text",
        inputName: "distance",
        inputLabel: "Distance * (number)",
        inputPlaceholder: "?",
        validationRules: {
            required: {
                value: true,
                message: "Distance is required.",
            },
        }
    },
    {
        inputId: "speed",
        inputType: "select",
        inputName: "speed",
        inputLabel: "Speed *",
        inputOptions: [
            {value: "KMH_15", label: "15 km/h"},
            {value: "KMH_17_5", label: "17,5 km/h"},
            {value: "KMH_20", label: "20 km/h"},
            {value: "KMH_22_5", label: "22,5 km/h"},
            {value: "KMH_25", label: "25 km/h"},
            {value: "KMH_27_5", label: "27,5 km/h"},
            {value: "KMH_30", label: "30 km/h"},
            {value: "KMH_32_5", label: "32,5 km/h"},
            {value: "KMH_35", label: "35 km/h"},
            {value: "KMH_37_5", label: "37,5 km/h"},
            {value: "KMH_40", label: "40 km/h"},
            {value: "KMH_42_5", label: "42,5 km/h"},
            {value: "KMH_45", label: "45 km/h"},
        ],
        validationRules: {
            required: {
                value: true,
                message: "Speed is required.",
            }
        }
    },
    {
        inputId: "surfaceTypes",
        inputType: "checkbox",
        inputName: "surfaceTypes",
        inputLabel: "Terrain surfaces",
        inputOptions: [
            {value: "PAVED", label: "Paved"},
            {value: "COBBLESTONES", label: "Cobblestones"},
            {value: "GRAVEL", label: "Gravel"},
            {value: "SAND", label: "Sand"},
            {value: "MUD", label: "Mud"},
            {value: "ROCKY", label: "Rocky"},
        ],
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
]

function CreateBikeRide(){
    const {register, handleSubmit, formState: {errors}} = useForm({mode: "onChange"});
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, toggleLoading] = useState(false);
    const navigate = useNavigate();

    const token = localStorage.getItem("token");

    const buttonProps = {
        type: "submit",
        name: "Add Bike Ride",
        variant: "button-main",
        disabled: loading,
    }

    async function handleFormSubmit(data) {
        setErrorMessage("");
        toggleLoading(true);
        try {
            await axios.post(`${youBikeApiBaseUrl}/bike-rides`,
                {
                    title: data.title,
                    startDateTime: data.startDateTime,
                    description: data.description,
                    distance: data.distance,
                    speed: data.speed,
                    surfaceTypes: data.surfaceTypes ?? [],
                    addressLocation: {
                        countryCode: data.countryCode,
                        city: data.city,
                        street: data.street,
                        houseNumber: data.houseNumber
                    }
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    }
                },
            );
            navigate(navigationUrls.find(url => url.id === 'User content page').url);
        } catch (e) {
            console.error(e);
            setErrorMessage("Error creating the Bike Ride");
        } finally {
            toggleLoading(false);
        }
    }

    return (
        <FormPage
            handleSubmit={handleSubmit}
            handleFormSubmit={handleFormSubmit}
            pageTitle="Add a Bike Ride"
            inputPropsList={inputPropsList}
            buttonProps={buttonProps}
            register={register}
            errors={errors}
            errorMessage={errorMessage}
        />
    )
}

export default CreateBikeRide;