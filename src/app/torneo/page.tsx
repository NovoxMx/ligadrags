"use client";
import { useMemo } from "react";
import Bracket from "../components/Bracket";

export default function TorneoPage() {
    return (
        <div className='bg-[#000000] text-[#e0e0e0] min-h-screen font-sans'>
            <div className="bg-[#121212] text-white min-h-screen px-4 py-6 max-w-4xl mx-auto">
                <h1 className="text-3xl text-[#33aaff] font-bold mb-6">Torneo Eliminatorio</h1>
                 <div className="rounded-md bg-white w-1/8 flex justify-center item-center hover:bg-transparent hover:border-1 hover:border-[#33aaff]">
                    <a href="/" className="flex justify-center text-[#33aaff] ">Ver Tabla </a>
                </div>
                <br/>
                <Bracket />
            </div>
        </div>

    );
}
