"use client";
import Image from "next/image";
import sol from "../assets/sol.png";
import eth from "../assets/eth.png";
import { useState } from "react";
import Wallet from './../componets/Wallet';

export default function Home() {
  const [section, setSection] = useState("home");
  const [wallet, setWallet] = useState(false)
  return (
    <>
      {section === "home" && (
        <div className="h-screen w-screen centre flex-col -mt-20">
          <h3 className="text-4xl text-white font-orbitron p-4 pb-10">
            Choose Your Wallet
          </h3>
          <div className="blockchain h-100  text-white gap-10 centre ">
            <div
              className="ethereum group h-100 w-100  text-white centre flex-col gap-12 rounded-3xl bg-black hover:cursor-pointer  "
              onClick={() => {
                setSection("eth");
              }}
            >
              <div className="centre h-60 w-60 transition-transform duration-300 ease-in-out group-hover:scale-105">
                <Image src={eth} />
              </div>
              <h4 className="font-orbitron text-2xl">Ethereum</h4>
            </div>
            <div
              className="solana group h-100 w-100 relative text-white rounded-3xl centre flex-col gap-12 bg-black hover:cursor-pointer"
              onClick={() => {
                setSection("sol");
              }}
            >
              <div className="centre h-60 w-60 transition-transform duration-300 ease-in-out group-hover:scale-105">
                <Image src={sol} />
              </div>
              <h4 className="font-orbitron text-2xl">Solana</h4>
            </div>
          </div>
        </div>
      )}
      {section === "sol" && (
        <div className=" w-full h-full  flex flex-col ">
          <div className="top w-full h-50  mt-20 centre gap-10 px-50  flex-col flex">
            <h1 className="text-white text-3xl font-orbitron ">Set Recovery Phase</h1>
            <div className="w-full flex px-10 gap-10">
              <textarea className="bg-white rounded-2xl h-10 w-full resize-none outline-none p-2"></textarea>
              <button className="h-10 w-30 rounded-2xl  bg-red-500 text-white font-orbitron " onClick={()=>{setWallet(!wallet)}} >Generate</button>
            </div>
          </div>
          {wallet && <Wallet/>}
        </div>
      )}
    </>
  );
}
