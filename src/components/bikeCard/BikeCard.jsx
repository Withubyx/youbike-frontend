import './BikeCard.css';
import {useNavigate} from "react-router-dom";

function BikeCard({bikeId, bikeImage, brand, model, owner}) {
    const navigate = useNavigate();

    return (
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
    );
}

export default BikeCard;