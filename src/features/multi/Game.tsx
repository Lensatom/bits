import { useEffect, useState } from 'react'
import { CountDown, EndGame, Loader, StartGame } from '../../components'
import { GetQuestions } from '../../helpers/GetQuestions'
import { GetRoom, UpdateData } from '../../firebase/firestore'
import { useSelector } from 'react-redux'
import { onSnapshot } from 'firebase/firestore'

const Game = () => {
  const userData:any = useSelector((state:any) => state.userData);
  const roomData:any = useSelector((state:any) => state.roomData);
  const [room, setRoom] = useState<any>([])
  const [status, setStatus] = useState<string>("loading")
  const time = 60000;

  useEffect(() => {
    if (status === "loading") {
      const questions = GetQuestions((time / 1000) * 3);
      postQuestions(questions)
      getUpdates()
      setStatus('ready');
    }
  }, [status])

  const postQuestions = async (questions:any) => {
    await UpdateData("hosting", roomData.id, {questions: questions})
  }

  const getUpdates = async () => {
    const room = await GetRoom(roomData.id, null)
    onSnapshot(room, async (snapshot) => {
      let rooms:any = []
      snapshot.docs.forEach((doc:any) => {
        rooms.push({...doc.data()})
      })
      const data = rooms[rooms.length - 1]
      setRoom(data);
    })
  }

  const startGame = () => {
    setStatus('start')
  }

  const endGame = async (score:number, questionCount:number) => {
    setStatus("updating")
    await UpdateData(`hosting/${room.id}/players`, userData.username, {
      score,
      questionCount
    })
    setStatus("end")
  }

  const restartGame = () => {
    setStatus('loading')
  }

  if (status === 'ready') {
    return <CountDown from={3} startGame={startGame} />
  } else if (status === 'start') {
    return <StartGame questions={room.questions} time={time} endGame={endGame} />
  } else if (status === 'end') {
    return <EndGame variant="multi" restartGame={restartGame} id={room.id} />
  } else {
    return (
      <div className='w-full h-screen flex justify-center items-center'>
        <Loader message="Please wait a moment" />
      </div>
    )
  }
}

export default Game