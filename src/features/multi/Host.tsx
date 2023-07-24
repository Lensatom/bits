import { useState } from 'react'
import { FaArrowLeft } from "react-icons/fa"
import { NavLink, useNavigate } from "react-router-dom"
import { AddData } from '../../firebase/firestore'
import { useDispatch } from 'react-redux'
import { useSelector } from 'react-redux'
import { SaveRoom } from '../../redux/action'
import Button from '../../components/Button'
import { InputField } from '../../components'

const Host = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const host:any = useSelector((state:any) => state.userData)
  const [passcode, setPasscode] = useState("");
  const [error, setError] = useState("")
  const [buttonStatus, setButtonStatus] = useState<"active" | "inActive" | "loading">("active")

  const submit = async (e:any) => {
    e.preventDefault();
    setError("")
    setButtonStatus("loading")
    if ( passcode.length < 4 ) {
      return throwError("Passcode must be at least 4 characters")
    } else if (passcode.length > 8) {
      return throwError("Passcode must not be more than 8 characters")
    } else {
      await AddData("hosting", host.username, {
        passcode: passcode,
        host: host.username,
        title: host.username,
        ready: false,
        id: host.username
      });
      await AddData(`hosting/${host.username}/players`, host.username, {
        avatar: host.avatar,
        username: host.username,
        ready: true
      });
      dispatch(SaveRoom({
        id: host.username,
        type: "multi",
      }))
      navigate("/multi/room")
    }
  }

  const throwError = (error:string) => {
    setButtonStatus("active")
    setError(error)
    return false
  }

  return (
    <div className='w-full h-screen flex flex-col justify-center px-3'>
      <NavLink to="/multi/horj" className='absolute top-3 left-3 text-xl text-gray-700'><FaArrowLeft /></NavLink>
      <h2 className="w-full text-center text-2xl font-semibold">Host</h2>
      <p className="px-16 text-gray-700 text-center pb-5 border-b-2 leading-5">Host a game fast and easily by creating a room</p>
      <form onSubmit={submit} className="flex flex-col">
        <label className="mt-5">Room title</label>
        <input required disabled value={host.username} className="rounded-md p-3 bg-gray-200" />
        <span className='mt-1 mb-5 px-3 text-xs text-gray-400 font-medium'>You cannot edit your room title</span>
        <InputField value={passcode} func={setPasscode} type="text" label="Passcode" error={error} />
        <Button type="submit" content="Create Room" func={submit} status={buttonStatus} />
      </form>
    </div>
  )
}

export default Host