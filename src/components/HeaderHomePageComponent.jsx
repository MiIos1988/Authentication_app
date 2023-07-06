import React, { useState } from "react";
import logo from "../assets/img/Logo-1.png";
import en from "../assets/img/england.png";
import { RxHamburgerMenu } from 'react-icons/rx';

const HeaderHomePageComponent = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    return (
        <div className=" p-1   bg-[#032758] md:bg-inherit ">
            <div className="container mx-auto pt-0 md:pt-10">
                <nav className="mx-11 2xl:mx-48  md:flex justify-between items-center my-2 md:my-10 h-14 relative ">
                    <div className="flex h-full ">

                        <img src={logo} alt="Logo" className="mx-auto md:mx-0 my-auto self-center " />
                    </div>
                    <RxHamburgerMenu className={`flex xl:hidden text-fs-acc text-white absolute right-3 top-7 md:static `} onClick={() => setMenuOpen(!isMenuOpen)} />
                    <ul className={` self-start text-fs-ham list-none gap-x-3 uppercase ${!isMenuOpen ? "xl:flex hidden" : "block  absolute right-0 top-20 bg-[#032758] text-white w-acc-76 px-6"} `}>
                        <li className="py-2">Početna</li>
                        <li className="py-2">O nama</li>
                        <li className="py-2">Usluge</li>
                        <li className="py-2">Klijenti</li>
                        <li className="py-2">Kontakt</li>
                        <li className="flex">
                            <span className="flex items-center" >
                                <img src={en} alt="" className="shrink-0" />
                                <span className="py-2 ml-1">En</span>
                            </span>
                        </li>
                    </ul>
                </nav>
            </div>

        </div>
    );
};

export default HeaderHomePageComponent;
