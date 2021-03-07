import ReactDOM from "react-dom";
import Welcome from "./components/welcome/welcome.js";

if (location.pathname == "/welcome") {
	ReactDOM.render(<Welcome />, document.querySelector("main"));
} else {
	ReactDOM.render(<div>hello again</div>, document.querySelector("main"));
}
