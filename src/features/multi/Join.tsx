import { FaArrowLeft } from "react-icons/fa"
import { NavLink, useNavigate } from "react-router-dom"
import { useState } from 'react'
import { useDispatch } from "react-redux";
import { SaveRoom } from "../../redux/action";

const Join = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [roomData, setRoomData] = useState({
    title: "",
    passcode: ""
  })

  const submit = async (e:any) => {
    e.preventDefault();
    const data = {
      ...roomData,
    }
    dispatch(SaveRoom(data))
    navigate("/multi/rooms")
  }


  return (
    <div className="px-3 w-full h-screen flex flex-col justify-center">
      <NavLink to="/multi/horj" className='absolute top-3 left-3 text-xl text-gray-700'><FaArrowLeft /></NavLink>
      <h2 className="w-full text-center text-2xl font-semibold">Join</h2>
      <p className="px-16 text-gray-700 text-center pb-5 border-b-2">Join a room with room details</p>
      <form onSubmit={submit} className="flex flex-col gap-1">
        <label className="mt-5">Room title</label>
        <input required value={roomData.title} onChange={(e:any) => setRoomData({...roomData, title: e.target.value})} placeholder="Give your game a title" className="rounded-md p-3 bg-gray-200" />
        <label className='mt-5'>Room Passcode</label>
        <input required value={roomData.passcode} onChange={(e:any) => setRoomData({...roomData, passcode: e.target.value})} placeholder="Secure your room" className="rounded-md p-3 bg-gray-200" />
        <button onSubmit={submit} className='mt-5 bg-orange-700 text-white py-3 rounded-md'>Join Room</button>
      </form>
    </div>
  )
}

export default Join