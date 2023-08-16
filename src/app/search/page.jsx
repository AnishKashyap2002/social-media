"use client";

import React, { useState } from "react";
import SearchBar from "@/components/SearchBar";
import UsersFeed from "@/components/UsersFeed";

const Searchpage = () => {
    const [searchText, setSearchText] = useState("");

    const [loading, setLoading] = useState(false);

    const [users, setUsers] = useState([]);

    const handleClick = (e) => {
        e.preventDefault();

        setLoading(true);
        const getUsers = async () => {
            try {
                const response = await fetch("/api/search/", {
                    method: "post",
                    headers: {
                        "Content-Type": "application/json",
                    },
                    body: JSON.stringify({
                        search: searchText,
                    }),
                }).then(async (result) => {
                    const newUsers = await result.json();
                    console.log(newUsers);
                    setUsers(newUsers);
                });
            } catch (error) {
                console.log("error", error);
            } finally {
                setLoading(false);
            }
        };
        getUsers();
    };

    return (
        <>
            <SearchBar
                searchText={searchText}
                handleClick={handleClick}
                setSearchText={setSearchText}
            />
            {loading ? (
                <div
                    className="flex items-center justify-center
                font-bold font-xl text-black z-20"
                >
                    Please wait...
                </div>
            ) : (
                <UsersFeed users={users} />
            )}
        </>
    );
};

export default Searchpage;
