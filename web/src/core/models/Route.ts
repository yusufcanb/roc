import React from "react";

export interface Route {
    displayName: string;
    path: string;
    component: React.ComponentType<any>;
    isExact?: boolean;
    children?: Array<Route>;
}
