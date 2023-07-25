
const Player = (props:any) => {

  const { player } = props;

  return (
    <div className="relative bg-gray-100 h-28 rounded-md overflow-hidden px-2">
      {player.ready ? <span className='text-xs font-medium text-green-600'>Ready</span> : <span className='text-xs font-medium text-yellow-600'>Not ready</span>}
      <p className='absolute left-0 w-full flex flex-col items-center text-center bottom-0 bg-gray-600 text-white opacity-90 text-xs font-medium py-2'>
        {player.name}
      </p>
    </div>
  )
}

export default Player