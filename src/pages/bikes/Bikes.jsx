import './Bikes.css'
import Button from "../../components/button/Button.jsx";
import navigationUrls from "../../constants/navigationUrls.js";
import {useNavigate} from "react-router-dom";
import bikeTypes from "../../constants/bikeTypes.js";
import {useEffect, useState} from "react";
import axios from "axios";
import {youBikeApiBaseUrl} from "../../config/configuration.js";

const selectBikeTypes = [
    {value: "", label: "No Filter Selected"},
        ...bikeTypes
]

function Bikes() {
    const navigate = useNavigate();
    const [bikeType, setBikeType] = useState("");
    const [bikes, setBikes] = useState([]);
    const [errorMessage, setErrorMessage] = useState("");

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
                setErrorMessage("Error getting bike data")
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
                <div className="h1-wrapper">
                    <div className="h1-wrapper-left-split">
                    </div>
                    <div className="h1-wrapper-right-split">
                        <div className="h1-element-wrapper">
                            <h1>See all Bikes</h1>
                            <div className="h1-button">
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
                <div className="h2-wrapper">
                    <div className="h2-wrapper-left-split">
                    </div>
                    <div className="h2-wrapper-right-split">
                        <div className="h2-element-wrapper">
                            <h2 className="h2-text">Filter the Bikes by Bike type</h2>
                            <div className="h2-button">
                                <select
                                    className="select-button"
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
            </div>
        </main>
    );
}

export default Bikes;