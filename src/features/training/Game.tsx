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
      if (timer && localTime >= 0) {
        timer.innerText = `${localTime / 1000}s`
        localTime = localTime - 1000
      } else {
        clearInterval(interval)
        endGame()
      }
    }, 1000)
  }

  const endGame = () => {
    setStatus("End!")
    setUserAnswer("End of Game")
  }

  const submitUserAnswer = () => {
    if (status !== "End!") {
      const container = document.getElementById("container")
      if (userAnswer == questions[questionNumber].answer) {
        if (container) {
          container.style.animation = "success 1s forwards"
        }
        setScore(score + 5)
      } else {
        if (container) {
          container.style.animation = "fail 1s forwards"
        }
      }
      setUserAnswer("")
      setQuestionNumber(questionNumber + 1)
    }
  }

  if (status !== "Loading...") {
    return (
      <div id="container" className='bg-white h-screen w-full flex flex-col justify-between items-center lg:py-16 lg:px-24'>
        <div className='py-2'>
          <p id="timer" className='h-2 justify-end rounded-full'></p>
        </div>
        <div className='flex flex-col items-center gap-4 text-gray-900'>
          <p className='flex gap-1 font-bold text-5xl items-center'>
            <span>{questions[questionNumber].firstNumber}</span>
            <span>{questions[questionNumber].operation}</span>
            <span>{questions[questionNumber].secondNumber}</span>
            <span>=</span>
            <span className=''>{userAnswer ? userAnswer : "?"}</span>
          </p>
        </div>
        <div className='w-full h-[50%] flex flex-col items-start'>
          <div className="w-full h-full grid grid-cols-3 grid-rows-5 font-bold text-xl gap-4 p-4 text-white">
            <button onClick={() => setUserAnswer(`${userAnswer}7`)} className='bg-gray-700 rounded-md'>7</button>
            <button onClick={() => setUserAnswer(`${userAnswer}8`)} className='bg-gray-700 rounded-md'>8</button>
            <button onClick={() => setUserAnswer(`${userAnswer}9`)} className='bg-gray-700 rounded-md'>9</button>
            <button onClick={() => setUserAnswer(`${userAnswer}4`)} className='bg-gray-700 rounded-md'>4</button>
            <button onClick={() => setUserAnswer(`${userAnswer}5`)} className='bg-gray-700 rounded-md'>5</button>
            <button onClick={() => setUserAnswer(`${userAnswer}6`)} className='bg-gray-700 rounded-md'>6</button>
            <button onClick={() => setUserAnswer(`${userAnswer}1`)} className='bg-gray-700 rounded-md'>1</button>
            <button onClick={() => setUserAnswer(`${userAnswer}2`)} className='bg-gray-700 rounded-md'>2</button>
            <button onClick={() => setUserAnswer(`${userAnswer}3`)} className='bg-gray-700 rounded-md'>3</button>
            <button onClick={() => setUserAnswer(`${userAnswer}-`)} className='bg-gray-700 rounded-md'>-</button>
            <button onClick={() => setUserAnswer(`${userAnswer}0`)} className='bg-gray-700 rounded-md'>0</button>
            <button onClick={() => setUserAnswer("")} className='bg-gray-600 rounded-md'>C</button>
            <button onClick={submitUserAnswer} className='bg-orange-700 rounded-md col-span-3'>Enter</button>
          </div>
        </div>
      </div>
    )
  } else {
    return "Loading..."
  }
}

export default Game