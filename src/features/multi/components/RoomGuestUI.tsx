import { useState, useEffect } from "react"
// import Button from "../../../components/Button";
import Player from "./Player";
import { GetData, UpdateData } from "../../../firebase/firestore";

type Props = {
  room: any
  userData: any
  players: any
}

const RoomGuestUI = (props:Props) => {

  const { room, userData, players } = props;
  const [ready, setReady] = useState(false)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const data = await GetData(`hosting/${room.id}/players`, userData.username)
    setReady(data ? data.ready : false)
  }

  const iAmReady = async () => {
    await UpdateData(`hosting/${room.id}/players`, userData.username, {ready: true})
    setReady(true)
  }

  return (
    <div className='w-full h-screen flex flex-col justify-center px-3'>
      <h2 className='text-2xl font-semibold'>Room</h2>
      <p className="pb-5 border-b-2">Welcome to {room.title}</p>
      <p className="pt-5">Connected players</p>
      <div className="grid grid-cols-3 gap-3 mt-3 h-[50%] overflow-y-scroll py-2">
        {players.map((player:any) => {
          return (
            <Player player={player} />
          )
        })}
      </div>
      {/* <Button type="click" func={iAmReady} status={ready ? "inActive" : "active"} content={ready ? "Waiting..." : "Ready"} /> */}
    </div>
  )
}

export default RoomGuestUI