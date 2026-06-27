import Logo from '../assets/logo.svg'
import XariBulBul from '../assets/khari-bulbul.webp'
import Image from "next/image";
import Button from './ui/Button';
import { Glasses, Menu } from 'lucide-react';
import { useQuery } from '@tanstack/react-query';
import { getCategories } from '../api/categoryApi';
import { Link, useRouter, usePathname } from '@/i18n/navigation';
import { useTranslations, useLocale } from 'next-intl';

const Header = () => {
  const t = useTranslations('header');
  const router = useRouter();
  const pathname = usePathname();
  const locale = useLocale();

  const { data: categoriesData, isLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories
  })

  const handleLocaleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    router.replace(pathname, { locale: e.target.value });
  };

  return (
    <div className='w-full m-auto h-20 bg-white flex items-center justify-between px-6 border-b border-gray-100'>

      <div className='flex items-center gap-4 flex-shrink-0'>
        <Image src={Logo} alt='logo' width={90} height={40} priority />
        <Image src={XariBulBul} alt='xari-bulbul' width={40} height={40} priority />
      </div>

      <nav className='hidden md:flex items-center gap-1 mx-4 overflow-x-auto scrollbar-none'>
        <Button className='px-3 py-1 bg-red-500 rounded-full text-white text-xs font-bold mr-2 animate-pulse'>
          {t('live')}
        </Button>

        {isLoading ? (
          <span className="text-gray-400 text-sm px-4">{t('loading')}</span>
        ) : (
          categoriesData.map((item: { _id: string; name: string }) => (
            <Link
              key={item._id}
              href={`/categories/${item._id}`}
              className="rounded-lg px-3 py-1.5 text-sm font-semibold text-gray-700 hover:text-blue-600 hover:bg-gray-50 transition-all whitespace-nowrap"
            >
              {item.name}
            </Link>
          ))
        )}

        <Button className='px-3 py-1 bg-red-500 rounded-full text-white text-xs font-bold mr-2 animate-pulse'>
          <Link href="/login">
            {t('login')}
          </Link>
        </Button>
      </nav>

      <div className='flex items-center gap-4 flex-shrink-0 text-gray-500'>
        <select
          value={locale}
          onChange={handleLocaleChange}
          className='bg-gray-100 text-gray-700 text-sm px-2 py-1 rounded-lg'
        >
          <option value="az">AZ</option>
          <option value="en">EN</option>
          <option value="ru">RU</option>
        </select>
        <Glasses className='cursor-pointer hover:text-gray-800 transition-colors' size={22} />
        <Menu className='cursor-pointer hover:text-gray-800 transition-colors' size={22} />
      </div>

    </div>
  )
}

export default Header