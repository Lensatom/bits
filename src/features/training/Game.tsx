import { useEffect, useState } from 'react'
import { GenerateQuestions } from '../../helpers/GenerateQuestions'

const Game = () => {

  const [questions, setQuestions] = useState<any>([])
  const [questionNumber, setQuestionNumber] = useState<number>(0)
  const [status, setStatus] = useState("Loading...")
  const [userAnswer, setUserAnswer] = useState<any>()
  const [score, setScore] = useState(0)

  useEffect(() => {
    let localQuestions:any = []
    for (let i = 0; i < 100; i++) {
      localQuestions = [...localQuestions, GenerateQuestions()]
    }
    console.log(localQuestions)
    setQuestions(localQuestions)
    setTimeout(() => {
      setStatus("Ready!")
    }, 3000)
  }, [])

  const changeUserAnswer = (e:any) => {
    const answer = e.target.value
    setUserAnswer(answer);
    if (answer.length === questions[questionNumber].answer.toString().length) {
      if (answer == questions[questionNumber].answer) {
        setScore(score + 5)
      } else {}
      setUserAnswer("")
      setQuestionNumber(questionNumber + 1)
    } else {}
  }

  if (status === "Ready!") {
    return (
      <div className='bg-gray-700 h-screen w-full flex justify-center items-center lg:py-16 lg:px-24'>
        <div className='h-full w-full text-white flex flex-col justify-between pt-24 items-center gap-2 lg:shadow-lg lg:rounded-xl lg:bg-gray-900'>
          <div className='flex flex-col items-center gap-2'>
            <p className='flex gap-1 font-medium text-3xl items-center'>
              <span>{questions[questionNumber].firstNumber}</span>
              <span>{questions[questionNumber].operation}</span>
              <span>{questions[questionNumber].secondNumber}</span>
            </p>
            {/* <p>Score: {score}</p> */}
            <input type="number" id="inputField" value={userAnswer} onChange={changeUserAnswer} className='text-center rounded-md text-black w-28 py-2 font-medium text-lg'/>
          </div>
          <div className='w-full h-[65%] bg-gray-900 rounded-t-lg'>

          </div>
        </div>
      </div>
    )
  } else {
    return "Loading..."
  }
}

export default Game