import { BiArrowBack } from "react-icons/bi";

type Props = {
  userAnswer: string
  setUserAnswer: any,
  submitUserAnswer: any
}

const NumberPad = (props:Props) => {

  const {
    userAnswer,
    setUserAnswer,
    submitUserAnswer
  } = props;

  return (
    <div className='w-full h-[50%] flex flex-col items-start'>
      <div className="w-full h-full grid grid-cols-3 grid-rows-5 font-bold text-2xl gap-4 p-4 text-gray-900">
        <button onClick={() => setUserAnswer(`${userAnswer}7`)} className='keys rounded-md'>7</button>
        <button onClick={() => setUserAnswer(`${userAnswer}8`)} className='keys rounded-md'>8</button>
        <button onClick={() => setUserAnswer(`${userAnswer}9`)} className='keys rounded-md'>9</button>
        <button onClick={() => setUserAnswer(`${userAnswer}4`)} className='keys rounded-md'>4</button>
        <button onClick={() => setUserAnswer(`${userAnswer}5`)} className='keys rounded-md'>5</button>
        <button onClick={() => setUserAnswer(`${userAnswer}6`)} className='keys rounded-md'>6</button>
        <button onClick={() => setUserAnswer(`${userAnswer}1`)} className='keys rounded-md'>1</button>
        <button onClick={() => setUserAnswer(`${userAnswer}2`)} className='keys rounded-md'>2</button>
        <button onClick={() => setUserAnswer(`${userAnswer}3`)} className='keys rounded-md'>3</button>
        <button onClick={() => setUserAnswer(`${userAnswer}-`)} className='keys rounded-md'>-</button>
        <button onClick={() => setUserAnswer(`${userAnswer}0`)} className='keys rounded-md'>0</button>
        <button onClick={() => setUserAnswer(`${userAnswer.slice(0, userAnswer.length - 1)}`)} className='keys text-orange-600 rounded-md flex justify-center items-center'><BiArrowBack /></button>
        <button onClick={submitUserAnswer} className='bg-orange-600 text-white rounded-md col-span-3'>Enter</button>
      </div>
    </div>
  )
}

export default NumberPad