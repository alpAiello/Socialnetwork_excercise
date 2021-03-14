import React, { Component, useState } from "react";

function FindPeople() {
    const [search, setSearch] = useState("");
    return (
        <div>
            <label htmlFor="search">Search People</label>
            <input
                id="search"
                type="text"
                onChange={(search) => {
                    setSearch(search.target.value);
                    console.log(search.target.value);
                }}
            />
        </div>
    );
}

export default FindPeople;
