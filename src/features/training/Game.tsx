import { useEffect, useState } from 'react'
import { CountDown, EndGame, Loader, StartGame } from '../../components'
import { GetQuestions } from '../../helpers/GetQuestions'

const Game = () => {
  const [questions, setQuestions] = useState<any>([])
  const [status, setStatus] = useState<string>("loading")
  const [score, setScore] = useState<number>(0)
  const [questionCount, setQuestionCount] = useState<number>(0)
  const time = 60000;

  useEffect(() => {
    if (status === "loading") {
      setQuestions(GetQuestions((time / 1000) * 3));
      setStatus('ready');
    }
  }, [status])

  const startGame = () => {
    setStatus('start')
  }

  const endGame = (score:number, questionCount:number) => {
    setScore(score)
    setQuestionCount(questionCount)
    setStatus("end")
  }

  const restartGame = () => {
    setStatus('loading')
  }

  if (status === 'ready') {
    return <CountDown from={3} startGame={startGame} />
  } else if (status === 'start') {
    return <StartGame questions={questions} time={time} endGame={endGame} />
  } else if (status === 'end') {
    return <EndGame variant="train" score={score} questionCount={questionCount} restartGame={restartGame} />
  } else {
    return (
      <div className='w-full h-screen flex justify-center items-center'>
        <Loader message="Please wait a moment" />
      </div>
    )
  }
}

export default Game