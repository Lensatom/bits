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

  if (!loaded) {
    return (
      <div className='w-full h-screen'>
        <Loader />
      </div>
    )
  }

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
}

export default App
