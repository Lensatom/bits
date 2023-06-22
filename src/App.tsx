import { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Home, Login, Register, SelectGame } from './features'
import { Game } from './features/training'
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useDispatch } from 'react-redux';
import { GetUser } from './redux/action';
import { GetData } from './firebase/firestore';
import { Horj } from './features/multi';
import Host from './features/multi/Host';

function App() {

  const navigate = useNavigate()
  const dispatch = useDispatch()

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const uid = user.uid;
        let data = await GetData("users", uid);
        if (data === null) {
          navigate("/login")
        } else {
          dispatch(GetUser(data))
        }
      } else {
        navigate("/login")
        console.log("Hi")
      }
    })
  }, [])

  return (
    <>
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
        </Route>
      </Routes>
    </>
  )
}

export default App
