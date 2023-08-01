import React from "react";
import Input from '../Components/SignUp/Input'
import { NavLink } from "react-router-dom";


const SignUp = () => {
  return (
    <div className=" h-full">
      <div className="bg-black pt-[32px] pb-[32px] pl-[51px] pr-[0px] text-white">
        <div className="flex space-x-1  items-center ">
          <NavLink to='/home'>
            <img src="./Spotify.png" alt="spotify icon" className="w-9" />
          </NavLink>
          <span className=" font-semibold text-2xl ">Musica</span>
        </div>
      </div>
      <div className="flex p-[32px] bg-[rgba(22,22,22)] justify-center">
        <div className="w-[734px] h-screen  ">
          <div className=" flex flex-col  text-white h-screen bg-black  rounded items-center">
            <h1 className=" flex mt-20 font-bold text-5xl mr-0 mb-20 ml-0 justify-center">Sign Up to Musica</h1>

            <div>
              <Input />
            </div>
          </div>


        </div>

      </div>

    </div>
  );
};

export default SignUp;
