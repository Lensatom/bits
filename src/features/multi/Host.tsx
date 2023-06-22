import { useState } from 'react'
import { FaArrowLeft } from "react-icons/fa"
import { NavLink } from "react-router-dom"

const Host = () => {

  const [hostData, setHostData] = useState({
    title: "",
    passcode: ""
  })

  return (
    <div className='w-full h-screen flex flex-col justify-center px-3'>
      <NavLink to="/multi/horj" className='absolute top-3 left-3 text-xl text-gray-700'><FaArrowLeft /></NavLink>
      <h2 className="w-full text-center text-2xl font-semibold">Host</h2>
      <p className="px-16 text-gray-700 text-center pb-5 border-b-2">Host a game fast and easily by creating a room</p>
      <form className="flex flex-col gap-1">
        <label className="mt-5">Room title</label>
        <input required value={hostData.title} onChange={(e:any) => setHostData({...hostData, title: e.target.value})} placeholder="Give your game a title" className="rounded-md p-3 bg-gray-200" />
        <label className='mt-5'>Room Passcode</label>
        <input required value={hostData.passcode} onChange={(e:any) => setHostData({...hostData, passcode: e.target.value})} placeholder="Secure your room" className="rounded-md p-3 bg-gray-200" />
        <button className='mt-5 bg-orange-700 text-white py-3 rounded-md'>Create Room</button>
      </form>
    </div>
  )
}

export default Host