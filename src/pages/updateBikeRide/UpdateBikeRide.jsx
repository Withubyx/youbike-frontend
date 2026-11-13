import FormPage from "../../components/formPage/FormPage.jsx";
import {cityInputProps, countryInputProps, houseNumberInputProps, streetInputProps} from "../../constants/inputProps.js";
import {useForm} from "react-hook-form";
import {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import {youBikeApiBaseUrl} from "../../config/configuration.js";
import navigationUrls from "../../constants/navigationUrls.js";

const inputPropsList = [
    {
        inputId: "title",
        inputType: "text",
        inputName: "title",
        inputLabel: "Title *",
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
        validationRules: {
            maxLength: {
                value: 255,
                message: "Description must be at most 255 characters long.",
            }
        }
    },
    {
        inputId: "distance",
        inputType: "number",
        inputName: "distance",
        inputLabel: "Distance (km) * ",
        validationRules: {
            required: {
                value: true,
                message: "Distance is required."
            },
            valueAsNumber: true,
            min: {
                value: 1,
                message: "Distance must be minimal 1."
            }
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
    countryInputProps,
    cityInputProps,
    streetInputProps,
    houseNumberInputProps,
]

function UpdateBikeRide(){
    const {register, handleSubmit, setValue, formState: {errors}} = useForm({mode: "onChange"});
    const [errorMessage, setErrorMessage] = useState("");
    const [loading, toggleLoading] = useState(false);
    const navigate = useNavigate();

    const token = localStorage.getItem('token');
    const {bikeRideId} = useParams();

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
            await axios.put(`${youBikeApiBaseUrl}/bike-rides/${bikeRideId}`,
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
            navigate(navigationUrls.find(url => url.id === 'User content page').url);
        } catch (e) {
            console.error(e);
            setErrorMessage("Error updating the Bike Ride");
        } finally {
            toggleLoading(false);
        }
    }

    useEffect(() => {
        const controller = new AbortController();

        async function fetchBikeRideData() {
            setErrorMessage("");
            try {
                const result = await axios.get(`${youBikeApiBaseUrl}/bike-rides/${bikeRideId}`,
                    {signal: controller.signal});
                setValue("title", result.data.title);
                setValue("startDateTime", result.data.startDateTime);
                setValue("description", result.data.description);
                setValue("distance", result.data.distance);
                setValue("speed", result.data.speed);
                setValue("surfaceTypes", result.data.surfaceTypes);
                setValue("countryCode", result.data.addressLocation.countryCode);
                setValue("city", result.data.addressLocation.city);
                setValue("street", result.data.addressLocation.street);
                setValue("houseNumber", result.data.addressLocation.houseNumber);
            } catch (e) {
                console.error(e);
                setErrorMessage("Error getting Bike Ride data");
            }
        }
        fetchBikeRideData();

        return function cleanup() {
            controller.abort();
        }
    }, [bikeRideId, setValue]);

    return (
        <FormPage
            handleSubmit={handleSubmit}
            handleFormSubmit={handleFormSubmit}
            pageTitle="Edit the Bike Ride"
            inputPropsList={inputPropsList}
            buttonProps={buttonProps}
            register={register}
            errors={errors}
            errorMessage={errorMessage}
        />
    )
}

export default UpdateBikeRide;