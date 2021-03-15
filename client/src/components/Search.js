import React, { useEffect, useState } from "react";
import axios from "../superAxios";

function Search() {
    const [users, setUsers] = useState([]);
    const [query, setQuery] = useState("");

    const getUserWithQuery = (query) => {
        axios.get("/api/search/?search=" + query).then((result) => {
            const userArray = result.data.result;
            console.log("result", userArray);
            setUsers(userArray);
        });
    };

    useEffect(() => getUserWithQuery(query), [query]);

    return (
        <div>
            <label htmlFor="search">Search People</label>
            <input
                id="search"
                type="text"
                onChange={(event) => {
                    setQuery(event.target.value);
                }}
            />
            <table>
                <thead>
                    <tr>
                        <th>firstname</th>
                        <th>lastname</th>
                        <th>bio</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user) => {
                        return (
                            <tr key={user.id}>
                                <td>{user.firstname}</td>
                                <td>{user.lastname}</td>
                                <td>{user.bio}</td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>
        </div>
    );
}

export default Search;
