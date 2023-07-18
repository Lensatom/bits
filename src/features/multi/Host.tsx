import { useState } from 'react'
import { FaArrowLeft } from "react-icons/fa"
import { NavLink, useNavigate } from "react-router-dom"
import { AddData, UpdateData } from '../../firebase/firestore'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { SaveRoom } from '../../redux/action'
import Button from '../../components/Button'

const Host = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const state:any = useSelector((state:any) => state.userData)
  const [error, setError] = useState("")
  const [buttonStatus, setButtonStatus] = useState<"active" | "inActive" | "loading">("active")

  const [hostData, setHostData] = useState({
    title: state.username,
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
    setError("")
    setButtonStatus("loading")
    if (hostData.passcode.length < 4) {
      setButtonStatus("active")
      setError("Passcode must be at least 4 characters")
      return false;
    }
    if (hostData.passcode.length > 8) {
      setButtonStatus("active")
      setError("Passcode must not be more than 8 characters")
      return false;
    }
    await AddData("hosting", state.username, {
      ...hostData,
      host: state.username,
      createTime: new Date(),
      ready: false,
      hostId: state.username
    });
    const data = {
      id: state.username,
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
      <p className="px-16 text-gray-700 text-center pb-5 border-b-2 leading-5">Host a game fast and easily by creating a room</p>
      <form onSubmit={submit} className="flex flex-col">
        <label className="mt-5">Room title</label>
        <input required disabled value={state.username} className="rounded-md p-3 bg-gray-200" />
        <span className='mt-1 mb-5 px-3 text-xs text-gray-400 font-medium'>You cannot edit your room title</span>
        <div className="w-full flex flex-col">
          <label className="font-medium text-gray-700">Room Passcode</label>
          <input required value={hostData.passcode} onChange={(e:any) => setHostData({...hostData, passcode: e.target.value})} className="rounded-md p-3 mt-1 bg-gray-200" />
          <span className="text-xs font-medium text-red-600 mb-5 mt-1 px-3">{error}</span>
        </div>
        <Button type="submit" content="Create Room" func={submit} status={buttonStatus} />
      </form>
    </div>
  )
}

export default Host