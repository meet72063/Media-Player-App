import React from "react";
import InputLogin from "../Components/SignIn/InputLogin";
import { NavLink } from "react-router-dom";

const Login = () => {
  return (
    <div className=" h-full ">
      <div className="bg-black pt-[32px] pb-[32px] pl-[51px] pr-[0px] text-white ">
        <div className="flex space-x-2  items-center ">
          <NavLink to='/home'>
            <img src="./Spotify.png" alt="spotify icon" className="w-9" />
          </NavLink>
          <span className=" font-semibold text-2xl">Musica</span>
        </div>
      </div>
      <div className="flex p-[32px] bg-[rgba(22,22,22)] justify-center  ">
        <div className="w-[734px] h-screen">
          <div className=" flex flex-col  text-white h-screen bg-black  rounded items-center">
            <h1 className=" flex mt-20 font-bold text-5xl mr-0 mb-20 ml-0 justify-center">
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
