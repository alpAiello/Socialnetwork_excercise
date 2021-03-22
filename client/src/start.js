import ReactDOM from "react-dom";
import Welcome from "./components/welcome/Welcome.js";
import App from "./components/App.js";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";
import { createStore, applyMiddleware } from "redux";
import { Provider } from "react-redux";
import reduxPromise from "redux-promise";
import reducer from "./reducer";
import { composeWithDevTools } from "redux-devtools-extension";
import { io } from "socket.io-client";
import { init, socket } from "./init_socket";

const store = createStore(
    reducer,
    composeWithDevTools(applyMiddleware(reduxPromise))
);

init(store);

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#F85509",
        },
        secondary: {
            main: "#01ABE0",
        },
    },
});

if (location.pathname === "/welcome") {
    ReactDOM.render(
        <ThemeProvider theme={theme}>
            <Welcome />
        </ThemeProvider>,
        document.querySelector("main")
    );
} else {
    let elem = (
        <ThemeProvider theme={theme}>
            <Provider store={store}>
                <App />
            </Provider>
        </ThemeProvider>
    );
    ReactDOM.render(elem, document.querySelector("main"));
}
