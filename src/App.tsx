import { useEffect } from 'react'
import { Routes, Route, useNavigate } from 'react-router-dom'
import { Home, Login, Register, SelectGame } from './features'
import { Game } from './features/training'
import { GetCurrentUser } from './firebase/auth'

function App() {

  const navigate = useNavigate()

  useEffect(() => {
    const user = GetCurrentUser()
    if (user === null) {
      navigate("/login")
    } else {}
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
