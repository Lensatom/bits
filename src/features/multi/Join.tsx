import { FaArrowLeft } from "react-icons/fa"
import { NavLink, useNavigate } from "react-router-dom"
import { useState } from 'react'
import { useDispatch } from "react-redux";
import { SaveRoom } from "../../redux/action";
import { InputField } from "../../components";
import Button from "../../components/Button";

const Join = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [title, setTitle] = useState("")
  const [passcode, setPasscode] = useState("")
  const [buttonStatus, setButtonStatus] = useState("active")

  const submit = async (e:any) => {
    e.preventDefault();
    setButtonStatus("inActive")
    const data = {
      title,
      passcode
    }
    dispatch(SaveRoom(data))
    navigate("/multi/rooms")
  }


  return (
    <div className="px-3 w-full h-screen flex flex-col justify-center">
      <NavLink to="/multi/horj" className='absolute top-3 left-3 text-xl text-gray-700'><FaArrowLeft /></NavLink>
      <h2 className="w-full text-center text-2xl font-semibold">Join</h2>
      <p className="px-16 text-gray-700 text-center pb-10 border-b-2 mb-10">Join a room with room details</p>
      <form onSubmit={submit} className="flex flex-col gap-5">
        <InputField label="Room Title" value={title} func={setTitle} placeholder="Give your game a title" className="rounded-md p-3 bg-gray-200" />
        <InputField label="Room Passcode" value={passcode} func={setPasscode} placeholder="Secure your room" className="rounded-md p-3 bg-gray-200" />
        <Button type="submit" func={submit} content="Join Room" status={buttonStatus} />
      </form>
    </div>
  )
}

export default Join