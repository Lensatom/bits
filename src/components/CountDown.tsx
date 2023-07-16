import { useEffect, useState, useRef } from 'react'

type Props = {
  from: number
  startGame: () => void
}

const CountDown = (props:Props) => {
  const [count, setCount] = useState(props.from);
  const timerId = useRef()
  const { startGame } = props;

  useEffect(() => {
    // @ts-ignore
    timerId.current = setInterval(() => {
      setCount(prev => prev - 1)
    }, 1000)
    return () => clearInterval(timerId.current)
  }, [])

  useEffect(() => {
    if (count < 0) {
      startGame()
    }
  }, [count])

  return (
    <div className='w-full h-screen flex justify-center items-center text-4xl font-bold animate-pulse text-orange-600'>
      {count === 0 ? "GO!" : count}
    </div>
  )
}

export default CountDown