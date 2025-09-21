import { Button } from "@/components/ui/button";
import {ArrowDown} from 'lucide-react'

import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";

const Clipnote_landing = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate("/auth");
  };

  const handleAccessHome = () => {
    navigate("/auth");
  };

  const videoRef = useRef(null);

  const scrollToVideo = () =>{
    videoRef.current.scrollIntoView({behaviour: "smooth", block: "start"})
  }

  return (
    <div className="relative bg-black min-h-screen select-none">
      <header className="flex justify-between items-center py-8 px-8">
        <h1 className=" font-montserrat text-xl text-green-400 text-bold sm:text-4xl cursor-pointer">
          CLIPNOTE
        </h1>

        <Button
          className=" bg-green-400 hover:bg-green-500"
          onClick={handleLogin}
        >
          Login
        </Button>
      </header>

      <section className="flex flex-col items-center justify-center text-center mt-20">
        <div className="bg-green-700/20 text-green-400 text-lg font-montserrat px-4 py-1 rounded-full mb-5 hover:scale-110 transition-all">
          Simpe · Fast · Secure
        </div>

        <h1 className="text-white text-2xl sm:text-6xl font-bold font-montserrat leading-tight">
          Still Worrying of loosing your <br />
          <span className="text-green-400 ">important clipboard history?</span>
        </h1>
        <p className="text-gray-400 text-xl sm:text-2xl mt-4 font-montserrat tracking-tighter">
          Meet{" "}
          <span className="text-white font-amsterdam text-base sm:text-2xl hover:text-green-400 transition-all ease-linear">
            ClipNote{" "}
          </span>{" "}
          your smart clipboard companion that saves everything you copy.
        </p>

        <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 mt-12 font-montserrat">
          <Button
            asChild
            className="bg-white text-lg hover:bg-white hover:scale-105 transition-all ease-linear"
          >
            <a href="/clipnote.exe" download>
              Download for{" "}
              <img src="/microsoft-icon.svg" alt="" width={20} height={20} />
            </a>
          </Button>
          <Button
            className="bg-green-400 text-black text-lg hover:bg-green-500 hover:scale-105 transition-all ease-linear"
            onClick={handleAccessHome}
          >
            Access ClipNote
          </Button>
        </div>

        <Button
          onClick={scrollToVideo}
          className="mt-16 sm:mt-32 rounded-full bg-transparent bg-opacity-50 border-2 text-white hover:bg-zinc-700 transition-all"
        >
          <ArrowDown />
        </Button>
      </section>

      <section
        ref={videoRef}
        className="flex flex-col items-center justify-center mt-24 sm:mt-64 px-6"
      >
        <h1 className="font-montserrat font-bold text-green-400 mb-8 text-2xl sm:text-4xl mt-8">
          See ClipNote in Action
        </h1>
        <video
          autoPlay
          loop
          muted
          className="w-full max-w-[1000px] h-auto rounded-xl shadow-lg"
        >
          <source src="/demo.mp4" type="video/mp4" />
          Clipnote Demo
        </video>
      </section>

      <section className="flex justify-center mt-48 sm:mt-64 flex-col items-center ">
        <h1 className="font-montserrat font-bold text-green-400 text-2xl sm:text-4xl">
          Steps to Get Started
        </h1>
        <ul className="font-montserrat text-left justify-center flex flex-col mt-8 list-disc list-inside space-y-2 bg-green-900/10 backdrop-blur-md p-8 rounded-xl shadow-md w-full max-w-2xl border border-green-400/20">
          <li>Down ClipNote Application for Windows Or MacOS</li>
          <li>Create an account on Clipnote</li>
          <li>
            Run ClipNote Application in terminal and login with same credentials
          </li>
          <li>Access Token will be saved</li>
          <li>Start copying with Ctrl + Q</li>
          <li>Access the copied content on dashboard</li>
        </ul>
      </section>

      <footer className="flex flex-col-reverse sm:flex-row items-center gap-4 sm:justify-between mt-48 py-8 px-24">
        <h1 className="font-montserrat text-green-400 text-bold text-xl sm:text-2xl">
          CLIPNOTE
        </h1>
        <h1 className="font-montserrat text-bold text-xl sm:text-2xl">
          GitHub
        </h1>
      </footer>
    </div>
  );
};

export default Clipnote_landing;
