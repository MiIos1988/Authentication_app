import React, { useState } from "react";
import logo from "../assets/img/Logo-1.png";
import en from "../assets/img/england.png";
import { RxHamburgerMenu } from 'react-icons/rx';

const HeaderHomePageComponent = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    return (
        <div className=" p-2   bg-[#032758] md:bg-inherit ">
            <div className="container mx-auto pt-0 md:pt-8">
                <nav className="mx-11 2xl:mx-48  md:flex justify-between items-center my-1.5 md:my-10 h-14 static md:relative ">
                    <div className="flex h-full ">

                        <img src={logo} alt="Logo" className="mx-auto md:mx-0  self-center " />
                    </div>
                    <RxHamburgerMenu className={`flex xl:hidden text-[26px] text-white absolute right-3 top-7 md:static `} onClick={() => setMenuOpen(!isMenuOpen)} />
                    <ul className={`text-[13px] xl:text-[15px]  list-none gap-x-3 uppercase text-white ${!isMenuOpen ? "xl:flex hidden" : "xl:flex block xl:static absolute right-0 top-20 xl:bg-inherit bg-[#032758]   xl:w-[auto] md:w-[300px] w-[100%] xl:px-0 px-6"} `}>
                        <li className="py-2 ">Početna</li>
                        <li className="py-2">O nama</li>
                        <li className="py-2">Usluge</li>
                        <li className="py-2">Klijenti</li>
                        <li className="py-2">Kontakt</li>
                        <li className="flex py-2 ">
                            <span className="flex items-center" >
                                <img src={en} alt="" className="shrink-0" />
                                <span className="  ml-1">En</span>
                            </span>
                        </li>
                    </ul>
                </nav>
            </div>

        </div>
    );
};

export default HeaderHomePageComponent;
