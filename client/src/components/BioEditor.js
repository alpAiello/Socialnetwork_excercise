import React, { Component } from "react";
import axios from "../../src/superAxios";

class BioEditor extends Component {
    constructor(props) {
        super(props);
        this.state = { editMode: false };
    }

    saveBio() {
        this.props.bioEditor(this.state.draft);
        this.setState({ editMode: false });
        axios
            .post("/api/profile/bio", { bio: this.state.draft })
            .then((result) => console.log(result));
    }

    render() {
        const { name, email, bio } = this.props;
        return (
            <div className="BioEditor">
                {this.state.editMode && (
                    <div className="BioEditorEditMode">
                        <label htmlFor="bio">Bio</label>
                        <textarea
                            rows="8"
                            id="bio"
                            name="bio"
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
                    <div className="BioEditorShowMode">
                        <h1>{name}</h1>
                        <p>{email}</p>
                        <p>{bio}</p>
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
