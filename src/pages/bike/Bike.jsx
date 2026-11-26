import './Bike.css'
import {useParams} from "react-router-dom";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import axios from "axios";
import {youBikeApiBaseUrl} from "../../config/configuration.js";
import BikeDetail from "../../components/bikeDetail/BikeDetail.jsx";

function Bike() {
    const {user} = useContext(AuthContext);
    const {bikeId} = useParams();
    const [bike, setBike] = useState(null);
    const [errorMessage, setErrorMessage] = useState("");

    useEffect(() => {
        const controller = new AbortController();

        async function fetchBikeData() {
            setErrorMessage("")
            try {
                const result = await axios.get(`${youBikeApiBaseUrl}/bikes/${bikeId}`,
                    {signal: controller.signal});
                setBike(result.data)
            } catch (e) {
                console.error(e);
                setErrorMessage("Error getting bike data")
            }
        }
        fetchBikeData()

        return function cleanup() {
            controller.abort();
        }
    },[bikeId]);

    return (
        <main className="outer-container">
            <div className="inner-container-center">
                {bike
                    ? <>
                    <h1 className="h1-bike-page">{bike.ownerName}'s bike</h1>
                    <BikeDetail
                        user={user}
                        bikeImage={bike.bikeImage.uri}
                        bike={bike}
                        forBikePage={true}
                    />
                    </>
                : <h1 className="h1-bike-page">Getting Bike Data...</h1>
                }
                {errorMessage && <p className="error-message">{errorMessage}</p>}
            </div>
        </main>
    )
}

export default Bike;