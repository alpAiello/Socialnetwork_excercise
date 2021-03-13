import { Component } from "react";
import axios from "../../src/superAxios";
class PicUploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
        };
    }
    async uploadPicture() {
        const picture = new FormData();
        picture.append("file", this.state.file);
        console.log("picture", picture);
        const result = await axios.post("/api/profile/upload-picture", picture);
        console.log("result", result);
        this.props.uploadDoneHandler(result.data.profile_picture_url);
    }
    render() {
        return (
            <div className="PicUploader">
                <input
                    accept="image/*"
                    type="file"
                    className="uploader"
                    onChange={(event) =>
                        this.setState({ file: event.target.files[0] })
                    }
                />
                <button onClick={() => this.uploadPicture()}>Upload</button>
                <button onClick={() => this.props.closeHandler()}>x</button>
            </div>
        );
    }
}

export default PicUploader;
