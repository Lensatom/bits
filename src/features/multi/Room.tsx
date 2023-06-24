import  { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import { GetData } from '../../firebase/firestore';
import { Loader } from '../../components';


const Room = () => {

  const roomData:any = useSelector((state:any) => state.roomData);
  const userData:any = useSelector((state:any) => state.userData);
  const [room, setRoom] = useState<any>(null)

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const room = await GetData("hosting", roomData.id);
    setRoom(room);
  }

  if (room === null) {
    return (
      <div className='w-full h-screen'>
        <Loader message="Setting up room" />
      </div>
    ) 
  } else {
    if (roomData.host) {
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
                  <p className='absolute w-full text-center bottom-0 bg-gray-600 text-white opacity-90 font-meium py-1'>{player.name}</p>
                </div>
              )
            })}
          </div>
          <button className="bg-orange-700 py-3 text-white font-medium rounded-md mt-5">Leave</button>
        </div>
      )
    } else {
      return (
        <div className='w-full h-screen flex flex-col justify-center px-3'>
          <h2 className='text-2xl font-semibold'>Room</h2>
          <p className="pb-5 border-b-2">Welcome to {room.title}</p>
          <p className="mt-5 pt-5">Connected players</p>
          <div className="grid grid-cols-3 gap-3 mt-3 h-[50%] overflow-y-scroll py-2">
            {room.players.map((player:any) => {
              return (
                <div className="relative bg-gray-100 h-28 rounded-md overflow-hidden">
                  <p className='absolute w-full text-center bottom-0 bg-gray-600 text-white opacity-90 font-meium py-1'>{player.name}</p>
                </div>
              )
            })}
          </div>
          <button className="bg-orange-700 py-3 text-white font-medium rounded-md mt-5">Leave</button>
        </div>
      )
    }
  }

}

export default Room