import React, { useState } from "react";
import logo from "../assets/img/Logo-1.png";
import en from "../assets/img/england.png";
import { RxHamburgerMenu } from 'react-icons/rx';

const HeaderHomePageComponent = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    return (
        <div className="pt-10">
            <div className="container mx-auto mt-10">
                <nav className="mx-14 2xl:mx-48 flex justify-between items-center ">
                    <img src={logo} alt="Logo" />
                    <RxHamburgerMenu className="flex  xl:hidden text-3xl" />
                    <ul className="flex self-start list-none gap-x-3 uppercase hidden xl:flex">
                        <li>Početna</li>
                        <li>O nama</li>
                        <li>Usluge</li>
                        <li>Klijenti</li>
                        <li>Kontakt</li>
                        <li className="flex">
                            <span className="flex items-center" >
                                <img src={en} alt="" className="shrink-0" />
                                <span className="ml-1">En</span>
                            </span>
                        </li>
                    </ul>
                </nav>
            </div>
        </div>
    );
};

export default HeaderHomePageComponent;
