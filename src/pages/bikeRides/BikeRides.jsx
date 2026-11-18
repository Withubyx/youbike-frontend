import './BikeRides.css'
import Button from "../../components/button/Button.jsx";
import navigationUrls from "../../constants/navigationUrls.js";
import {useNavigate} from "react-router-dom";
import {useEffect, useState} from "react";
import axios from "axios";
import {youBikeApiBaseUrl} from "../../config/configuration.js";
import BikeRideTable from "../../components/bikeRideTable/BikeRideTable.jsx";

function BikeRides() {
    const navigate = useNavigate();
    const [sortBy, setSortBy] = useState("startDateTime");
    const [bikeRides, setBikeRides] = useState([]);
    const [errorMessage, setErrorMessage] = useState("")

    let bikeRidesShown;
    switch (sortBy) {
        case "startDateTime":
            bikeRidesShown = bikeRides
            break;
        case "city":
            bikeRidesShown = bikeRides.toSorted((a, b) => a.addressLocation.city.localeCompare(b.addressLocation.city));
            break;
        case "distance":
            bikeRidesShown = bikeRides.toSorted((a, b) => a.distance - b.distance);
            break;
        case "speed":
            bikeRidesShown = bikeRides.toSorted((a, b) => transformSpeedValue(a.speed).localeCompare(transformSpeedValue(b.speed)));
            break;
    }

    function transformSpeedValue(speedEnum) {
        return speedEnum.substring(4,6)
    }

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
                <div className="bike-rides-table-bike-rides-page">
                    <BikeRideTable
                        bikeRides={bikeRidesShown}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                    />
                </div>
            </div>
        </main>
    );
}

export default BikeRides;