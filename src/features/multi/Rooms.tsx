import { useSelector } from "react-redux"
import { GetRoom, UpdateData } from "../../firebase/firestore"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { SaveRoom } from "../../redux/action"
import { useNavigate } from "react-router-dom"

const Rooms = () => {

  const state:any = useSelector((state:any) => state.hostData)
  const userData:any = useSelector((state:any) => state.userData)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [rooms, setRooms] = useState<any>(null)

  useEffect(() => {
    getRooms()
  }, [])

  const getRooms = async () => {
    const rooms = await GetRoom(state.title, state.passcode)
    setRooms(rooms)
  }

  const joinRoom = async (id:string) => {
    const room = rooms.filter((room:any) => room.id === id);
    const players = room.players;
    await UpdateData("hosting", room.id, {...room, players: [players, {name:userData.username, avatar:userData.avatar}]})
    const data = {
      id: id,
      host: false,
    }
    await UpdateData("users", state.uid, {multiStatus: data})
    dispatch(SaveRoom(data))
    navigate("/multi/room")
  }

  return (
    <div className="w-full h-screen flex flex-col justify-center px-3">
      <h2 className="text-2x font-semibold pb-5 border-b-2">Room</h2>
      <div className="h-1/2">
        {rooms?.map((room:any) => {
          return (
            <div onClick={() => joinRoom(room.id)} className="p-2 bg-gray-100 rounded-md">
              <h2>{room.title}</h2>
              <p>By {room.host}</p>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default Rooms