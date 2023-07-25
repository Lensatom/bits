import { useEffect, useState } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Home, Login, Register, SelectGame } from './features'
import { Game } from './features/training'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { GetUser, SaveRoom } from './redux/action';
import { GetData } from './firebase/firestore';
import { Horj, Host, Join, Game as MultiGame, Room } from './features/multi';
import { Loader } from './components';
import { MdWarning } from 'react-icons/md';

function App() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        let data = await GetData("users", uid);
        if (data === null) {
          navigate("/login")
          setLoaded(true)
        } else {
          dispatch(GetUser(data))
          dispatch(SaveRoom(data.gameStatus))
          setLoaded(true);
        }
      } else {
        navigate("/login")
        setLoaded(true)
      }
    })
  }, [])

  if (window.innerWidth > 500) {
    return (
      <div className='w-full h-screen flex flex-col gap-2 justify-center items-center text-xl font-medium text-gray-600'>
        <MdWarning className="text-4xl" />
        Uclid works best on a mobile device
        <p className='text-sm font-normal'>Open this site on your phone</p>
      </div>
    )
  } else if (loaded) {
    return (
      <div className='bg-white'>
        <Routes>
          <Route path="" element={<Home />} />
          <Route path="login" element={<Login />} />
          <Route path="register" element={<Register />} />
          <Route path="selectgame" element={<SelectGame />} />
          <Route path="train">
            <Route path="game" element={<Game />} />
          </Route>
          <Route path="multi">
            <Route path="horj" element={<Horj />} />
            <Route path="host" element={<Host />} />
            <Route path="join" element={<Join />} />
            <Route path="room" element={<Room />} />
            <Route path="game" element={<MultiGame />} />
          </Route>
        </Routes>
      </div>
    )
  } else {
    return (
      <div className='w-full h-screen'>
        <Loader />
      </div>
    )
  }
}

export default App
