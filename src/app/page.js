"use client";
import Image from "next/image";
import sol from "../assets/sol.png";
import eth from "../assets/eth.png";
import { useState,useEffect } from "react";
import Wallet from './../components/Wallet';
import Phases from './../components/Phases';
import { generateMnemonic, mnemonicToSeed } from 'bip39';
import { derivePath } from "ed25519-hd-key";
import nacl from "tweetnacl";
import bs58 from "bs58";
import { ethers } from "ethers";
import { toast } from "sonner";
export default function Home() {
  const [section, setSection] = useState("home");
  const [wallet, setWallet] = useState(false)
  const [phase, setphase] = useState(false)
  const [memonic, setmemonic] = useState(null)
  const [keys, setKeys] = useState([]);
  const [ethKeys, setEthKeys] = useState([]);
  useEffect(() => {
    if(localStorage.getItem("solMemonic")){
      setmemonic(localStorage.getItem("solMemonic"))
      setSection("sol")
      setWallet(true)
      setphase(true)
    }
    if(localStorage.getItem("solKeys")){
      setKeys(JSON.parse(localStorage.getItem("solKeys")) || [])
      setWallet(true)
      setphase(true)
    }
    if(localStorage.getItem("ethKeys")){
      setEthKeys(JSON.parse(localStorage.getItem("ethKeys")) || [])
    }

  }, [])
  const handleDelete=(index)=>{
    const updatedKeys =keys.filter((_, i) => i !== index);
    setKeys(updatedKeys);
    localStorage.setItem("solKeys", JSON.stringify([...updatedKeys]));
    toast("Deleted Successfully")
  }
  const handleEthDelete=(index)=>{
    const updatedKeys = ethKeys.filter((_, i) => i !== index);
    setEthKeys(updatedKeys);
    localStorage.setItem("ethKeys", JSON.stringify([...updatedKeys]));
    toast("Deleted Successfully")
  }
  const generateForIndex = (index, seed) => {
    const path = `m/44'/501'/${index}'/0'`; //derivation path
    const derivedSeed= derivePath(path,seed.toString("hex")).key;
    const { secretKey, publicKey } = nacl.sign.keyPair.fromSeed(derivedSeed);
    return {
      publicKey: bs58.encode(publicKey),
      privateKey: bs58.encode(secretKey),
    };
  }
  const handleGenrate = async() => {
    let currentMemonic = localStorage.getItem("solMemonic")
    if (currentMemonic) {
      setmemonic(currentMemonic)
    }
    else {
      currentMemonic = generateMnemonic();
      setmemonic(currentMemonic)
      localStorage.setItem("solMemonic", currentMemonic)
    }
    // gentrating a seed 
    const seed = await mnemonicToSeed(currentMemonic)
    if (section === "sol") {
      let index = keys.length;
      let generatedKeys = generateForIndex(index, seed);
      while (keys.some((key) => key.publicKey === generatedKeys.publicKey)) {
        index++;
        generatedKeys = generateForIndex(index, seed);
      }
      setKeys([...keys, generatedKeys]);
      localStorage.setItem("solKeys", JSON.stringify([...keys, generatedKeys]));
    } else if (section === "eth") {
      let index = ethKeys.length;
      const hdNode = ethers.HDNodeWallet.fromSeed(seed);
      let generatedKeys;
      while (true) {
        const derivationPath = `m/44'/60'/${index}'/0/0`;
        const child = hdNode.derivePath(derivationPath);
        const wallet = new ethers.Wallet(child.privateKey);
        generatedKeys = {
          publicKey: wallet.address,
          privateKey: wallet.privateKey,
        };
        if (!ethKeys.some((key) => key.publicKey === generatedKeys.publicKey)) {
          break;
        }
        index++;
      }
      setEthKeys([...ethKeys, generatedKeys]);
      localStorage.setItem("ethKeys", JSON.stringify([...ethKeys, generatedKeys]));
    }
    toast("Generated Successfully")
    setWallet(true)
    setphase(true)
  }
  return (
    <>
      {section === "home" && (
        <div className="min-h-screen w-full flex justify-center items-center flex-col p-4">
          <h3 className="text-4xl text-white font-orbitron p-4 pb-10 text-center">
            Choose Your Wallet
          </h3>
          <div className="flex flex-col md:flex-row gap-10 justify-center items-center w-full max-w-5xl">
            <div
              className="ethereum group w-full md:w-96 h-96 text-white flex flex-col justify-center items-center gap-12 rounded-3xl bg-black hover:cursor-pointer p-6"
              onClick={() => {
                setSection("eth");
              }}
            >
              <div className="flex justify-center items-center h-40 w-40 md:h-60 md:w-60 transition-transform duration-300 ease-in-out group-hover:scale-105">
                <Image src={eth} alt="" />
              </div>
              <h4 className="font-orbitron text-2xl">Ethereum</h4>
            </div>
            <div
              className="solana group w-full md:w-96 h-96 relative text-white rounded-3xl flex flex-col justify-center items-center gap-12 bg-black hover:cursor-pointer p-6"
              onClick={() => {
                setSection("sol");
              }}
            >
              <div className="flex justify-center items-center h-40 w-40 md:h-60 md:w-60 transition-transform duration-300 ease-in-out group-hover:scale-105">
                <Image src={sol} alt="" />
              </div>
              <h4 className="font-orbitron text-2xl">Solana</h4>
            </div>
          </div>
        </div>
      )}
      {section === "eth" && (
        <div className="w-full min-h-screen flex flex-col items-center pb-10">
          <div className="w-full mt-20 flex flex-col items-center gap-10 px-4 md:px-20 max-w-7xl">
            <h1 className="text-white text-3xl font-orbitron text-center">Set Recovery Phase</h1>
            <div className="w-full flex flex-col md:flex-row gap-4 md:gap-10">
              <textarea className="bg-white rounded-2xl h-20 md:h-14 w-full resize-none outline-none p-2 text-black"></textarea>
              <div className="flex gap-4 justify-center md:justify-start">
              <button className="h-10 px-6 rounded-2xl bg-green-500 text-white font-orbitron whitespace-nowrap hover:bg-green-600 transition-colors" onClick={()=>{handleGenrate()}} >Generate New</button>
              <button className="h-10 px-6 rounded-2xl bg-red-500 text-white font-orbitron whitespace-nowrap hover:bg-red-600 transition-colors" onClick={()=>{localStorage.removeItem("ethKeys");setEthKeys([]);setWallet(false);setphase(false);toast("Deleted Successfully")}} >Delete All</button>
              </div>
            </div>
          </div>
          <div className="w-full px-4 md:px-20 max-w-7xl flex flex-col items-center">
            {wallet && ethKeys && ethKeys.map((key, index) => (
              <Wallet key={key.publicKey} privateKey={key.privateKey} publicKey={key.publicKey} index={index} handledelete={handleEthDelete} />
            ))}
            {phase && <Phases memonic={memonic} />}
          </div>
        </div>
      )}
      {section === "sol" && (
        <div className="w-full min-h-screen flex flex-col items-center pb-10">
          <div className="w-full mt-20 flex flex-col items-center gap-10 px-4 md:px-20 max-w-7xl">
            <h1 className="text-white text-3xl font-orbitron text-center">Set Recovery Phase</h1>
            <div className="w-full flex flex-col md:flex-row gap-4 md:gap-10">
              <textarea className="bg-white rounded-2xl h-20 md:h-14 w-full resize-none outline-none p-2 text-black"></textarea>
              <div className="flex gap-4 justify-center md:justify-start">
              <button className="h-10 px-6 rounded-2xl bg-green-500 text-white font-orbitron whitespace-nowrap hover:bg-green-600 transition-colors" onClick={()=>{handleGenrate()}} >Generate New</button>
              <button className="h-10 px-6 rounded-2xl bg-red-500 text-white font-orbitron whitespace-nowrap hover:bg-red-600 transition-colors" onClick={()=>{localStorage.clear();setKeys([]);setWallet(false);setphase(false)}} >Delete All</button>
              </div>
            </div>
          </div>
          <div className="w-full px-4 md:px-20 max-w-7xl flex flex-col items-center">
            {wallet && keys && keys.map((key, index) => (
              <Wallet key={key.publicKey} privateKey={key.privateKey} publicKey={key.publicKey} index={index} handledelete={handleDelete} />
            ))}
            {phase && <Phases memonic={memonic} />}
          </div>
        </div>
      )}
    </>
  );
}
