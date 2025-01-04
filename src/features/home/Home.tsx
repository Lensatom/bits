import { GameCard } from "./components"


const Home = () => {

  const games = [
    {
      name: "Maths Speed",
      bg: "bg-chess",
      route: "/selectgame"
    },
    {
      name: "Fastest Keyboards",
      bg: "bg-tictactoe",
      route: "/selectgame"
    },
    {
      name: "Greater Fraction",
      bg: "bg-checkers",
      route: "/selectgame"
    },
    {
      name: "Genetics",
      bg: "bg-connectfour",
      route: "/selectgame"
    }
  ]

  return (
    <div>
      <div className="flex items-center justify-between">
        <input className="border-[1px] rounded-full border-primary/40 text-grey.1 bg-bg py-2 px-6 w-[50%] focus:outline-none" />
        <div className="w-10 h-10 rounded-full bg-grey.1"></div>
      </div>
      <div className="grid grid-cols-4 gap-4 py-10">
        {games.map((game, i) => (
          <GameCard key={i} {...game} />
        ))}
      </div>
    </div>
  )
}

export default Home