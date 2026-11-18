export function transformDateTimeToScreenFormat(dateTime) {
    let screenDateTime;
    screenDateTime = new Date(dateTime).toLocaleString("en-GB", {
        day: "numeric",
        month: "long",
        year: "numeric",
        hour: "2-digit",
        minute: "2-digit"
    });
    return screenDateTime;
}

export function transformDistanceToScreenFormat(distance) {
    return distance + " km";
}

export function transformSpeedEnumToScreenFormat(speedEnum) {
    let speedScreenFormat;
    switch (speedEnum) {
        case "KMH_15":
            speedScreenFormat = "15 km/h"
            break;
        case "KMH_17_5":
            speedScreenFormat = "17,5 km/h"
            break;
        case "KMH_20":
            speedScreenFormat = "20 km/h"
            break;
        case "KMH_22_5":
            speedScreenFormat = "22,5 km/h"
            break;
        case "KMH_25":
            speedScreenFormat = "25 km/h"
            break;
        case "KMH_27_5":
            speedScreenFormat = "27,5 km/h"
            break;
        case "KMH_30":
            speedScreenFormat = "30 km/h"
            break;
        case "KMH_32_5":
            speedScreenFormat = "32,5 km/h"
            break;
        case "KMH_35":
            speedScreenFormat = "35 km/h"
            break;
        case "KMH_37_5":
            speedScreenFormat = "37,5 km/h"
            break;
        case "KMH_40":
            speedScreenFormat = "40 km/h"
            break;
        case "KMH_42_5":
            speedScreenFormat = "42,5 km/h"
            break;
        case "KMH_45":
            speedScreenFormat = "45 km/h"
            break;
    }
    return speedScreenFormat;
}
