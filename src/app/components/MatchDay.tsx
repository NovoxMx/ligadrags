import { useState } from "react";

interface Team {
  name: string;
}

interface Match {
  left: Team;
  right: Team;
  score: {
    left: number;
    right: number;
  };
}

interface Jornada {
  title: string;
  matches: Match[];
}

interface MatchDayProps {
  jornada: Jornada;
}

export default function MatchDay({ jornada }: MatchDayProps) {
  const [visible, setVisible] = useState(true);

  return (
    <section className="bg-[#1f1f1f] p-4 rounded-md shadow-md mb-6">
      <div className="flex justify-between items-center">
        <h3 className="text-[#88ccff] text-lg font-semibold border-b border-[#333] pb-1 mb-3">
          {jornada.title}
        </h3>
        <button
          onClick={() => setVisible(!visible)}
          className="text-sm text-[#88ccff] hover:underline"
        >
          {visible ? "Ocultar" : "Mostrar"}
        </button>
      </div>
      {visible && jornada.matches.map((match, idx) => (
        <div
          key={idx}
          className="grid grid-cols-[1fr_auto_1fr] items-center bg-[#2a2a2a] my-1 p-2 px-4 rounded"
        >
          <div className="flex items-center gap-2 text-white font-medium justify-start">
            <span>{match.left.name}</span>
          </div>
          <div className="flex justify-center items-center min-w-[60px] text-[#eee] font-bold font-mono">
            <span className="w-5 text-right">{match.score.left}</span>
            <span className="mx-1">:</span>
            <span className="w-5 text-left">{match.score.right}</span>
          </div>
          <div className="flex items-center gap-2 text-white font-medium justify-end">
            <span>{match.right.name}</span>
          </div>
        </div>
      ))}
    </section>
  );
}
