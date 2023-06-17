import { Routes, Route } from 'react-router-dom'
import { Home, SelectGame } from './features'
import { Game } from './features/training'

function App() {

  return (
    <>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
        <Route path="/selectgame" element={<SelectGame />} />
      </Routes>
    </>
  )
}

export default App
