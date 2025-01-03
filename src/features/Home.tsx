import { NavLink } from "react-router-dom"


const Home = () => {
  const navs = [
    {
      name: "Home",
      route: "/"
    },
    {
      name: "Create",
      route: "/create"
    },
    {
      name: "Watch",
      route: "/watch"
    },
    {
      name: "About",
      route: "/about"
    }
  ]

  return (
    <div className="bg-bg w-full h-screen flex">
      <div className="h-screen w-[15%] bg-black/5 flex flex-col p-6 justify-between">
        <h1 className="text-lg font-extrabold text-primary">Bits.</h1>
        <nav className="border-l-[1px] border-primary/20 py-16">
          <ul className="flex flex-col gap-6">
            {navs.map((nav, i) => (
              <li key={i}>
                <NavLink
                  to={nav.route}
                  className={({isActive}) => `pl-4 ${isActive ? "border-l-primary" : "border-l-transparent"} border-l-[1px] ml-[-1px] text-grey.1 text-sm font-bold hover:pl-6 transition-all`}
                >{nav.name}</NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="h-[20%] flex flex-col justify-end">
          <span className="text-grey.1 text-sm">&copy; 2024</span>
        </div>
      </div>
      <div className="p-6 w-[70%]">
        <div className="flex items-center justify-between">
          <input className="border-[1px] rounded-full border-primary/40 text-grey.1 bg-bg py-2 px-6 w-[50%] focus:outline-none" />
          <div className="w-10 h-10 rounded-full bg-grey.1"></div>
        </div>
      </div>
    </div>
  )
}

export default Home