import { BiWorld } from 'react-icons/bi'
import { BsPeople } from 'react-icons/bs'
import { FaArrowLeft, FaUser } from 'react-icons/fa'
import { useNavigate } from 'react-router-dom'

const SelectGame = () => {

  const navigate = useNavigate()

  return (
    <div className='w-full h-screen flex flex-col justify-center gap-10 px-3 py-8'>
      <button className='absolute top-3 left-3 text-xl text-gray-700'><FaArrowLeft /></button>
      <h2 className='text-2xl font-bold text-gray-700 text-center'>Select Game</h2>
      <div className='bg-blue-200 rounded-md overflow-hidden skew-y-2 shadow-lg'>
        <h2 className='flex items-center gap-1 text-xl font-medium p-2 bg-blue-800 text-white'><BiWorld /> World</h2>
        <p className='px-4 py-8 font-medium text-gray-700'>
          Play against different people from different countries online and get to rank on world leaderboard.
        </p>
      </div>
      <div className='bg-green-200 rounded-md overflow-hidden skew-y-[-2deg] shadow-lg'>
        <h2 className='flex items-center gap-2 text-xl font-medium p-2 bg-green-800 text-white'><BsPeople /> Multiplayer</h2>
        <p className='px-4 py-8 font-medium text-gray-700'>
          Create your personal game room and play against your friends by sharing your unique room key code.
        </p>
      </div>
      <div onClick={() => navigate('/game')} className='bg-orange-200 rounded-md overflow-hidden skew-y-2 shadow-lg'>
        <h2 className='flex items-center gap-2 text-xl font-medium p-2 bg-orange-800 text-white'><FaUser classNme="text-md" /> Training</h2>
        <p className='px-4 py-8 font-medium text-gray-700'>
          Train yourself solo to get better and faster in simple arithemetics. Let's build for the war against calculators!
        </p>
      </div>
    </div>
  )
}

export default SelectGame