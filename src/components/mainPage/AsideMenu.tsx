
import Button from '../ui/Button'

const AsideMenu = () => {
  return (
    <div className='w-20 h-screen bg-gray-200 flex flex-col items-center justify-start gap-4 py-4'>
     <Button className='px-3 py-1 bg-blue-900 rounded-2xl text-white'>AZ</Button>
     <Button className='px-3 py-1 bg-white rounded-2xl text-blue-900'>RU</Button>
  
    </div>
  )
}

export default AsideMenu