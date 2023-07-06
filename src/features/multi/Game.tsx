import { useEffect, useState } from 'react'
import { GenerateQuestions } from '../../helpers/GenerateQuestions';
import { useSelector } from 'react-redux';
import { GetRoom, UpdateData } from '../../firebase/firestore';
import { onSnapshot } from 'firebase/firestore';
import { Loader, NumberPad } from '../../components';
import { NavLink } from 'react-router-dom';
import { BiTime } from 'react-icons/bi';
import { BsCheck } from 'react-icons/bs';

const Game = () => {

  const roomData:any = useSelector((state:any) => state.roomData);
  const userData:any = useSelector((state:any) => state.userData);
  const [status, setStatus] = useState("Waiting...")
  const [questions, setQuestions] = useState<any>([])
  const [questionNumber, setQuestionNumber] = useState<number>(0)
  const [userAnswer, setUserAnswer] = useState<any>("")
  const [score, setScore] = useState(0);
  const [count, setCount] = useState(3);
  const [room, setRoom] = useState<any>(null);
  const time = 60000;
  
  useEffect(() => {
    if (status === "Waiting...") {
      setStatus("Loading!")
      getData()
    }
    if (status === "Climax!" && room) {
      let players:any = [];
      room.players.map((player:any) => {
        if (player.name === userData.username) {
          players.push({
            ...player,
            score: score,
            attempts: questionNumber,
            passed: score / 5,
            failed: (questionNumber) - (score / 5)
          })
        } else {
          players.push(player)
        }
      })
      UpdateData("hosting", room.hostId, {players: players})
      setStatus("End!")
    }
  }, [status, room])
  
  const getData = async () => {
    let updateCount = 0
    let localQuestions:any = []
    for (let i = 0; i < 500; i++) {
      localQuestions = [...localQuestions, GenerateQuestions()]
    }
    await UpdateData("hosting", roomData.id, {questions: localQuestions})
    const q = await GetRoom(roomData.id, null)
    let rooms:any = []
    onSnapshot(q, async (snapshot) => {
      snapshot.docs.forEach((doc:any) => {
        rooms.push({...doc.data()})
      })
      // Get room
      console.log(rooms)
      const room = rooms[rooms.length - 1]
      setRoom(room)
      updateCount++
      if (updateCount === 1) {
        if (room.questions) {
          setQuestions(room.questions)
          setTimeout(() => {
            setStatus("Ready!")
            setTimeout(() => {
              startTime()
            }, 5000)
          }, 3000)
        }
      }
    })
  }

  const startTime = () => {
    let localTime = time;
    const timer = document.getElementById("timer")
    const interval = setInterval(() => {
      if (timer && localTime >= 1000) {
        timer.innerText = `${localTime / 1000}s`
        localTime = localTime - 1000
      } else {
        endGame()
        clearInterval(interval)
      }
    }, 1000)
    const timeOut = setTimeout(() => {
      if (timer) {
        timer.style.color = "red";
        timer.style.fontSize = "20px"
        timer.style.fontWeight = "bolder"
        timer.style.animation = "pulse 1s infinite"
      }
      clearTimeout(timeOut)
    }, 51000)
  }

  const endGame = async () => {
    setStatus("Climax!")
  }

  const changeUserAnswer = (answer:string) => {
    setUserAnswer(answer)
  }

  const submitUserAnswer = () => {
    if (status !== "End!") {
      const container = document.getElementById("container")
      if (userAnswer == questions[questionNumber].answer) {
        if (container) {
          container.style.animation = "success .5s forwards"
        }
        setScore(score + 5)
      } else {
        if (container) {
          container.style.animation = "fail .5s forwards"
        }
      }
      setUserAnswer("")
      setQuestionNumber(questionNumber + 1)
      if (container) {
        setTimeout(() => {
          container.style.animation = "none"
        }, 500)
      }
    }
  }

  if (status === "Start!") {
    return (
      <div id="container" className='bg-white h-screen w-full flex flex-col justify-between items-center lg:py-16 lg:px-24'>
        <div className='w-full py-2 flex justify-between px-3 text-lg font-medium'>
          <p className='flex items-center gap-1'>
            <BiTime />
            <span id="timer"></span>
          </p>
          <p className='flex items-center gap-1'>
            <BsCheck />
            <span>{score}</span>
          </p>
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
        <NumberPad
          userAnswer={userAnswer}
          setUserAnswer={changeUserAnswer}
          submitUserAnswer={submitUserAnswer}
        />
      </div>
    )
  } else if (status === "Ready!") {
    const interval = setInterval(() => {
      setCount(count - 1)
      if (count === 0) {
        setStatus("Start!")
        clearInterval(interval)
      }
    }, 1000)
    return (
      <div className='w-full h-screen flex justify-center items-center'>
        <p className='text-xl font-medium'>{count === 0 ? "GO!" : count}</p>
      </div>
    )
  } else if (status === "End!") {

    const players = room.players;
  
    return (
      <div className='w-full h-screen flex flex-col justify-center items-center gap-4 px-3'>
        <h2 className='text-3xl font-semibold'>Nice game!</h2>
        <table>
          <thead>
            <tr>
              <th>User</th>
              <th>A</th>
              <th>F</th>
              <th>P</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {players.map((player:any) => {
              return (
                <tr key={player.name}>
                  <td>{player.name}</td>
                  <td>{player.attempts}</td>
                  <td>{player.failed}</td>
                  <td>{player.passed}</td>
                  <td>{player.score}</td>
                </tr>
              )
            })}
          </tbody>
        </table>
        <NavLink to="/selectGame" className="px-10 py-3 bg-orange-700 text-white rounded-md font-medium">Back</NavLink>
      </div>
    )
  } else {
    return (
      <div className='w-full h-screen'>
        <Loader />
      </div>
    )
      
  }
}

export default Game