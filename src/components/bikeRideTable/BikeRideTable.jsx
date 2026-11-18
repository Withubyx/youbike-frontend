import './BikeRideTable.css';
import Button from "../button/Button.jsx";
import {transformDateTimeToScreenFormat, transformDistanceToScreenFormat, transformSpeedEnumToScreenFormat} from "../../helpers/transformToScreenFormat.js";
import {useNavigate} from "react-router-dom";

function BikeRideTable({bikeRides, sortBy, setSortBy}) {
    const navigate = useNavigate();

    return (
         <table className="bike-ride-table">
             <thead>
                <tr>
                    <th className="header-cell">
                        <div className="data-cell-flex-box">
                            Title
                        </div>
                    </th>
                    <th className={sortBy === "startDateTime" ? "sorted-header-cell hover-bike-ride-table start-date-time-column" : "header-cell hover-bike-ride-table start-date-time-column"}>
                        <div className="data-cell-flex-box">
                            <Button
                                type="button"
                                name={"Start Date & Time \u2191"}
                                onClick={() => setSortBy("startDateTime")}
                                variant="button-table-header"
                            />
                        </div>
                    </th>
                    <th className={sortBy === "city" ? "sorted-header-cell hover-bike-ride-table city-column" : "header-cell hover-bike-ride-table city-column"}>
                        <div className="data-cell-flex-box">
                            <Button
                                type="button"
                                name={"City \u2191"}
                                onClick={() => setSortBy("city")}
                                variant="button-table-header"
                            />
                        </div>
                    </th>
                    <th className={sortBy === "distance" ? "sorted-header-cell hover-bike-ride-table distance-column" : "header-cell hover-bike-ride-table distance-column"}>
                        <div className="data-cell-flex-box">
                            <Button
                                type="button"
                                name={"Distance \u2191"}
                                onClick={() => setSortBy("distance")}
                                variant="button-table-header"
                            />
                        </div>
                    </th>
                    <th className={sortBy === "speed" ? "sorted-header-cell hover-bike-ride-table speed-column" : "header-cell hover-bike-ride-table speed-column"}>
                        <div className="data-cell-flex-box">
                            <Button
                                type="button"
                                name={"Speed \u2191"}
                                onClick={() => setSortBy("speed")}
                                variant="button-table-header"
                            />
                        </div>
                    </th>
                </tr>
             </thead>
             <tbody>
             {bikeRides.map((bikeRide) => (
                 <tr key={bikeRide.bike_ride_id}>
                    <td className={sortBy === "title" ? "sorted-data-cell hover-bike-ride-table" : "data-cell hover-bike-ride-table"}>
                        <div className="data-cell-flex-box">
                            <Button
                                type="button"
                                name={`\u279C ${bikeRide.title}`}
                                onClick={() => navigate(`/bike-rides/${bikeRide.bike_ride_id}`)}
                                variant="button-table-data-cell"
                            />
                        </div>
                    </td>
                     <td className={sortBy === "startDateTime" ? "sorted-data-cell start-date-time-column" : "data-cell start-date-time-column"}>
                         <div className="data-cell-flex-box">
                            {transformDateTimeToScreenFormat(bikeRide.startDateTime)}
                         </div>
                     </td>
                     <td className={sortBy === "city" ? "sorted-data-cell city-column" : "data-cell city-column"}>
                         <div className="data-cell-flex-box">
                            {bikeRide.addressLocation.city}
                         </div>
                     </td>
                     <td className={sortBy === "distance" ? "sorted-data-cell distance-column" : "data-cell distance-column"}>
                         <div className="data-cell-flex-box">
                             {transformDistanceToScreenFormat(bikeRide.distance)}
                         </div>
                     </td>
                     <td className={sortBy === "speed" ? "sorted-data-cell speed-column" : "data-cell speed-column"}>
                         <div className="data-cell-flex-box">
                            {transformSpeedEnumToScreenFormat(bikeRide.speed)}
                         </div>
                     </td>
                 </tr>
             ))}
             </tbody>
         </table>
    );
}

export default BikeRideTable;