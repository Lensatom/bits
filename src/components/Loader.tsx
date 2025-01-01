import LoaderAnimation from '../assets/loader.gif'

type Props = {
  message?: string;
  full?: boolean
}

const Loader = ({
  message,
  full
}:Props) => {

  return (
    <div className={`${full ? "h-screen" : "h-full"} w-full flex flex-col justify-center items-center`}>
      <img src={LoaderAnimation} />
      <p className='text-sm font-medium text-gray-700 mt-[-30px]'>{message}</p>
    </div>
  )
}

export default Loader