import { Button } from '@/components/ui/button'

import React from 'react'
import { useNavigate } from 'react-router-dom'




const Clipnote_landing = () => {

    const navigate = useNavigate();


const handleLogin = () =>{
    navigate("/auth")
}

const handleAccessHome = () =>{
    navigate("/auth")
}


  return (
    <div className="relative bg-black min-h-screen text-green-400  select-none">
      <header className="flex justify-between items-center py-8 px-8">
        <h1 className=" font-montserrat text-green-400 text-bold text-4xl cursor-pointer">
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

        <h1 className="text-white text-6xl font-bold font-montserrat leading-tight">
          Still Worrying of loosing your <br />
          <span
            className="text-green-400 "
            
          >
            important clipboard history?
          </span>
        </h1>
        <p className="text-gray-400 font-inter text-2xl mt-4">
          Meet{" "}
          <span className="text-white font-amsterdam font-semibold text-3xl hover:text-green-400 transition-all ease-linear">
            ClipNote{" "}
          </span>{" "}
          - your smart clipboard companion that saves everything you copy.
        </p>

        <div className="flex flex-row gap-8 mt-12 font-montserrat">
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
            Access your ClipNote
          </Button>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center mt-64 px-6">
        <video
          autoPlay
          loop
          muted
          className="w-full max-w-[800px] h-auto rounded-xl shadow-lg"
        >
          <source src="/demo.mp4" type="video/mp4" />
          Clipnote Demo
        </video>
      </section>
    </div>
  );
}

export default Clipnote_landing