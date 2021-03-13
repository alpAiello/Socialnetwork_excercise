import { Component } from "react";
import axios from "../superAxios";
import ProfilePic from "./ProfilePic";
import PicUploader from "./PicUploader";
import Profile from "./Profile";

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
                <Profile
                    profile_picture_url={profile_picture_url}
                    profileName={firstname + " " + lastname}
                    bio={bio}
                    bioEditor={(editedBioInfo) => {
                        this.setState({ bio: editedBioInfo });
                    }}
                />
            </div>
        );
    }
}

export default App;
