"use client"


import { useRouter, useSearchParams, usePathname } from 'next/navigation'
import { useQuery } from '@tanstack/react-query'
import { getAllNews } from '@/api/newsApi'


import AsideMenu from './AsideMenu'
import Header from '../Header'
import NewsCard from './NewsCard'
import AdvertisementLeft from './AdvertisementLeft'
import AdvertisementUpper from './AdvertisementUpper'
import AdvertisementRight from './AdvertisementRight'
import MainAdvertisement from './MainAdvertisement'
import MainAdvertisementSmall from './MainAdvertisementSmall'

const MainNewsSection = () => {
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const currentSort = searchParams.get('sort') || 'newest'

  const { data: newsData, isLoading } = useQuery({
    queryKey: ['news', currentSort], 
    queryFn: () => getAllNews({ page: 1, limit: 10, search: '', sort: currentSort })
  })

  // 3. Безопасное переключение сортировки без затирания других query-параметров (категорий, поиска)
  const handleSortChange = (sortValue: string) => {
    const params = new URLSearchParams(searchParams.toString())
    params.set('sort', sortValue) // Перезаписываем только ключ sort
    
    // Переходим по новому адресу без жесткого скролла страницы вверх
    router.push(`${pathname}?${params.toString()}`, { scroll: false })
  }

  const newsList = newsData?.data || []

  return (
    <div className="min-h-screen w-full flex bg-amber-50 text-black">
      {/* Левое боковое меню (Категории) */}
      <AsideMenu />

      {/* Основной контентный блок */}
      <div className="flex-1 flex flex-col min-w-0">
        <Header />
        
        {/* Вкладки переключения сортировки */}
        <div className="flex items-center gap-4 border-b border-gray-200 pb-3 mb-2 text-sm font-semibold px-4 mt-2">
          <button 
            onClick={() => handleSortChange('newest')}
            className={`pb-1 transition-colors relative ${
              currentSort === 'newest' 
                ? 'text-blue-600 border-b-2 border-blue-600 font-bold' 
                : 'text-gray-400 hover:text-gray-700'
            }`}
          >
            Последние
          </button>
          
          <button 
            onClick={() => handleSortChange('most_viewed')}
            className={`pb-1 transition-colors relative ${
              currentSort === 'most_viewed' 
                ? 'text-blue-600 border-b-2 border-blue-600 font-bold' 
                : 'text-gray-400 hover:text-gray-700'
            }`}
          >
            Популярные
          </button>
        </div>

        {/* Верхний баннер */}
        <AdvertisementUpper />

        {/* Сетка с баннерами и карточками */}
        <div className="flex gap-4 justify-between items-start px-4 w-full">
          {/* Левый рекламный баннер */}
          <AdvertisementLeft />

          {/* Центральная лента */}
          <div className="flex flex-col flex-1 min-w-0 space-y-4">
            {/* Блок главного промо/слайдера */}
            <div className="flex gap-3 w-full flex-wrap lg:flex-nowrap">
              <MainAdvertisement />
              <MainAdvertisementSmall />
            </div>

            {/* Состояние загрузки (Скелетон вместо жесткого полноэкранного лоадера) */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 min-w-0">
                {[...Array(4)].map((_, i) => (
                  <div key={i} className="h-[280px] w-full bg-gray-200 rounded-xl animate-pulse" />
                ))}
              </div>
            ) : (
              /* Сетка новостных карточек */
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 min-w-0">
                {newsList.map((news: any) => (
                  <NewsCard key={news._id || news.id} news={news} />
                ))}
                
                {/* Если новостей нет */}
                {newsList.length === 0 && (
                  <p className="text-gray-500 text-center py-20 col-span-full font-medium">
                    В этой категории новостей пока нет
                  </p>
                )}
              </div>
            )}
          </div>

          {/* Правый рекламный баннер */}
          <AdvertisementRight />
        </div>
      </div>
    </div>
  )
}

export default MainNewsSection