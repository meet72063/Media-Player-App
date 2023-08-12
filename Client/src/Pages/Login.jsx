import React from "react";
import InputLogin from "../Components/SignIn/InputLogin";
import { NavLink } from "react-router-dom";

const Login = () => {
  return (
    <div className=" h-screen  max-w-screen">
      {/* <div className="bg-black pt-[32px] pb-[32px] pl-[51px] pr-[0px] text-white ">
        <div className="flex space-x-2  items-center ">
          <NavLink to='/'>
            <img src="./Spotify.png" alt="spotify icon" className="w-9" />
          </NavLink>
          <span className=" font-semibold text-2xl">Musica</span>
        </div>
      </div> */}
      <div className=" bg-[rgba(22,22,22)] h-full">
        <div className="grid place-content-center p-5 ">
          <div className=" grid  text-white  m-5 bg-black  rounded place-content-center">
            <h1 className=" flex  font-bold text-3xl mt-2 mb-20 ml-0 justify-center">
              Log in to Musica
            </h1>

            <div className="flex justify-center">
              <InputLogin />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
