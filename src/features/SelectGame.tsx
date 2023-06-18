import { BiWorld } from 'react-icons/bi'
import { BsPeople } from 'react-icons/bs'
import { FaArrowLeft, FaUser } from 'react-icons/fa'
import { NavLink, useNavigate } from 'react-router-dom'

const SelectGame = () => {

  const navigate = useNavigate()

  const worldStyle = {
    backgroundImage: "url("
  }

  return (
    <div className='w-full h-screen flex flex-col justify-center gap-10 px-3 py-8'>
      <NavLink to="/" className='absolute top-3 left-3 text-xl text-gray-700'><FaArrowLeft /></NavLink>
      <h2 className='text-2xl font-bold text-gray-700 text-center'>Select Game</h2>
      <div className='w-full overflow-x-scroll overflow-y-hidden py-12'>
        <div className='flex w-[250%] gap-5'>
          <div style={worldStyle} className='bg-blue-200 rounded-md overflow-hidden shadow-lg'>
            <h2 className='flex items-center gap-1 text-xl font-medium p-2 bg-blue-800 text-white'><BiWorld /> World</h2>
            <img className='w-full' src="https://www.dreamzone.co.in/blog/wp-content/uploads/2022/06/The-Imagination-of-Superpower-Cartoons.jpg" />
            <p className='px-4 py-8 font-medium text-gray-700'>
              Play against different people from different countries online and get to rank on world leaderboard.
            </p>
          </div>
          <div className='bg-green-200 rounded-md overflow-hidden shadow-lg'>
            <h2 className='flex items-center gap-2 text-xl font-medium p-2 bg-green-800 text-white'><BsPeople /> Multiplayer</h2>
            <img className='w-full' src="https://img.freepik.com/premium-vector/cute-couple-boy-playing-game-cartoon-vector-icon-illustration-people-technology-icon-concept-isolated-premium-vector-flat-cartoon-style_138676-3966.jpg" />
            <p className='px-4 py-8 font-medium text-gray-700'>
              Create your personal game room and play against your friends by sharing your unique room key code.
            </p>
          </div>
          <div onClick={() => navigate('/game')} className='bg-orange-200 rounded-md overflow-hidden shadow-lg'>
            <h2 className='flex items-center gap-2 text-xl font-medium p-2 bg-orange-800 text-white'><FaUser classNme="text-md" /> Training</h2>
            <img className='w-full' src="https://i.pinimg.com/originals/b0/41/ed/b041ed6928738a65269be01d7dac2c82.jpg" />
            <p className='px-4 py-8 font-medium text-gray-700'>
              Train yourself solo to get better and faster in simple arithemetics. Let's build for the war against calculators!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default SelectGame