import { AiFillStar } from 'react-icons/ai'
import { FaArrowLeft } from 'react-icons/fa'
import { MdRestartAlt } from 'react-icons/md'
import Button from './Button'
import { NavLink } from 'react-router-dom'
import { onSnapshot } from 'firebase/firestore'
import { useEffect, useState } from 'react'
import { GetPlayers } from '../firebase/firestore'

type Props = {
  variant: "train" | "multi" | "world"
  score?: number
  questionCount?: number
  restartGame?: () => void
  id?: string
}

const EndGame = (props:Props) => {
  const { variant, restartGame, id } = props;
  const [players, setPlayers] = useState([])

  useEffect(() => {
    if (variant === "multi" && id) {
      getPlayers()
    }
  }, [])

  const getPlayers = async () => {
    // @ts-ignore : Because id will alwyas be defined
    const players = await GetPlayers(id);
    onSnapshot(players, async (snapshot) => {
      const players:any = []
      snapshot.forEach((doc:any) => {
        players.push(doc.data())
      })
      players.sort((x:any, y:any) => (x.score < y.score) ? 1 : (x.score > y.score) ? -1 : 0)
      setPlayers(players)
    })
  }

  if (variant == "train") {
    return (
      <div className='w-full h-screen px-3 flex flex-col justify-center'>
        <div className='w-full h-[40%] bg-orange-600 flex flex-col items-center px-3 rounded-lg'>
          <div className='flex items-center gap-1 mt-2'>
            <AiFillStar className="text-orange-400 text-3xl mt-4" />
            <AiFillStar className="text-orange-400 text-5xl mt-2" />
            <AiFillStar className="text-orange-400 text-3xl mt-4" />
          </div>
          <h2 className='text-3xl font-semibold text-white mt-2'>Nice Game</h2>
          <p className='font-semibold text-gray-200'>You scored</p>
          <h2 className='font-bold text-7xl mt-5 text-white'>{props.score}</h2>
          <p className='font-semibold text-orange-200 mt-1'>Points</p>
        </div>
        <div className='flex justify-between px-12 mt-[-40px]'>
          <Button type="click" status="active" className='!rounded-full !h-28 !w-28 border-8 border-white'>
            <NavLink to="/selectGame" className="flex justify-center items-center">
              <FaArrowLeft className="text-xl" />
            </NavLink>
          </Button>
          <Button type="click" func={restartGame} status="active" className='!rounded-full !h-28 !w-28 border-8 border-white flex justify-center items-center'>
            <MdRestartAlt className="text-2xl" />
          </Button>
        </div>
      </div>
    )
  } else if (variant === "multi") {
    return (
      <div className='w-full h-screen px-3 flex flex-col justify-center'>
        <div className='w-full h-[80%] bg-orange-600 flex flex-col items-center px-3 rounded-lg'>
          <div className='flex items-center gap-1 mt-2'>
            <AiFillStar className="text-orange-400 text-3xl mt-4" />
            <AiFillStar className="text-orange-400 text-5xl mt-2" />
            <AiFillStar className="text-orange-400 text-3xl mt-4" />
          </div>
          <h2 className='text-3xl font-semibold text-white mt-2'>Nice Game</h2>
          <p className='font-semibold text-gray-200'>Score board</p>
          <div className='w-full flex flex-col gap-3 mt-5'>
            {players.map((player:any) => {
              return (
                <div key={player.name} className='w-full p-3 flex overflow-hidden justify-between items-center bg-orange-200 rounded-md'>
                  <div className='flex items-center gap-3'>
                    <div className='w-16 h-16 bg-white rounded-md'></div>
                    <p className='text-lg font-semibold text-gray-900'>{player.username}</p>
                  </div>
                  <p className='pr-5 text-lg text-orange-600 font-bold'>{player.score}</p>
                </div>
              )
            })}
          </div>
        </div>
        <div className='flex justify-between px-12 mt-[-40px]'>
          <Button type="click" status="active" className='!rounded-full !h-28 !w-28 border-8 border-white'>
            <NavLink to="/selectGame" className="flex justify-center items-center">
              <FaArrowLeft className="text-xl" />
            </NavLink>
          </Button>
          <Button type="click" func={restartGame} status="active" className='!rounded-full !h-28 !w-28 border-8 border-white flex justify-center items-center'>
            <MdRestartAlt className="text-2xl" />
          </Button>
        </div>
      </div>
    )
  }
}

export default EndGame 