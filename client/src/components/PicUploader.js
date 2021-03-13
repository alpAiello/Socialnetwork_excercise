import { Component } from "react";
import axios from "../../src/superAxios";
class PicUploader extends Component {
    constructor(props) {
        super(props);
        this.state = {
            file: null,
        };
    }
    uploadPicture() {
        const picture = new FormData();
        picture.append("file", this.state.file);
        console.log("picture", picture);

        axios
            .post("/api/profile/upload-picture", picture)
            .then((result) => console.log("result", result.data));
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
            </div>
        );
    }
}

export default PicUploader;
