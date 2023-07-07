import { useSelector } from "react-redux"
import { GetRoom, UpdateData } from "../../firebase/firestore"
import { useEffect, useState } from "react"
import { useDispatch } from "react-redux"
import { SaveRoom } from "../../redux/action"
import { NavLink, useNavigate } from "react-router-dom"
import { Loader } from "../../components"
import { onSnapshot } from "firebase/firestore"
import Button from "../../components/Button"

const Rooms = () => {

  const state:any = useSelector((state:any) => state.roomData)
  const userData:any = useSelector((state:any) => state.userData)
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const [rooms, setRooms] = useState<any>(null)
  const [buttonStatus, setButtonStatus] = useState("active")

  useEffect(() => {
    getRooms()
  }, [])

  const getRooms = async () => {
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
    setButtonStatus("loading")
    const room = rooms.filter((room:any) => room.hostId === id)[0];
    const players = []

    // Download current users
    room.players.map((player:any) => {
      if (player.name !== userData.username) {
        players.push(player)
      }
    })

    // Upload/update this user
    players.push(
      {
        name: userData.username,
        avatar: userData.avatar,
        ready: false
      }
    )

    await UpdateData("hosting", id, {...room, players: players})
    const data = {
      id: id,
      type: "multi",
    }
    await UpdateData("users", userData.uid, {gameStatus: data})
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
        <div className="h-1/2 pt-5 gap-2 w-full">
          {rooms.length > 0 ?
            rooms?.map((room:any) => {
              return (
                <div className="flex flex-col gap-2">
                  <h2 className="font-medium text-xl">{room.title}'s Game</h2>
                  <Button type="click" func={() => joinRoom(room.hostId)} status={buttonStatus} content="Join Game Now" />
                </div>
              )
            }) :
            <>
              <h2 className="font-medium text-xl text-orange-600">Sorry,</h2>
              <p className="mb-3">Info provided does not match with any room</p>
              <Button status="active">
                <NavLink to="/multi/join">Go back</NavLink>
              </Button>
            </>
          }
        </div>
      </div>
    )
  }
}

export default Rooms