"use client"
import React, { useState } from "react";
import {toast} from "sonner"
const Wallet = ({ publicKey = "5616546464656654121212", privateKey = "*********************", index, handledelete }) => {
  const [showPrivateKey, setShowPrivateKey] = useState(false);
  const handlecopy=(text)=>{
    navigator.clipboard.writeText(text);
    toast("Copied to clipboard")
  }
  return (
    <div className="w-full flex justify-center my-3">
      <div className="w-full max-w-4xl rounded-2xl overflow-hidden bg-[#2E2B2B] border-2 border-black flex flex-col">
        <div className="w-full h-20 bg-black flex justify-between items-center px-4 md:px-10">
          <h2 className="font-orbitron font-bold text-white text-xl md:text-2xl">
            Wallet {index+1}
          </h2>
          <button className="w-20 h-10 bg-red-500 rounded-3xl text-white hover:bg-red-600 transition-colors" onClick={()=>{handledelete(index)}}>Delete</button>
        </div>
        <div className="w-full p-4 md:p-10 flex flex-col gap-6">
          <div className="Public w-full flex flex-col gap-2">
            <h2 className="text-xl md:text-2xl text-blue-400">Public Key</h2>
            <h3 className="text-sm md:text-xl text-white hover:cursor-pointer hover:text-blue-400 break-all" onClick={()=>handlecopy(publicKey)}>{publicKey}</h3>
          </div>
          <div className="Private w-full flex flex-col gap-2">
            <h2 className="text-xl md:text-2xl text-blue-400">Private Key</h2>
            <div className="flex justify-between items-center gap-2">
              <h3 className="text-sm md:text-xl text-white hover:cursor-pointer hover:text-blue-400 break-all" onClick={()=>handlecopy(privateKey)}>
                {showPrivateKey ? privateKey : "•".repeat(privateKey.length)}
              </h3>
              <button className="text-white hover:text-blue-400 min-w-6" onClick={() => setShowPrivateKey(!showPrivateKey)}>
                {showPrivateKey ? (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3.98 8.223A10.477 10.477 0 001.934 12C3.226 16.338 7.244 19.5 12 19.5c.993 0 1.953-.138 2.863-.395M6.228 6.228A10.45 10.45 0 0112 4.5c4.756 0 8.773 3.162 10.065 7.498a10.523 10.523 0 01-4.293 5.774M6.228 6.228L3 3m3.228 3.228l3.65 3.65m7.894 7.894L21 21m-3.228-3.228l-3.65-3.65m0 0a3 3 0 10-4.243-4.243m4.242 4.242L9.88 9.88" />
                  </svg>
                ) : (
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div className="w-full flex justify-center mt-4">
            <button className="w-full md:w-1/2 h-12 bg-green-500 rounded-2xl flex justify-center items-center text-white font-bold hover:cursor-pointer hover:bg-green-600 transition-colors" >Open Wallet</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Wallet;
