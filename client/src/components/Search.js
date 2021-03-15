import React, { useEffect, useState } from "react";
import axios from "../superAxios";
import { Link, BrowserRouter } from "react-router-dom";

function Search() {
    const [users, setUsers] = useState([]);
    const [query, setQuery] = useState("");

    const getUserWithQuery = (query) => {
        let showResult = true;
        axios.get("/api/search/?search=" + query).then((result) => {
            const userArray = result.data.result;
            console.log("result", userArray);
            if (showResult) {
                setUsers(userArray);
            }
            return () => {
                showResult = false;
            };
        });
    };

    useEffect(() => {
        getUserWithQuery(query);
    }, [query]);

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
            <div className="userList">
                <p>Firstname</p>
                <p>Lastname</p>
                <p>Bio</p>
                <p>Link</p>
            </div>
            {users.map((user) => {
                return (
                    <div key={user.id} className="userList">
                        <p>{user.firstname}</p>
                        <p>{user.lastname}</p>
                        <p>{user.bio}</p>
                        <Link to={{ pathname: "/user/" + user.id }}>goto</Link>
                    </div>
                );
            })}
        </div>
    );
}

export default Search;
