import { Component } from "react";
import Registration from "./Registration";
import SignIn from "./SignIn";
import ResetPassword from "./ResetPassword";
import { Grid } from "@material-ui/core";
import { HashRouter, Route } from "react-router-dom";

class Welcome extends Component {
	constructor(props) {
		super(props);
	}

	render() {
		return (
			<div className="Welcome">
				<Grid
					container
					direction="row"
					justify="center"
					alignItems="center"
				>
					<HashRouter>
						<Route exact path="/" component={Registration} />
						<Route path="/login" component={SignIn} />
						<Route
							path="/reset-password"
							component={ResetPassword}
						/>
					</HashRouter>
				</Grid>
			</div>
		);
	}
}

export default Welcome;
