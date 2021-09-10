import {Route} from "react-router-dom";
import {LocationWithDisplayName} from "../utils/location";

/**
 *
 * @param routes All routes of application
 * @param path Current path
 */
export function getLocationByPathString(routes: Array<Route>, path: string): Array<LocationWithDisplayName> {
    return [new LocationWithDisplayName("Environment #1")];
}
