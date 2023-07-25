import  { useEffect, useState } from 'react'
import { useSelector } from "react-redux"
import { GetPlayers, GetRoom, UpdateData } from '../../firebase/firestore';
import { Loader } from '../../components';
import { onSnapshot } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import RoomHostUI from './components/RoomHostUI';
import RoomGuestUI from './components/RoomGuestUI';

const Room = () => {
  const navigate = useNavigate()

  const roomData:any = useSelector((state:any) => state.roomData);
  const userData:any = useSelector((state:any) => state.userData);
  const [room, setRoom] = useState<any>(null);
  const [players, setPlayers] = useState([])
  const [ready, setReady] = useState(false);

  useEffect(() => {
    getData()
  }, [])

  const getData = async () => {
    const rooms = await GetRoom(roomData.id, null)
    onSnapshot(rooms, (snapshot) => {
      let room:any = [];
      snapshot.forEach((doc:any) => {
        room = doc.data()
      })
      setRoom(room)
      if (room.ready === true) {
        navigate("/multi/game")
      }
      canGameStart(room)
    })
    setRoom(room)
  }

  const canGameStart = async (room:any) => {
    const players = await GetPlayers(room.id);
    onSnapshot(players, async (snapshot) => {
      const players:any = []
      snapshot.forEach((doc:any) => {
        players.push(doc.data())
      })
      setPlayers(players)
      if (players.length === 1) {
        setReady(false)
      } else {
        let ready = true;
        players.map((player:any) => {
          if (player.ready === false) {
            ready = false;
          }
        })
        setReady(ready)
      }
    })
  }

  const start = async () => {
    await UpdateData("hosting", room.hostId, {ready: true})
    navigate('/multi/game')
  }

  if (room && room.host === userData.username) {
    return <RoomHostUI room={room} userData={userData} start={start} ready={ready} players={players} />
  } else if (room && room.host !== userData.username) {
    return <RoomGuestUI room={room} userData={userData} players={players} />
  } else {
    return (
      <div className='w-full h-screen'>
        <Loader message="Setting up room" />
      </div>
    ) 
  }
}

export default Room