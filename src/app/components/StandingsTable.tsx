import { useMemo } from "react";
import matchesData from "../data/matches"

interface TeamStats {
  name: string;
  played: number;
  wins: number;
  losses: number;
  roundsWon: number;
  roundsLost: number;
  roundDiff: number;
  points: number;
}

export default function StandingsTable() {
  const standings = useMemo(() => {
    const statsMap: Record<string, TeamStats> = {};

    matchesData.forEach((jornada) => {
      jornada.matches.forEach(({ left, right, score }) => {
        const leftTeam = left.name;
        const rightTeam = right.name;

        if (!statsMap[leftTeam]) {
          statsMap[leftTeam] = {
            name: leftTeam,
            played: 0,
            wins: 0,
            losses: 0,
            roundsWon: 0,
            roundsLost: 0,
            roundDiff: 0,
            points: 0,
          };
        }

        if (!statsMap[rightTeam]) {
          statsMap[rightTeam] = {
            name: rightTeam,
            played: 0,
            wins: 0,
            losses: 0,
            roundsWon: 0,
            roundsLost: 0,
            roundDiff: 0,
            points: 0,
          };
        }

        const leftScore = score.left;
        const rightScore = score.right;

        if (leftScore === 0 && rightScore === 0) return;

        statsMap[leftTeam].played++;
        statsMap[rightTeam].played++;

        statsMap[leftTeam].roundsWon += leftScore;
        statsMap[leftTeam].roundsLost += rightScore;

        statsMap[rightTeam].roundsWon += rightScore;
        statsMap[rightTeam].roundsLost += leftScore;

        if (leftScore > rightScore) {
          statsMap[leftTeam].wins++;
          statsMap[leftTeam].points += 3;
          statsMap[rightTeam].losses++;
        } else if (rightScore > leftScore) {
          statsMap[rightTeam].wins++;
          statsMap[rightTeam].points += 3;
          statsMap[leftTeam].losses++;
        }
      });
    });

    for (const team in statsMap) {
      const s = statsMap[team];
      s.roundDiff = s.roundsWon - s.roundsLost;
    }

    return Object.values(statsMap).sort((a, b) =>
      b.points !== a.points
        ? b.points - a.points
        : b.roundDiff - a.roundDiff
    );
  }, []);

  return (
    <section className="bg-[#1f1f1f] p-4 rounded-md shadow-md">
      <h3 className="text-[#88ccff] text-lg font-semibold border-b border-[#333] pb-1 mb-3">Tabla de Posiciones</h3>
      <table className="w-full text-sm text-left text-white">
        <thead className="text-xs uppercase text-[#aaa] border-b border-[#444]">
          <tr>
            <th className="py-2">Equipo</th>
            <th>J</th>
            <th>G</th>
            <th>P</th>
            <th>RG</th>
            <th>RP</th>
            <th>Dif</th>
            <th>Pts</th>
          </tr>
        </thead>
        <tbody>
          {standings.map((team) => (
            <tr key={team.name} className="border-b border-[#333] hover:bg-[#2a2a2a]">
              <td className="py-1">{team.name}</td>
              <td>{team.played}</td>
              <td>{team.wins}</td>
              <td>{team.losses}</td>
              <td>{team.roundsWon}</td>
              <td>{team.roundsLost}</td>
              <td>{team.roundDiff}</td>
              <td>{team.points}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}
