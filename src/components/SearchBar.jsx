"use client";

import { useState } from "react";
import { BsSearchHeart } from "react-icons/bs";

const SearchBar = ({ searchText, setSearchText, handleClick }) => {
    return (
        <>
            <div
                className="bg-dark flex
        text-white items-center px-5 py-2 w-full"
            >
                <form
                    action=""
                    className=" w-full flex items-center justify-between"
                >
                    <div className="px-4 flex grow outline-none w-full">
                        <input
                            type="text"
                            value={searchText}
                            placeholder="Search Users.."
                            onChange={(e) => setSearchText(e.target.value)}
                            className="flex grow outline-none 
                            w-full py-2 px-4 rounded-lg bg-light text-black font-xl "
                        />
                    </div>
                    <div
                        className=" cursor-pointer text-bold text-3xl shadow-md px-3 py-3 rounded-full animate-bounce"
                        onClick={handleClick}
                    >
                        <BsSearchHeart />
                    </div>
                </form>
            </div>
        </>
    );
};

export default SearchBar;
