import { Component } from "react";
import Registration from "./Registration";
import SignIn from "./SignIn";
import { HashRouter, Route } from "react-router-dom";

class Welcome extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<>
				<HashRouter>
					<Route exact path="/" component={Registration} />
					<Route path="/login" component={SignIn} />;
				</HashRouter>
			</>
		);
	}
}

export default Welcome;
