import React from "react";
import { FcGoogle } from "react-icons/fc";

type Props = {
  onClick: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void
}

const GoogleButtonComponent = ({ onClick }: Props) => (
    <button className="text-blue-700 bg-white mt-3 text-xl p-2 uppercase relative font-bold" onClick={onClick}>
      <FcGoogle className="absolute text-4xl top-1 " />
      Google
    </button>
  );
;

export default GoogleButtonComponent;
