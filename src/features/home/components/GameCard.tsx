import { Button } from "@/components/base"

interface Props {
  name: string
}

const GameCard = ({
  name
}:Props) => {
  return (
    <div className='rounded-md overflow-hidden bg-black/5'>
      <div className='w-full h-44 bg-grey.1' />
      <div className='p-4'>
        <h3 className='font-bold text-grey.1'>{name}</h3>
        <Button size="sm" className="mt-4 bg-primary/20 text-primary font-bold text-xs">Play now</Button>
      </div>
    </div>
  )
}

export default GameCard