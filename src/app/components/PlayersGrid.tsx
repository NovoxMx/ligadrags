const players = [
    "Dxnita",
    "Zxtch",
    "Novox",
    "Despichial",
    "Pablo",
    "Pekyy",
    "Sky",
    "Rocalapechu"
  ];
  
  export default function PlayersGrid() {
    return (
      <section className="mb-6">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-[#1f1f1f] p-6 rounded-md shadow-lg">
          {players.map((player) => (
            <div key={player} className="flex flex-col items-center text-center text-[#33aaff] font-semibold text-sm">
              {player}
              <img
                src={`/logos/${player}.png`}
                alt={player}
                className="w-20 h-20 object-cover bg-[#1a1a1a] rounded-md mt-2"
              />
            </div>
          ))}
        </div>
      </section>
    );
  }
  