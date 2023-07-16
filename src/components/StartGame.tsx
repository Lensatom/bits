import { useEffect, useState,useRef } from 'react'
import { NumberPad } from '.'
import { BiTime } from 'react-icons/bi'
import { BsCheck } from 'react-icons/bs'
import { AnswerReaction } from '../helpers/AnswerReaction'

type Props = {
  questions: any
  time: number
  endGame: (a:number, b:number) => void
}

const StartGame = (props:Props) => {
  const [userAnswer, setUserAnswer] = useState<string>("")
  const [questionNumber, setQuestionNumber] = useState<number>(0)
  const [score, setScore] = useState<number>(0)
  const [time, setTime] = useState(props.time / 1000);
  const { questions, endGame } = props;
  const timerId = useRef();

  useEffect(() => {
    // @ts-ignore
    timerId.current = setInterval(() => {
      setTime(prev => prev - 1)
    }, 1000)
    return () => clearInterval(timerId.current)
  }, [])

  useEffect(() => {
    if (time < 0) {
      endGame(score, questionNumber)
    }
  }, [time])

  const submitUserAnswer = () => {
    if (userAnswer == questions[questionNumber].answer) {
      setScore(score + 1)
      AnswerReaction("passed")
    } else {
      AnswerReaction("failed")
    }
    setUserAnswer('')
    setQuestionNumber(questionNumber + 1)
  }

  return (
    <div id="gamePage" className='bg-white h-screen w-full flex flex-col justify-between items-center lg:py-16 lg:px-24'>
      <div className='w-full py-2 flex justify-between px-3 text-lg font-medium'>
        <p className='flex items-center gap-1'>
          <BiTime />
          <span id="timer">{time}</span>
        </p>
        <p className='flex items-center gap-1'>
          <BsCheck />
          <span>{score}</span>
        </p>
      </div>
      <div className='flex flex-col items-center gap-4 text-gray-900'>
        <p className='flex gap-1 font-bold text-5xl items-center'>
          <span>{questions[questionNumber].firstNumber}</span>
          <span>{questions[questionNumber].operator}</span>
          <span>{questions[questionNumber].secondNumber}</span>
          <span>=</span>
          <span className=''>{userAnswer ? userAnswer : "?"}</span>
        </p>
      </div>
      <NumberPad
        userAnswer={userAnswer}
        setUserAnswer={setUserAnswer}
        submitUserAnswer={submitUserAnswer}
      />
    </div>
  )
}

export default StartGame