import React, { useState } from "react";
import icon from "../assets/icon.png";
import Image from "next/image";
import { toast } from "sonner";
const PhaseText = ({memonic}) => {
  const handleCopy=(text)=>{
    navigator.clipboard.writeText(text);
    toast.success("Copied to clipboard")
  }
  return (
    <div className="group h-full w-full grid grid-cols-2 md:grid-cols-4 gap-2 p-4 md:p-10 cursor-pointer" onClick={()=>{handleCopy(memonic)}}>
        {
            memonic.split(" ").map((word,index)=>{
                return <div key={index} className="bg-black h-10 text-white rounded-2xl flex justify-center items-center group-hover:text-blue-400 transition-colors">{word}</div>
            })
        }
    </div>
  );
};
const Phases = ({memonic}) => {
  const [toggle, settoggle] = useState(false);
  return (
    <div className="w-full flex justify-center my-3">
      <div className="w-full max-w-4xl rounded-2xl overflow-hidden bg-[#2E2B2B] border-2 border-black">
        <div className="w-full h-20 bg-black flex justify-between items-center px-4 md:px-10">
          <h2 className="font-orbitron font-bold text-white text-xl md:text-2xl">
            Your Secret Phases
          </h2>
          <div
            className="toggle hover:cursor-pointer"
            onClick={() => {
              settoggle(!toggle);
            }}
          >
            <Image src={icon} alt="" className={`${toggle && {"rotate-180":"rotate-0"}}`} />
          </div>
        </div>
        <div />
        {toggle && <PhaseText memonic={memonic} />}
      </div>
    </div>
  );
};

export default Phases;
