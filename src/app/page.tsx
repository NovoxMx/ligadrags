"use client";
import React from 'react';
import LeagueInfo from './components/LeagueInfo';
import PlayersGrid from './components/PlayersGrid';
import StandingsTable from './components/StandingsTable';
import MatchDay from './components/MatchDay';
import matches from './data/matches';
import Link from 'next/link';

export default function App() {
    return (
        <div className='bg-[#000000] text-[#e0e0e0] min-h-screen font-sans'>
            <div className="bg-[#121212] text-[#e0e0e0] max-w-5xl mx-auto px-4 py-6 font-sans">
                <LeagueInfo />
                <PlayersGrid />
                <StandingsTable />
                <br/>
                <div className="rounded-md bg-white w-1/8 flex justify-center item-center hover:bg-transparent hover:border-1 hover:border-[#33aaff]">
                    <Link href="/torneo" className="flex justify-center text-[#33aaff] ">Ver Torneo</Link>
                </div>
                <section className="schedule mt-6">
                    <h2 className="text-2xl text-[#33aaff] font-bold mb-4">Calendario de Partidos</h2>
                    {matches.map((jornada, idx) => (
                        <MatchDay key={idx} jornada={jornada} />
                    ))}
                </section>
            </div>
        </div>

    );
}