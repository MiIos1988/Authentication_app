import React from "react";
import logo from "../assets/img/Logo-1.png";
import en from "../assets/img/england.png";

const HeaderHomePageComponent = () => {
  return (
    <div className="pt-10">
      <div className="container mx-auto mt-10">
        <nav className="mx-48 sm:mx-0 flex justify-between ">
          <img src={logo} alt="Logo" />
            <ul className="flex self-start list-none gap-x-3 uppercase ">
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
