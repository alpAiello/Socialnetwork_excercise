import { Component } from "react";
import axios from "../superAxios";
import ProfilePic from "./ProfilePic";
import PicUploader from "./PicUploader";
import Profile from "./Profile";
import OtherProfile from "./OtherProfile";
import FindPeople from "./FindPeople";
import { BrowserRouter as Router, Route } from "react-router-dom";

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
    render() {
        const {
            profile_picture_url,
            bio,
            firstname,
            lastname,
            uploaderVisible,
            email,
        } = this.state;
        return (
            <div className="App">
                <ProfilePic
                    profile_picture_url={profile_picture_url}
                    visibilityHandler={() =>
                        this.setState({ uploaderVisible: true })
                    }
                />
                {uploaderVisible && (
                    <PicUploader
                        uploadDoneHandler={(newPictureURL) =>
                            this.setState({
                                ...this.state,
                                profile_picture_url: newPictureURL,
                                uploaderVisible: false,
                            })
                        }
                        closeHandler={() =>
                            this.setState({ uploaderVisible: false })
                        }
                    />
                )}
                <Router>
                    <Route path={"/user-search"} exact component={FindPeople} />
                    <Route
                        path={"/"}
                        exact
                        render={() => (
                            <Profile
                                profile_picture_url={profile_picture_url}
                                profileName={firstname + " " + lastname}
                                email={email}
                                bio={bio}
                                bioEditor={(editedBioInfo) => {
                                    this.setState({ bio: editedBioInfo });
                                }}
                            />
                        )}
                    />
                    <Route path={"/user/:id"} component={OtherProfile} />
                </Router>
            </div>
        );
    }
}

export default App;
