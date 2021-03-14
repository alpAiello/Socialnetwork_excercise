import { Component } from "react";
import ProfilePic from "./ProfilePic";
import BioEditor from "./BioEditor";

class Profile extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className="Profile">
                {" "}
                <ProfilePic
                    profile_picture_url={this.props.profile_picture_url}
                />
                <BioEditor
                    bio={this.props.bio}
                    bioEditor={this.props.bioEditor}
                    name={this.props.profileName}
                    email={this.props.email}
                />
            </div>
        );
    }
}

export default Profile;
