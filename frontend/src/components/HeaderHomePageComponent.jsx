import React, { useState } from "react";
import logo from "../assets/img/Logo-1.png";
import en from "../assets/img/england.png";
import sr from "../assets/img/serbia.png";
import { RxHamburgerMenu } from 'react-icons/rx';
import { Link } from "react-router-dom";
import { useTranslation } from 'react-i18next';
import i18n from '../i18n';

const HeaderHomePageComponent = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);
    const [isEnglish, setIsEnglish] = useState(false);
    const { t } = useTranslation();

    const handleLanguageChange = () => {
        const newLanguage = i18n.language === 'sr' ? 'en' : 'sr';
        i18n.changeLanguage(newLanguage);
      };


    return (
        <div className=" p-2   bg-[#032758] md:bg-inherit ">
            <div className="container mx-auto pt-0 md:pt-8">
                <nav className="mx-11 2xl:mx-48  md:flex justify-between items-center my-1.5 md:my-10 h-14 static md:relative ">
                    <div className="flex h-full ">
                        <Link to={"/"}>
                            <img src={logo} alt="Logo" className="mx-auto md:mx-0  self-center " />
                        </Link>
                    </div>
                    <RxHamburgerMenu className={`flex xl:hidden text-[26px] text-white absolute right-3 top-7 md:static `} onClick={() => setMenuOpen(!isMenuOpen)} />
                    <ul className={`text-[13px] xl:text-[15px]  list-none gap-x-5 uppercase text-white ${!isMenuOpen ? "xl:flex hidden" : "xl:flex block xl:static absolute right-0 top-20 xl:bg-inherit bg-[#032758]   xl:w-[auto] md:w-[300px] w-[100%] xl:px-0 px-6"} `}>
                        {/* <li className="py-2 ">Home</li> */}
                        <Link to={"/login"}>
                            <li className="py-2">{t('login')}</li>
                        </Link>
                        <Link to={"/register"}>
                            <li className="py-2">{t('register')}</li>
                        </Link>
                        {/* <li className="py-2">Klijenti</li>
                        <li className="py-2">Kontakt</li> */}
                        <li className="flex py-2 cursor-pointer w-px" 
                        onClick={() => {
                            setIsEnglish(!isEnglish);
                            handleLanguageChange();
                        }}>
                            <span className="flex items-center" >
                                <img src={isEnglish ? sr : en} alt="" className="shrink-0" />
                                <span className="  ml-1">{isEnglish ? "Sr" : "En"}</span>
                            </span>
                        </li>
                    </ul>
                </nav>
            </div>

        </div>
    );
};

export default HeaderHomePageComponent;
