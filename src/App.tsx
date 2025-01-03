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
import { getSavedUsername } from './helpers';

function App() {

  const navigate = useNavigate()
  const dispatch = useDispatch()
  // const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const username = getSavedUsername()
    if (username) {

    }
  }, [])

  // if (isLoading) return <Loader full />
  return (
    <div className='bg-white'>
      <Routes>
        <Route path="" element={<Home />}>
          <Route path="home" element={<Game />} />
          <Route path="create" element={<Game />} />
          <Route path="watch" element={<Game />} />
          <Route path="about" element={<Game />} />
        </Route>
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
