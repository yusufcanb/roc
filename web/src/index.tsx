import React from 'react';
import ReactDOM from 'react-dom';

import App from './App';

import {StoreContext, RootStore} from "core/store";
import {createMuiTheme, MuiThemeProvider} from "@material-ui/core";

import "./styles/index.css";

const theme = createMuiTheme({
    palette: {
        primary: {
            light: "#444",
            main: "#111",
            dark: "#222",
            contrastText: "#fff"
        },
        secondary: {
            light: "#68C6A1",
            main: "#4FBD91",
            dark: "#35B381",
            contrastText: "#fff"
        },
    },
    typography: {
        fontSize: 11,
        fontFamily: "OCRA Alternate"
    }
});

ReactDOM.render(
    <StoreContext.Provider value={new RootStore()}>
        <MuiThemeProvider theme={theme}>
            <App/>
        </MuiThemeProvider>
    </StoreContext.Provider>,
    document.getElementById('root')
);
