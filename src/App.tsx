import { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Home, Login, Register, SelectGame } from './features'
import { Game } from './features/training'
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {

  const navigate = useNavigate()

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const uid = user.uid;
        return uid
      } else {
        navigate("/login")
      }
    })
  }, [])

  return (
    <>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/selectgame" element={<SelectGame />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </>
  )
}

export default App
