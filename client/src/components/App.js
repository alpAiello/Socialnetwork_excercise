import { Component } from "react";
import axios from "../superAxios";
import Profile from "./Profile";
import PicUploader from "./PicUploader";

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { uploaderVisible: false };
    }
    componentDidMount() {
        axios.get("/api/profile/user").then((result) => {
            console.log(result.data);
            const user = result.data;
            this.setState({ ...this.state, ...user });
        });
    }

    uploadHandler() {}

    render() {
        const { email, profilePictureURL } = this.state;
        return (
            <div>
                <Profile
                    profilePictureURL={email}
                    visibilityHandler={() =>
                        this.setState({ uploaderVisible: true })
                    }
                />
                {this.state.uploaderVisible && <PicUploader />}
            </div>
        );
    }
}

export default App;
