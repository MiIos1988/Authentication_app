import React from "react";
import logo from "../assets/img/Logo-1.png";
import en from "../assets/img/england.png";

const HeaderHomePageComponent = () => {
  return (
    <div className="pt-10">
      <div className="container mx-auto mt-10">
        <nav className="mx-48 flex justify-between ">
          <img src={logo} alt="Logo" />
          <div>
            <ul className="flex list-none gap-x-3 uppercase">
              <li>Početna</li>
              <li>O nama</li>
              <li>Usluge</li>
              <li>Klijenti</li>
              <li>Kontakt</li>
              <li className="flex">
                <img src={en} alt="" />
                En
              </li>
            </ul>
          </div>
        </nav>
      </div>
    </div>
  );
};

export default HeaderHomePageComponent;
