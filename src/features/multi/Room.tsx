import  { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import { GetRoom, UpdateData } from '../../firebase/firestore';
import { Loader } from '../../components';
import { onSnapshot } from 'firebase/firestore';


const Room = () => {

  const roomData:any = useSelector((state:any) => state.roomData);
  const userData:any = useSelector((state:any) => state.userData);
  const [room, setRoom] = useState<any>(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const q = await GetRoom(roomData.id, null)
    let rooms:any = []
    onSnapshot(q, async (snapshot) => {
      snapshot.docs.forEach((doc:any) => {
        rooms.push({...doc.data()})
      })
      const room = rooms[rooms.length - 1]
      setRoom(room)
      if (room.players.length === 1) {
        setReady(false)
      } else {
        let ready = true;
        room.players.map((player:any) => {
          if (player.ready === false) {
            ready = false;
          }
        })
        setReady(ready)
      }
    })
  }

  const iAmReady = () => {
    let players:any = [];
    room.players.map((player:any) => {
      if (player.name === userData.username) {
        players.push({
          ...player,
          ready: true
        })
      } else {
        players.push(player)
      }
    })
    UpdateData("hosting", room.hostId, {players: players})
  }

  if (room === null) {
    return (
      <div className='w-full h-screen'>
        <Loader message="Setting up room" />
      </div>
    ) 
  } else {
    if (room.host === userData.username) {
      return (
        <div className='w-full h-screen flex flex-col justify-center px-3'>
          <h2 className='text-2xl font-semibold'>Room</h2>
          <p className="pb-5 border-b-2">You are now hosting</p>
          <p className="mt-5">Room title: {room.title}</p>
          <p>Passcode: {room.passcode}</p>
          <p>Host: {userData.username}</p>
          <p className="mt-5 border-t-2 pt-5">Connected players</p>
          <div className="grid grid-cols-3 gap-3 mt-3 h-[50%] overflow-y-scroll py-2">
            {room.players.map((player:any) => {
              return (
                <div className="relative bg-gray-100 h-28 rounded-md overflow-hidden">
                  <p className='absolute w-full text-center bottom-0 bg-gray-600 text-white opacity-90 text-xs font-medium py-2'>{player.name}</p>
                </div>
              )
            })}
          </div>
          <button className="bg-orange-700 py-3 text-white font-medium rounded-md mt-5">{ready ? "Ready" : "Waiting..."}</button>
        </div>
      )
    } else {
      return (
        <div className='w-full h-screen flex flex-col justify-center px-3'>
          <h2 className='text-2xl font-semibold'>Room</h2>
          <p className="pb-5 border-b-2">Welcome to {room.title}</p>
          <p className="pt-5">Connected players</p>
          <div className="grid grid-cols-3 gap-3 mt-3 h-[50%] overflow-y-scroll py-2">
            {room.players.map((player:any) => {
              return (
                <div className="relative bg-gray-100 h-28 rounded-md overflow-hidden">
                  <p className='absolute w-full text-center bottom-0 bg-gray-600 text-white opacity-90 text-xs font-medium py-2'>{player.name}</p>
                </div>
              )
            })}
          </div>
          <button onClick={iAmReady} className="bg-orange-700 py-3 text-white font-medium rounded-md mt-5">Ready</button>
        </div>
      )
    }
  }

}

export default Room