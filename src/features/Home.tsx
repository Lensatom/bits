import { useState } from 'react'
import { FaChartBar, FaHome, FaToolbox, FaTrophy } from 'react-icons/fa'
import Penguin from '../assets/tiger.gif'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Loader } from '../components'
import { useDispatch } from 'react-redux'
import { GetUser } from '../redux/action'

const Home = () => {

  const dispatch = useDispatch()
  const [status, setStatus] = useState("")
  const state:any = useSelector((state) => state)

  const letsGo = () => {
    setStatus("Ready!");
    dispatch(GetUser({
      ...state,
      fetched: true
    }))
  }

  if (status === "Ready!" || state?.fetched === true) {
    return (
      <div className='w-full h-screen flex flex-col justify-between'>
        <div className='py-3 text-white bg-orange-700 px-3 flex justify-between items-center'>
          <FaToolbox />
          <p className='flex items-center gap-1'>
            <FaTrophy />
            <span>500</span>
          </p>
          <FaChartBar />
        </div>
        <div className='h-full flex flex-col justify-center items-center gap-4'>
          <h2 className='text-3xl font-bold'>Hello {state.username}</h2>
          <img src={Penguin} className='w-72' />
          <p className='text-center px-8'>
            Welcome back. Our war against calculators continue today.
            We are not stopping till we win. Let's go champ!
          </p>
          <NavLink to="/selectgame" className='bg-orange-700 py-4 px-8 text-white font-medium text-lg rounded-lg'>Start Game</NavLink>
        </div>
        <div className='bg-gray-800 text-white px-3 py-4 flex justify-center gap-24 text-xl'>
          <FaHome />
        </div>
      </div>
    )
  }
  return (
    <div className='w-full h-screen flex flex-col justify-center items-center'>
      <h2 className='text-5xl font-bold text-orange-700 flex'>Uclid</h2>
      <p className='mt-1'>Built by Lens with ❤</p>
      {
        state === null ?
        <div className='absolute bottom-16 w-16 h-16'>
          <Loader />
        </div> :
        <button onClick={letsGo} className='absolute animate-pulse bottom-16 bg-orange-700 py-4 px-8 text-white font-medium text-lg rounded-lg'>Let's Go!</button>
      }
    </div>
  )
}

export default Home