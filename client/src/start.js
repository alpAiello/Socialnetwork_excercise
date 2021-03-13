import ReactDOM from "react-dom";
import Welcome from "./components/welcome/Welcome.js";
import App from "./components/App.js";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

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
    ReactDOM.render(<App />, document.querySelector("main"));
}
