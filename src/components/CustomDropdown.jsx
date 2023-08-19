"use client";

import { Menu, Transition } from "@headlessui/react";
import { Fragment } from "react";
import { BsThreeDotsVertical } from "react-icons/bs";
import { dropdownItems } from "@/constants";

const CustomDropdown = ({ id }) => {
    return (
        <div className="">
            <Menu
                as="div"
                className="relative bg-dark text-white"
            >
                <div>
                    <Menu.Button className="px-4 py-2">
                        <BsThreeDotsVertical />
                    </Menu.Button>
                </div>
                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 mt-2 w-56 origin-top-right bg-slate-900 text-white z-10 px-4 py-2 rounded-2xl">
                        {dropdownItems.map((item, index) => (
                            <div
                                className="px-1 py-1"
                                key={index}
                            >
                                <Menu.Item>
                                    {({ active }) => (
                                        <a href={item.path + `/${id}`}>
                                            <div
                                                className={`flex gap-2 items-center ${
                                                    active
                                                        ? `${item.bgColor}`
                                                        : "bg-indigo-400"
                                                } text-white rounded-xl px-2 py-1`}
                                            >
                                                {item.icon}
                                                <p className="">{item.name}</p>
                                            </div>
                                        </a>
                                    )}
                                </Menu.Item>
                            </div>
                        ))}
                    </Menu.Items>
                </Transition>
            </Menu>
        </div>
    );
};

export default CustomDropdown;
