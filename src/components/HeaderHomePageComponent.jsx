import React, { useState } from "react";
import logo from "../assets/img/Logo-1.png";
import en from "../assets/img/england.png";
import { RxHamburgerMenu } from 'react-icons/rx';

const HeaderHomePageComponent = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    return (
        <div className="pt-0 md:pt-10">
            <div className="container mx-auto">
                <nav className="mx-14 2xl:mx-48  md:flex justify-between items-center my-6 md:my-10 h-14 ">
                    <div className="flex h-full">

                        <img src={logo} alt="Logo" className="mx-auto md:mx-0 my-auto self-center" />
                    </div>
                    <RxHamburgerMenu className="flex  xl:hidden text-3xl  absolute right-3 top-10 md:static" />
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
