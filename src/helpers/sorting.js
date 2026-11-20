export function sortBikes(bikes, bikeType) {
    let bikesShown;
    switch (bikeType) {
        case "":
            bikesShown = bikes;
            break;
        default:
            bikesShown = bikes.filter(bike => bike.bikeType === bikeType);
    }
    return bikesShown;
}

export function sortBikeRides(bikeRides, sortBy) {
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
    return bikeRidesShown;
}

function transformSpeedValue(speedEnum) {
    return speedEnum.substring(4,6)
}
