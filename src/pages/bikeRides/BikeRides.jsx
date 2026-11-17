import './BikeRides.css'
import Button from "../../components/button/Button.jsx";
import navigationUrls from "../../constants/navigationUrls.js";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {youBikeApiBaseUrl} from "../../config/configuration.js";

function BikeRides() {
    const navigate = useNavigate();
    // const [sortBy, setSortBy] = useState("");
    const [bikeRides, setBikeRides] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        async function fetchBikeRideData() {
            setErrorMessage("");
            try {
                const result = await axios.get(`${youBikeApiBaseUrl}/bike-rides/start-date-time-order`,
                    {signal: controller.signal});
                setBikeRides(result.data);
        } catch (e) {
                console.error(e);
                setErrorMessage("Error getting bike ride data");
            }
        }
        fetchBikeRideData();

        return function cleanup() {
            controller.abort();
        }
    }, []);

    return (
        <main className="outer-container">
            <div className="inner-container-center">
                <div className="h1-wrapper-bike-rides-page">
                    <div className="h1-wrapper-left-split-bike-rides-page">
                    </div>
                    <div className="h1-wrapper-right-split-bike-rides-page">
                        <div className="h1-element-wrapper-bike-rides-page">
                            <h1>Let's Ride Together</h1>
                            <div className="h1-button-bike-rides-page">
                                <Button
                                    type="button"
                                    name="Add a Bike Ride"
                                    variant="button-main"
                                    onClick={() => navigate(navigationUrls.find(url => url.id === 'Create Bike Ride').url)}
                                />
                            </div>
                        </div>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </div>
                </div>
            </div>
        </main>
    );
}

export default BikeRides;