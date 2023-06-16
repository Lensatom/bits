import { Routes, Route } from 'react-router-dom'
import { Home } from './features'
import { Game } from './features/training'

function App() {

  return (
    <>
      <Routes>
      <Route path="/" element={<Home />} />
        <Route path="/game" element={<Game />} />
      </Routes>
    </>
  )
}

export default App
