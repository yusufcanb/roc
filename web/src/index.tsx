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
            light: "#00C0B5",
            main: "#00C0B5",
            dark: "#00C0B5",
            contrastText: "#000"
        }
    },
    typography: {
        fontSize: 12,
        fontFamily: "OCRA"
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
