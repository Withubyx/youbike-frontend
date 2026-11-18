import './Bikes.css'
import Button from "../../components/button/Button.jsx";
import navigationUrls from "../../constants/navigationUrls.js";
import {useNavigate} from "react-router-dom";
import bikeTypes from "../../constants/bikeTypes.js";
import {useEffect, useState} from "react";
import axios from "axios";
import {youBikeApiBaseUrl} from "../../config/configuration.js";
import BikeCard from "../../components/bikeCard/BikeCard.jsx";

const selectBikeTypes = [
    {value: "", label: "No Filter Selected"},
        ...bikeTypes
]

function Bikes() {
    const navigate = useNavigate();
    const [bikeType, setBikeType] = useState("");
    const [bikes, setBikes] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

    let bikesShown;
    switch (bikeType) {
        case "":
            bikesShown = bikes;
            break;
        default:
            bikesShown = bikes.filter(bike => bike.bikeType === bikeType);
    }

    useEffect(() => {
        const controller = new AbortController();

        async function fetchBikeData() {
            setErrorMessage("");
            try {
                const result = await axios.get(`${youBikeApiBaseUrl}/bikes`,
                    {signal: controller.signal});
                setBikes(result.data);
        } catch (e) {
                console.error(e);
                setErrorMessage("Error getting bike data");
            }
        }
        fetchBikeData();

        return function cleanup() {
            controller.abort();
        }
    }, []);

    return (
        <main className="outer-container">
            <div className="inner-container-center">
                <div className="h1-wrapper-bikes-page">
                    <div className="h1-wrapper-left-split-bikes-page">
                    </div>
                    <div className="h1-wrapper-right-split-bikes-page">
                        <div className="h1-element-wrapper-bikes-page">
                            <h1>See all Bikes</h1>
                            <div className="h1-button-bikes-page">
                                <Button
                                    type="button"
                                    name="Add a Bike"
                                    variant="button-main"
                                    onClick={() => navigate(navigationUrls.find(url => url.id === 'Create Bike').url)}
                                />
                            </div>
                        </div>
                    </div>
                </div>
                <div className="h2-wrapper-bikes-page">
                    <div className="h2-wrapper-left-split-bikes-page">
                    </div>
                    <div className="h2-wrapper-right-split-bikes-page">
                        <div className="h2-element-wrapper-bikes-page">
                            <h2 className="h2-text-bikes-page">Filter the Bikes by Bike type</h2>
                            <div className="h2-button-bikes-page">
                                <select
                                    className="select-button-bikes-page"
                                    value={bikeType}
                                    onChange={(e) => setBikeType(e.target.value)}
                                >
                                    {selectBikeTypes.map((bikeType) => (
                                        <option key={bikeType.value} value={bikeType.value}>
                                            {bikeType.label}
                                        </option>
                                    ))}
                                </select>
                            </div>
                        </div>
                        {errorMessage && <p className="error-message">{errorMessage}</p>}
                    </div>
                </div>
                <div className="bike-cards-container-bikes-page">
                    {bikesShown.map((bike) => (
                        <BikeCard
                            key={bike.bike_id}
                            bikeId={bike.bike_id}
                            bikeImage={bike.bikeImage.uri}
                            brand={bike.brand}
                            model={bike.model}
                            owner={bike.ownerName}
                        />
                    ))}
                </div>
            </div>
        </main>
    );
}

export default Bikes;