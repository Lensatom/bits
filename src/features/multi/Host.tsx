import { useState } from 'react'
import { FaArrowLeft } from "react-icons/fa"
import { NavLink, useNavigate } from "react-router-dom"
import { AddData, UpdateData } from '../../firebase/firestore'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { SaveRoom } from '../../redux/action'

const Host = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state:any = useSelector((state:any) => state.userData)

  const [hostData, setHostData] = useState({
    title: "",
    passcode: "",
    players: [
      {
        name: state.username,
        avatar: state.avatar,
        ready: true,
      }
    ]
  })

  const submit = async (e:any) => {
    e.preventDefault();
    const hostId = await AddData("hosting", null, {
      ...hostData,
      host: state.username,
      createTime: new Date()
    });
    await UpdateData("hosting", hostId, {hostId: hostId});
    const data = {
      id: hostId,
      type: "multi",
    }
    await UpdateData("users", state.uid, {gameStatus: data})
    dispatch(SaveRoom(data))
    navigate("/multi/room")
  }

  return (
    <div className='w-full h-screen flex flex-col justify-center px-3'>
      <NavLink to="/multi/horj" className='absolute top-3 left-3 text-xl text-gray-700'><FaArrowLeft /></NavLink>
      <h2 className="w-full text-center text-2xl font-semibold">Host</h2>
      <p className="px-16 text-gray-700 text-center pb-5 border-b-2">Host a game fast and easily by creating a room</p>
      <form onSubmit={submit} className="flex flex-col gap-1">
        <label className="mt-5">Room title</label>
        <input required value={hostData.title} onChange={(e:any) => setHostData({...hostData, title: e.target.value})} placeholder="Give your game a title" className="rounded-md p-3 bg-gray-200" />
        <label className='mt-5'>Room Passcode</label>
        <input required value={hostData.passcode} onChange={(e:any) => setHostData({...hostData, passcode: e.target.value})} placeholder="Secure your room" className="rounded-md p-3 bg-gray-200" />
        <button onSubmit={submit} className='mt-5 bg-orange-700 text-white py-3 rounded-md'>Create Room</button>
      </form>
    </div>
  )
}

export default Host