"use client"
import React from "react";

const Wallet = ({ publicKey = "5616546464656654121212", privateKey = "*********************" }) => {
  return (
    <div className="w-full h-80 justify-center content-center flex my-3">
      <div className="w-275  h-full rounded-2xl overflow-hidden bg-[#2E2B2B] border-2 ">
        <div className="w-full h-20 bg-black flex justify-between items-center px-10">
          <h2 className="font-orbitron font-bold text-white text-2xl">
            Wallet 1
          </h2>
        </div>
        <div className="w-full h-60">
          <div className="Public w-full h-[40%] flex flex-col justify-center px-10 gap-y-2 ">
            <h2 className="text-2xl text-blue-400">Public Key</h2>
            <h3 className="text-2xl text-white hover:cursor-pointer hover:text-blue-400">{publicKey}</h3>
          </div>
          <div className="Private w-full h-[40%]  flex flex-col justify-center px-10 gap-y-2 ">
            <h2 className="text-2xl text-blue-400">Private Key</h2>
            <h3 className="text-2xl text-white hover:cursor-pointer hover:text-blue-400">{privateKey}</h3>
          </div>
          <div className="w-full px-20">
          <button className="w-full bg-green-500 rounded-2xl flex centre hover:cursor-pointer hover:bg-green-600" >Open Wallet</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
