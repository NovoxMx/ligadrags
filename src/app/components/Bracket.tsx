"use client";
import matchesData from "../data/matches";
import { useMemo } from "react";
import { bracketResults } from "../data/bracketResults";

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

function MatchCard({
    teamA,
    teamB,
    scoreA,
    scoreB,
}: {
    teamA: string;
    teamB: string;
    scoreA: number;
    scoreB: number;
}) {
    const isPlayed = !(scoreA === 0 && scoreB === 0);

    return (
        <div className="bg-[#1f1f1f] p-4 rounded-md w-full text-center shadow-md">
            <p className="text-[#33aaff] font-bold">{teamA}</p>
            <p className="text-[#ccc] text-sm font-mono">
                {isPlayed ? `${scoreA} : ${scoreB}` : "vs"}
            </p>
            <p className="text-[#33aaff] font-bold">{teamB}</p>
        </div>
    );
}

export default function Bracket() {
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
            b.points !== a.points ? b.points - a.points : b.roundDiff - a.roundDiff
        );
    }, []);

    const top8 = standings.slice(0, 8);

    // Cuartos de final: 1v8, 4v5, 3v6, 2v7
    const quarterFinalPairs = [
        [top8[0], top8[7]],
        [top8[3], top8[4]],
        [top8[2], top8[5]],
        [top8[1], top8[6]],
    ];

    const quarterWinners = quarterFinalPairs.map((pair, i) => {
        const result = bracketResults.quarterFinals[i];
        if (result.scoreA === 0 && result.scoreB === 0) return null;
        return result.scoreA > result.scoreB ? pair[0] : pair[1];
    });

    const semiFinalPairs = [
        quarterWinners[0] && quarterWinners[3]
            ? [quarterWinners[0], quarterWinners[3]]
            : [null, null],
        quarterWinners[1] && quarterWinners[2]
            ? [quarterWinners[1], quarterWinners[2]]
            : [null, null],
    ];

    const semiWinners = semiFinalPairs.map((pair, i) => {
        const result = bracketResults.semiFinals[i];
        if (!pair[0] || !pair[1] || (result.scoreA === 0 && result.scoreB === 0))
            return null;
        return result.scoreA > result.scoreB ? pair[0] : pair[1];
    });

    const finalResult = bracketResults.final;
    let champion: TeamStats | null = null;

    if (
        semiWinners[0] &&
        semiWinners[1] &&
        !(finalResult.scoreA === 0 && finalResult.scoreB === 0)
    ) {
        champion = finalResult.scoreA > finalResult.scoreB
            ? semiWinners[0]
            : semiWinners[1];
    }

    return (
        <div className="space-y-10">
            <section>
                <h2 className="text-xl text-[#88ccff] font-semibold mb-4">Cuartos de Final</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {quarterFinalPairs.map(([teamA, teamB], i) => {
                        const r = bracketResults.quarterFinals[i];
                        return (
                            <div key={i} className="flex items-center gap-4 bg-[#1a1a1a] p-4 rounded-md">
                                <h3 className="text-[#ffcc00] font-semibold whitespace-nowrap">
                                    {`Partido ${i + 1}`}
                                </h3>
                                <MatchCard
                                    teamA={teamA.name}
                                    teamB={teamB.name}
                                    scoreA={r.scoreA}
                                    scoreB={r.scoreB}
                                />
                            </div>
                        );
                    })}
                </div>
            </section>


            <section>
                <h2 className="text-xl text-[#88ccff] font-semibold mb-2">Semifinales</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {semiFinalPairs.map(([teamA, teamB], i) => {
                        const r = bracketResults.semiFinals[i];
                        return (
                            <MatchCard
                                key={i}
                                teamA={teamA?.name ?? "Por definir "}
                                teamB={teamB?.name ?? "Por definir "}
                                scoreA={r.scoreA}
                                scoreB={r.scoreB}
                            />
                        );
                    })}
                </div>
            </section>

            <section>
                <h2 className="text-xl text-[#88ccff] font-semibold mb-2">Final</h2>
                <MatchCard
                    teamA={semiWinners[0]?.name ?? "Por definir"}
                    teamB={semiWinners[1]?.name ?? "Por definir"}
                    scoreA={finalResult.scoreA}
                    scoreB={finalResult.scoreB}
                />
            </section>

            <section className="mt-8 text-center bg-[#2a2a2a] p-4 rounded-md shadow">
                <h3 className="text-2xl text-[#33ff88] font-bold">🏆 Campeón</h3>
                <p className="text-xl mt-2 font-semibold text-[#ffffff]">
                    {champion ? champion.name : "Por definir"}
                </p>
            </section>
        </div>
    );
}
