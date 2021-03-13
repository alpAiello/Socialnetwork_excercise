import { Component } from "react";
import axios from "../../src/superAxios";

class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = { editMode: false };
    }

    saveBio() {
        this.props.bioEditor(this.state.draft);
        this.setState({ editMode: false, draft: "" });
        axios
            .post("/api/profile/bio", { bio: this.state.draft })
            .then((result) => console.log(result));
    }

    render() {
        return (
            <div>
                {this.state.editMode && (
                    <div>
                        <input
                            name="bio"
                            type="text"
                            onChange={(e) =>
                                this.setState({ draft: e.target.value })
                            }
                            value={this.state.draft || this.props.bio} //TODO this must work without refilling after emptying
                        />
                        <button
                            onClick={() => {
                                this.saveBio();
                            }}
                        >
                            save
                        </button>
                    </div>
                )}{" "}
                {!this.state.editMode && (
                    <div>
                        <p>{this.props.bio}</p>
                        <button
                            onClick={() => this.setState({ editMode: true })}
                        >
                            {this.props.bio ? "edit" : "add"}
                        </button>
                    </div>
                )}
            </div>
        );
    }
}

export default BioEditor;
