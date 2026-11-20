import './BikeCard.css';
import {useNavigate} from "react-router-dom";
import Button from "../button/Button.jsx";

function BikeCard({bikeId, bikeImage, brand, model, owner, forUserContentPage, deleteBikeFunction, errorDeleteMessage}) {
    const navigate = useNavigate();

    return (
        <div className="bike-card-button-container">
            <div
                className="bike-card"
                onClick={() => navigate(`/bikes/${bikeId}`)}>
                <img className="bike-image" src={bikeImage} alt="bike image" />
                <div className="bike-info">
                    <p><span>Brand: </span>{brand}</p>
                    <p><span>Model: </span>{model}</p>
                    <p><span>Owner: </span>{owner}</p>
                </div>
            </div>
            {forUserContentPage && (
                <div className="button-edit-bike-on-user-content-page">
                    <Button
                        type="button"
                        name="Edit Bike"
                        variant="button-main"
                        onClick={() => navigate(`/bikes/${bikeId}/update`)}
                    />
                </div>
            )}
            {forUserContentPage && (
                <div className="button-delete-bike-on-user-content-page">
                    <Button
                        type="button"
                        name="Delete Bike"
                        variant="button-main-delete"
                        onClick={() => deleteBikeFunction(bikeId)}
                    />
                </div>
            )}
            {errorDeleteMessage && <p className="error-message">{errorDeleteMessage}</p>}
        </div>
    );
}

export default BikeCard;