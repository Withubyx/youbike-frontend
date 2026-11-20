import './UserContentPage.css'
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import Button from "../../components/button/Button.jsx";
import navigationUrls from "../../constants/navigationUrls.js";
import {useNavigate} from "react-router-dom";
import BikeCard from "../../components/bikeCard/BikeCard.jsx";
import BikeRideTable from "../../components/bikeRideTable/BikeRideTable.jsx";
import {sortBikeRides} from "../../helpers/sorting.js";
import axios from "axios";
import {youBikeApiBaseUrl} from "../../config/configuration.js";

function UserContentPage() {
    const {user} = useContext(AuthContext);
    const navigate = useNavigate();
    const [bikes, setBikes] = useState([]);
    const [sortBy, setSortBy] = useState("startDateTime");
    const [bikeRides, setBikeRides] = useState([]);
    const [errorBikeMessage, setErrorBikeMessage] = useState("")
    const [errorBikeRideMessage, setErrorBikeRideMessage] = useState("")
    const [errorDeleteBikeMessage, setErrorDeleteBikeMessage] = useState("")
    const [errorDeleteBikeRideMessage, setErrorDeleteBikeRideMessage] = useState("")
    const [deleteBikeSignal, toggleDeleteBikeSignal] = useState(false);
    const [deleteBikeRideSignal, toggleDeleteBikeRideSignal] = useState(false);

    const token = localStorage.getItem('token');
    const bikeRideShown = sortBikeRides(bikeRides, sortBy);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchBikeData() {
            setErrorBikeMessage("");
            try {
                const result = await axios.get(`${youBikeApiBaseUrl}/bikes/cyclists/${user.id}`,
                    {signal: controller.signal});
                setBikes(result.data);
            } catch (e) {
                console.error(e);
                setErrorBikeMessage("Error getting bike data");
            }
        }
        fetchBikeData();

        return function cleanup() {
            controller.abort();
        }
    }, [deleteBikeSignal, user.id]);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchBikeRideData() {
            setErrorBikeRideMessage("");
            try {
                const result = await axios.get(`${youBikeApiBaseUrl}/bike-rides/organizers/${user.id}/start-date-time-order`,
                    {signal: controller.signal});
                setBikeRides(result.data);
            } catch (e) {
                console.error(e);
                setErrorBikeRideMessage("Error getting bike ride data");
            }
        }
        fetchBikeRideData();

        return function cleanup() {
            controller.abort();
        }
    }, [deleteBikeRideSignal, user.id]);

    async function deleteBike(bikeId) {
        setErrorDeleteBikeMessage("")
        try{
            await axios.delete(`${youBikeApiBaseUrl}/bikes/${bikeId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            toggleDeleteBikeSignal(!deleteBikeSignal);
        } catch (e) {
            console.error(e);
            setErrorDeleteBikeMessage("Error deleting bike data");
        }
    }

    async function deleteBikeRide(bikeRideId) {
        setErrorDeleteBikeRideMessage("")
        try{
            await axios.delete(`${youBikeApiBaseUrl}/bike-rides/${bikeRideId}`,
                {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `Bearer ${token}`,
                    }
                }
            );
            toggleDeleteBikeRideSignal(!deleteBikeRideSignal);
        } catch (e) {
            console.error(e);
            setErrorDeleteBikeRideMessage("Error deleting bike data");
        }
    }

    return (
        <main className="outer-container">
            <div className="inner-container-center">
                {user.userRole === "ROLE_CYCLIST"
                    ? <h1 className="h1-text-user-content-page">Your Bikes & Bike Rides</h1>
                    : <h1 className="h1-text-user-content-page">Your Bike Rides</h1>
                }
                {user.userRole === "ROLE_CYCLIST" && (
                <div>
                    <div className="h2-container-user-content-page">
                        <div className="h2-container-left-split-user-content-page">
                        </div>
                        <div className="h2-container-right-split-user-content-page">
                            <div className="h2-first-element-wrapper-user-content-page">
                                <h2 className="h2-text-user-content-page">Your Bikes</h2>
                                <div className="h2-first-button-user-content-page">
                                    <Button
                                        type="button"
                                        name="Add a Bike"
                                        variant="button-main"
                                        onClick={() => navigate(navigationUrls.find(url => url.id === 'Create Bike').url)}
                                    />
                                </div>
                            </div>
                            {bikes.length === 0 && (<p className="info-message first-info-message-user-content-page">You have no Bikes ☹️</p>)}
                            {errorBikeMessage && <p className="error-message">{errorBikeMessage}</p>}
                        </div>
                    </div>
                    <div className="bike-cards-container-user-content-page">
                        {bikes.map((bike) => (
                            <BikeCard
                                key={bike.bike_id}
                                bikeId={bike.bike_id}
                                bikeImage={bike.bikeImage.uri}
                                brand={bike.brand}
                                model={bike.model}
                                owner={bike.ownerName}
                                forUserContentPage={true}
                                deleteBikeFunction={deleteBike}
                                errorDeleteMessage={errorDeleteBikeMessage}
                            />
                        ))}
                    </div>
                </div>
                )}
                <div className="h2-container-user-content-page">
                    <div className="h2-container-left-split-user-content-page">
                    </div>
                    <div className="h2-container-right-split-user-content-page">
                        <div className="h2-second-element-wrapper-user-content-page">
                            <h2 className="h2-text-user-content-page">Your Bike Rides</h2>
                            <div className="h2-second-button-user-content-page">
                                <Button
                                    type="button"
                                    name="Add a Bike Ride"
                                    variant="button-main"
                                    onClick={() => navigate(navigationUrls.find(url => url.id === 'Create Bike Ride').url)}
                                />
                            </div>
                        </div>
                        {bikeRides.length === 0 && (<p className="info-message second-info-message-user-content-page">You have no Bike Rides ☹️</p>)}
                        {errorBikeRideMessage && <p className="error-message">{errorBikeRideMessage}</p>}
                    </div>
                </div>
                {bikeRideShown.length !== 0 && (
                <div className="bike-rides-table-user-content-page">
                    <BikeRideTable
                        bikeRides={bikeRideShown}
                        sortBy={sortBy}
                        setSortBy={setSortBy}
                        forUserContentPage={true}
                        deleteBikeRideFunction={deleteBikeRide}
                    />
                </div>
                )}
                {errorDeleteBikeRideMessage && <p className="error-message">{errorDeleteBikeRideMessage}</p>}
            </div>
        </main>
    )
}

export default UserContentPage