import './Home.css'
import BikeDetail from "../../components/bikeDetail/BikeDetail.jsx";
import {useContext, useEffect, useState} from "react";
import {AuthContext} from "../../context/AuthContext.jsx";
import axios from "axios";
import {youBikeApiBaseUrl} from "../../config/configuration.js";
import {saveAs} from 'file-saver';
import MessagePage from "../../components/messagePage/MessagePage.jsx";
import navigationUrls from "../../constants/navigationUrls.js";

function Home() {
    const {user} = useContext(AuthContext);
    const [randomBike, setRandomBike] = useState(null);
    const [disableDownloadBikeImageButton, toggleDisableDownloadBikeImageButton] = useState(false);
    const [errorNextRandomBikeMessage, setErrorNextRandomBikeMessage] = useState("");
    const [errorDownloadBikeImageMessage, setErrorDownloadBikeImageMessage] = useState("");
    const [noBikesInDataBase, toggleNoBikesInDataBase] = useState(false);

    useEffect(() => {
        const controller = new AbortController();

        async function fetchRandomBikeData() {
            setErrorNextRandomBikeMessage("");
            toggleNoBikesInDataBase(false);
            try {
                const result = await axios.get(`${youBikeApiBaseUrl}/bikes/random`,
                    {signal: controller.signal});
                setRandomBike(result.data);
            } catch (e) {
                console.error(e);
                if (e.response && e.response.status === 404) {
                    toggleNoBikesInDataBase(true);
                } else {
                    setErrorNextRandomBikeMessage("Error getting random bike data");
                }
            }
        }
        fetchRandomBikeData();

        return function cleanup() {
            controller.abort();
        }
    }, []);

    async function nextRandomBike() {
        setErrorNextRandomBikeMessage("");
        try {
            const result = await axios.get(`${youBikeApiBaseUrl}/bikes/random`);
                setRandomBike(result.data);
        } catch (e) {
            console.error(e);
            setErrorNextRandomBikeMessage("Error getting random bike data");
        }
    }

    async function downloadBikeImage() {
        toggleDisableDownloadBikeImageButton(true);
        setErrorDownloadBikeImageMessage("");
        try {
            const result = await axios.get(`${youBikeApiBaseUrl}/bikes/${randomBike.bike_id}/image`,
                {responseType: 'blob'});
            saveAs(result.data, randomBike.bikeImage.fileName);
        } catch (e) {
            console.error(e);
            setErrorDownloadBikeImageMessage("Error downloading bike image");
        } finally {
            toggleDisableDownloadBikeImageButton(false);
        }
    }

    return (
        <>
        {noBikesInDataBase
            ? <MessagePage
                title="There are no bikes to show ☹️"
                text="Be the first to contribute a bike... go to "
                linkUrlWithoutBase={navigationUrls.find((item) => item.id === 'Create Bike').url}
                linkText="Add a Bike"
            />
            : <main className="outer-container">
                <div className="inner-container-center">
                    <h1>Discover Bikes & Bike Rides on YouBike</h1>
                    {randomBike && (
                        <BikeDetail
                            user={user}
                            bikeImage={randomBike.bikeImage.uri}
                            bike={randomBike}
                            forHomePage={true}
                            errorMessageNextRandomBike={errorNextRandomBikeMessage}
                            errorMessageDownloadBikeImage={errorDownloadBikeImageMessage}
                            nextRandomBikeFunction={nextRandomBike}
                            downloadBikeImageFunction={downloadBikeImage}
                            disableDownloadBikeImageButton={disableDownloadBikeImageButton}
                    />
                    )}
                </div>
            </main>
            }
        </>
    )
}

export default Home