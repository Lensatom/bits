import { useSelector } from "react-redux"
import { GetRoom, UpdateData } from "../../firebase/firestore"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { SaveRoom } from "../../redux/action"
import { useNavigate } from "react-router-dom"
import { Loader } from "../../components"
import { onSnapshot } from "firebase/firestore"

const Rooms = () => {

  const state:any = useSelector((state:any) => state.roomData)
  const userData:any = useSelector((state:any) => state.userData)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [rooms, setRooms] = useState<any>(null)

  useEffect(() => {
    getRooms()
  }, [])

  const getRooms = async () => {
    console.log(state)
    const q = await GetRoom(state.title, state.passcode)
    let rooms:any = []
    onSnapshot(q, async (snapshot) => {
      snapshot.docs.forEach((doc:any) => {
        rooms.push({...doc.data()})
      })
      setRooms(rooms)
    })
  }

  const joinRoom = async (id:string) => {
    const room = rooms.filter((room:any) => room.hostId === id)[0];
    const players = []
    room.players.map((player:any) => {
      if (player.name !== userData.username) {
        players.push(player)
      }
    })
    players.push(
      {
        name: userData.username,
        avatar: userData.avatar
      }
    )
    await UpdateData("hosting", id, {...room, players: players})
    const data = {
      id: id,
      host: false,
    }
    await UpdateData("users", userData.uid, {multiStatus: data})
    dispatch(SaveRoom(data))
    navigate("/multi/room")
  }


  if (rooms === null) {
    return (
      <div className="w-full h-screen">
        <Loader message="Looking for room"/>
      </div>
    )
  } else {
    return (
      <div className="w-full h-screen flex flex-col justify-center px-3">
        <h2 className="text-2x font-semibold pb-5 border-b-2">Room</h2>
        <div className="h-1/2 pt-5">
          {rooms?.map((room:any) => {
            return (
              <div onClick={() => joinRoom(room.hostId)} className="p-3 bg-gray-100 rounded-md">
                <h2 className="font-medium">{room.title}</h2>
                <p className="text-xs font-medium text-orange-700">By {room.host}</p>
              </div>
            )
          })}
        </div>
      </div>
    )
  }
}

export default Rooms