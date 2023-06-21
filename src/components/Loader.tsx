import LoaderAnimation from '../assets/loader.gif'

type Props = {
  message?: string
}

const Loader = (props:Props) => {

  const { message } = props;

  return (
    <div className='w-full h-screen flex flex-col justify-center items-center'>
      <img src={LoaderAnimation} />
      <p className='text-sm font-medium text-gray-700 mt-[-30px]'>{message}</p>
    </div>
  )
}

export default Loader