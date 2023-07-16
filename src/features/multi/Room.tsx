import  { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import { GetRoom, UpdateData } from '../../firebase/firestore';
import { Loader } from '../../components';
import { onSnapshot } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';


const Room = () => {

  const navigate = useNavigate()
  const roomData:any = useSelector((state:any) => state.roomData);
  const userData:any = useSelector((state:any) => state.userData);
  const [room, setRoom] = useState<any>(null);
  const [ready, setReady] = useState(false);
  const [ready3, set3Ready] = useState(false);

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
      // Get room
      const room = rooms[rooms.length - 1]
      // Check if room has started
      if (room.ready === true) {
        navigate("/multi/game")
      }
      // Check if user is an host and checks ready status if user is not
      const me = room.players.filter((player:any) => player.name === userData.username)[0]
      if (me.name !== room.host) {
        set3Ready(me.ready)
      }
      // Update room state
      setRoom(room)
      // Checks if all users are ready
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

  const start = () => {
    if (ready === false) {
      return false
    }
    UpdateData("hosting", room.hostId, {ready: true})
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
                <div className="relative bg-gray-100 h-28 rounded-md overflow-hidden px-2">
                  {player.ready ? <span className='text-xs font-medium text-green-600'>Ready</span> : <span className='text-xs font-medium text-yellow-600'>Not ready</span>}
                  <p className='absolute left-0 w-full flex flex-col items-center text-center bottom-0 bg-gray-600 text-white opacity-90 text-xs font-medium py-2'>
                    {player.name}
                  </p>
                </div>
              )
            })}
          </div>
          <button onClick={start} className="bg-orange-700 py-3 text-white font-medium rounded-md mt-5">{ready ? "Start" : "Waiting..."}</button>
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
                  <p className='absolute w-full flex flex-col items-center text-center bottom-0 bg-gray-600 text-white opacity-90 text-xs font-medium py-2'>
                    {player.name}
                    {player.ready ? <span className='text-xs font-medium text-green-600'>Ready</span> : <span className='text-xs font-medium text-yellow-600'>Not ready</span>}
                  </p>
                </div>
              )
            })}
          </div>
          <button onClick={iAmReady} className="bg-orange-700 py-3 text-white font-medium rounded-md mt-5">{ready3 ? "Waiting..." : "Ready"}</button>
        </div>
      )
    }
  }

}

export default Room