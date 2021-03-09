import { Component } from "react";
import Registration from "./Registration";
import SignIn from "./SignIn";

class Welcome extends Component {
    constructor (props) {super(props);}

    render () {
        return (<>
                {/*<Registration/>*/}
                <SignIn/>;
            </>
        )
            ;
    }
}

export default Welcome;
