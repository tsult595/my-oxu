
import Logo from '../assets/logo.svg'
import XariBulBul from '../assets/khari-bulbul.webp'
import Image from "next/image";
import Button from './ui/Button';
import { Glasses, Menu } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getCategories} from '../api/categoryApi';
import Link from 'next/link';

const Header = () => {
  const { data: categoriesData, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  })
  
 
  return (
    <>
      <div className='w-full m-auto h-20 bg-white flex items-center justify-between px-6 border-b border-gray-100'>
        
        {/* Логотипы */}
        <div className='flex items-center gap-4 flex-shrink-0'>
          <Image src={Logo} alt='logo' width={90} height={40} priority />
          <Image src={XariBulBul} alt='xari-bulbul' width={40} height={40} priority />
        </div>
        
        <nav className='hidden md:flex items-center gap-1 mx-4 overflow-x-auto scrollbar-none'>
          <Button className='px-3 py-1 bg-red-500 rounded-full text-white text-xs font-bold mr-2 animate-pulse'>
            LIVE
          </Button>

          {isLoading ? (
            <span className="text-gray-400 text-sm px-4">Загрузка категорий...</span>
          ) : (
            categoriesData.map((item) => (
              <Link
                key={item._id}
                href={`/categories/${item._id}`}
                className="rounded-lg px-3 py-1.5 text-sm font-semibold text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-all whitespace-nowrap"
              >
                {item.name}
              </Link>
            ))
          )}

           <Button  className='px-3 py-1 bg-red-500 rounded-full text-white text-xs font-bold mr-2 animate-pulse'>
            <Link href="/login">
              LOGIN
            </Link>
          </Button>
         
        </nav>

        {/* Правая панель (Иконки) */}
        <div className='flex items-center gap-4 flex-shrink-0 text-gray-500'>
          <Glasses className='cursor-pointer hover:text-gray-800 transition-colors' size={22}/>
          <Menu className='cursor-pointer hover:text-gray-800 transition-colors' size={22}/>
        </div>
      
      </div>
    </>
  )
}

export default Header