// Horj means Host or Join.

import { FaArrowLeft, FaHome, FaKey } from "react-icons/fa"
import { NavLink } from "react-router-dom"

const Horj = () => {
  return (
    <div className="w-full h-screen flex flex-col justify-center gap-10 px-3">
      <NavLink to="/selectgame" className='absolute top-3 left-3 text-xl text-gray-700'><FaArrowLeft /></NavLink>
      <h2 className="w-full text-center text-2xl font-semibold pb-10 border-b-2">Host or Join</h2>
      <NavLink to="/multi/host" className="bg-orange-700 p-3 rounded-md text-white font-medium flex items-center gap-2"><FaHome /> Host Game</NavLink>
      <NavLink to="" className="bg-orange-700 p-3 rounded-md text-white font-medium flex items-center gap-2"><FaKey /> Join Game</NavLink>
    </div>
  )
}

export default Horj