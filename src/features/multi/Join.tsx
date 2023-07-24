import { FaArrowLeft } from "react-icons/fa"
import { NavLink, useNavigate } from "react-router-dom"
import { useState } from 'react'
import { useDispatch } from "react-redux";
import { SaveRoom } from "../../redux/action";
import { InputField } from "../../components";
import Button from "../../components/Button";
import { GetRoom, UpdateData } from "../../firebase/firestore";
import { onSnapshot } from "firebase/firestore";
import { useSelector } from "react-redux";

const Join = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const userData:any = useSelector((state:any) => state.userData)
  const [title, setTitle] = useState("")
  const [passcode, setPasscode] = useState("")
  const [error, setError] = useState("")
  const [buttonStatus, setButtonStatus] = useState<"active" | "inActive" | "loading">("active")

  const submit = async (e:any) => {
    e.preventDefault();
    setError("")
    setButtonStatus("loading")
    getData()
  }

  const getData = async () => {
    const query = await GetRoom(title, passcode)
    onSnapshot(query, async (snapshot) => {
      let room:any
      console.log(snapshot.docs)
      snapshot.docs.forEach((doc:any) => {
        console.log(doc.data())
        room = {...doc.data()}
      })
      if (room.id) {
        joinRoom(room)
      } else {
        throwError()
      }
    })
  }

  const joinRoom = async (room:any) => {
    await UpdateData(`hosting/${room.id}/players`, userData.username, {
      avatar: userData.avatar,
      username: userData.username,
      ready:" false"
    })
    dispatch(SaveRoom({
      id: room.id,
      type: "multi",
    }))
    navigate("/multi/room")
  }

  const throwError = () => {
    setButtonStatus("active")
    setError("This room does not exist")
  }

  return (
    <div className="px-3 w-full h-screen flex flex-col justify-center">
      <NavLink to="/multi/horj" className='absolute top-3 left-3 text-xl text-gray-700'><FaArrowLeft /></NavLink>
      <h2 className="w-full text-center text-2xl font-semibold">Join</h2>
      <p className="px-16 text-gray-700 text-center pb-10 border-b-2 mb-10">Join a room with room details</p>
      <form onSubmit={submit} className="flex flex-col gap-5">
        <InputField label="Room Title" value={title} func={setTitle} error={error} className="rounded-md p-3 bg-gray-200" />
        <InputField label="Room Passcode" value={passcode} func={setPasscode} error={error} className="rounded-md p-3 bg-gray-200" />
        <Button type="submit" func={submit} content="Join Room" status={buttonStatus} />
      </form>
    </div>
  )
}

export default Join