import React from "react";
import { FcGoogle } from "react-icons/fc";

const GoogleButtonComponent = ({ onClick }) => {
  return (
    <button className="text-blue-700 bg-white mt-3 text-xl p-2 uppercase relative font-bold" onClick={onClick}>
      <FcGoogle className="absolute text-4xl top-1 " />
      Google
    </button>
  );
};

export default GoogleButtonComponent;
