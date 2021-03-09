import ReactDOM from "react-dom";
import Welcome from "./components/welcome/Welcome.js";
import "@fontsource/roboto";
import { createMuiTheme, ThemeProvider } from "@material-ui/core";

const theme = createMuiTheme({
    palette: {
        primary: {
            main: "#F85509"
        },
        secondary: {
            main: "#01ABE0"
        }
    },
    fontFamily: "Roboto"
});

if (location.pathname === "/welcome") {
    ReactDOM.render(
        <ThemeProvider theme={theme}>
            <Welcome />
        </ThemeProvider>,
        document.querySelector("main"));
} else {
    ReactDOM.render(<div>hello again</div>, document.querySelector("main"));
}
