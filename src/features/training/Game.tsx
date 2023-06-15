import { useEffect, useState } from 'react'
import { GenerateQuestions } from '../../helpers/GenerateQuestions'

const Game = () => {

  const [questions, setQuestions] = useState<any>([])
  const [questionNumber, setQuestionNumber] = useState<number>(0)
  const [status, setStatus] = useState("Loading...")
  const [userAnswer, setUserAnswer] = useState<any>("")
  const [score, setScore] = useState(0);
  const time = 60000;

  useEffect(() => {
    let localQuestions:any = []
    for (let i = 0; i < 100; i++) {
      localQuestions = [...localQuestions, GenerateQuestions()]
    }
    console.log(localQuestions)
    setQuestions(localQuestions)
    setTimeout(() => {
      setStatus("Ready!")
      setTimeout(() => {
        startTime()
      }, 1000)
    }, 3000)
  }, [])

  const startTime = () => {
    const timer = document.getElementById("timer")
    let localTime = time;
    const interval = setInterval(() => {
      if (timer && localTime > 0) {
        timer.style.width = `${100 - ((localTime/time) * 100)}%`
        localTime = localTime - 200
      } else {
        clearInterval(interval)
        endGame()
      }
    }, 200)
  }

  const endGame = () => {
    setStatus("End!")
    setUserAnswer("End of Game")
  }

  const changeUserAnswer = (answer:string) => {
    if (status === "End!") {
      setUserAnswer(answer);
      if (answer.length === questions[questionNumber].answer.toString().length) {
        if (answer == questions[questionNumber].answer) {
          setScore(score + 5)
        } else {}
        setUserAnswer("")
        setQuestionNumber(questionNumber + 1)
      } else {}
    }
  }

  if (status !== "Loading...") {
    return (
      <div className='bg-gray-700 h-screen w-full flex justify-center items-center lg:py-16 lg:px-24'>
        <div id="timer" className='h-2 absolute top-0 left-0 bg-green-700 flex justify-end rounded-full'>
        </div>
        <div className='h-full w-full text-white flex flex-col justify-between pt-24 items-center gap-2 lg:shadow-lg lg:rounded-xl lg:bg-gray-900'>
          <div className='flex flex-col items-center gap-4'>
            <p className='flex gap-1 font-bold text-5xl items-center'>
              <span>{questions[questionNumber].firstNumber}</span>
              <span>{questions[questionNumber].operation}</span>
              <span>{questions[questionNumber].secondNumber}</span>
            </p>
            <p className='text-center skew-x-[-12deg] rounded-md flex justify-center items-center text-black bg-white w-44 h-[75px] font-bold text-2xl'>{userAnswer}</p>
          </div>
          <div className='w-full h-[65%] flex flex-col items-start'>
            <p className='py-4 px-10 text-2xl font-bold bg-gray-800 rounded-t-xl'>Score: {score}</p>
            <div className="w-full bg-gray-800 h-full grid grid-cols-3 grid-rows-4 font-bold text-xl gap-4 p-4">
              <button onClick={() => changeUserAnswer(`${userAnswer}7`)} className='bg-gray-700 rounded-md'>7</button>
              <button onClick={() => changeUserAnswer(`${userAnswer}8`)} className='bg-gray-700 rounded-md'>8</button>
              <button onClick={() => changeUserAnswer(`${userAnswer}9`)} className='bg-gray-700 rounded-md'>9</button>
              <button onClick={() => changeUserAnswer(`${userAnswer}4`)} className='bg-gray-700 rounded-md'>4</button>
              <button onClick={() => changeUserAnswer(`${userAnswer}5`)} className='bg-gray-700 rounded-md'>5</button>
              <button onClick={() => changeUserAnswer(`${userAnswer}6`)} className='bg-gray-700 rounded-md'>6</button>
              <button onClick={() => changeUserAnswer(`${userAnswer}1`)} className='bg-gray-700 rounded-md'>1</button>
              <button onClick={() => changeUserAnswer(`${userAnswer}2`)} className='bg-gray-700 rounded-md'>2</button>
              <button onClick={() => changeUserAnswer(`${userAnswer}3`)} className='bg-gray-700 rounded-md'>3</button>
              <button onClick={() => changeUserAnswer(`${userAnswer}0`)} className='bg-orange-800 col-span-2 rounded-md'>0</button>
              <button onClick={() => changeUserAnswer(`${userAnswer}-`)} className='bg-gray-700 rounded-md'>-</button>
            </div>
          </div>
        </div>
      </div>
    )
  } else {
    return "Loading..."
  }
}

export default Game