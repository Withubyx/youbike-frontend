import './BikeRideTable.css';
import Button from "../button/Button.jsx";
import {transformDateTimeToScreenFormat, transformDistanceToScreenFormat, transformSpeedEnumToScreenFormat} from "../../helpers/transformToScreenFormat.js";
import {useNavigate} from "react-router-dom";

function BikeRideTable({bikeRides, sortBy, setSortBy, forUserContentPage, deleteBikeRideFunction}) {
    const navigate = useNavigate();

    return (
         <table className="bike-ride-table">
             <thead>
                <tr>
                    {forUserContentPage && (
                        <th className="header-cell delete-column">
                            Delete
                        </th>
                    )}
                    {forUserContentPage && (
                        <th className="header-cell edit-column">
                            Edit
                        </th>
                    )}
                    <th className="header-cell title-column">
                        Title
                    </th>
                    <th className={sortBy === "startDateTime" ? "sorted-header-cell hover-bike-ride-table start-date-time-column" : "header-cell hover-bike-ride-table start-date-time-column"}>
                        <Button
                            type="button"
                            name={"Start Date & Time \u2191"}
                            onClick={() => setSortBy("startDateTime")}
                            variant="button-table-header"
                        />
                    </th>
                    <th className={sortBy === "city" ? "sorted-header-cell hover-bike-ride-table city-column" : "header-cell hover-bike-ride-table city-column"}>
                        <Button
                            type="button"
                            name={"City \u2191"}
                            onClick={() => setSortBy("city")}
                            variant="button-table-header"
                        />
                    </th>
                    <th className={sortBy === "distance" ? "sorted-header-cell hover-bike-ride-table distance-column" : "header-cell hover-bike-ride-table distance-column"}>
                        <Button
                            type="button"
                            name={"Distance \u2191"}
                            onClick={() => setSortBy("distance")}
                            variant="button-table-header"
                        />
                    </th>
                    <th className={sortBy === "speed" ? "sorted-header-cell hover-bike-ride-table speed-column" : "header-cell hover-bike-ride-table speed-column"}>
                        <Button
                            type="button"
                            name={"Speed \u2191"}
                            onClick={() => setSortBy("speed")}
                            variant="button-table-header"
                        />
                    </th>
                </tr>
             </thead>
             <tbody>
             {bikeRides.map((bikeRide) => (
                 <tr key={bikeRide.bike_ride_id}>
                     {forUserContentPage && (
                         <td className="data-cell delete-column">
                             <Button
                                 type="button"
                                 name="Delete"
                                 onClick={() => deleteBikeRideFunction(bikeRide.bike_ride_id)}
                                 variant="button-main-delete-small"
                             />
                         </td>
                         )}
                     {forUserContentPage && (
                         <td className="data-cell edit-column">
                             <Button
                                 type="button"
                                 name="Edit"
                                 onClick={() => navigate(`/bike-rides/${bikeRide.bike_ride_id}/update`)}
                                 variant="button-main-small"
                             />
                         </td>
                     )}
                    <td className={sortBy === "title" ? "sorted-data-cell hover-bike-ride-table title-column" : "data-cell hover-bike-ride-table title-column"}>
                        <Button
                            type="button"
                            name={`\u279C ${bikeRide.title}`}
                            onClick={() => navigate(`/bike-rides/${bikeRide.bike_ride_id}`)}
                            variant="button-table-data-cell"
                        />
                    </td>
                     <td className={sortBy === "startDateTime" ? "sorted-data-cell start-date-time-column" : "data-cell start-date-time-column"}>
                        {transformDateTimeToScreenFormat(bikeRide.startDateTime)}
                     </td>
                     <td className={sortBy === "city" ? "sorted-data-cell city-column" : "data-cell city-column"}>
                        {bikeRide.addressLocation.city}
                     </td>
                     <td className={sortBy === "distance" ? "sorted-data-cell distance-column" : "data-cell distance-column"}>
                         {transformDistanceToScreenFormat(bikeRide.distance)}
                     </td>
                     <td className={sortBy === "speed" ? "sorted-data-cell speed-column" : "data-cell speed-column"}>
                        {transformSpeedEnumToScreenFormat(bikeRide.speed)}
                     </td>
                 </tr>
             ))}
             </tbody>
         </table>
    );
}

export default BikeRideTable;