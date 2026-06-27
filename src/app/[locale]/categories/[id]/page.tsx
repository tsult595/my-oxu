
import { getCategoryById } from '@/api/categoryApi'
import NewsCard from '@/components/mainPage/NewsCard'

interface CategoryPageProps {
  params: Promise<{ id: string }> 
}

const CategoryPage = async ({ params }: CategoryPageProps) => {
  const { id } = await params
  
  let newsList = []
  let isError = false

  try {
    const data = await getCategoryById(id)
    newsList = Array.isArray(data) ? data : data?.news || data?.data || []
  } catch (error) {
    console.error("Ошибка загрузки категории на сервере:", error)
    isError = true
  }

  if (isError) {
    return <div className="text-center py-20 text-red-500">Ошибка загрузки новостей категории.</div>
  }

  return (
    <main className="min-h-screen bg-gray-50 py-8 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="border-b border-gray-200 pb-4 mb-6">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center gap-2">
            <span className="w-2 h-6 bg-blue-600 rounded-full"></span>
            Новости категории
          </h1>
        </div>

        {newsList.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl border border-gray-100">
            <p className="text-gray-400 font-medium">В этой категории пока нет новостей.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
            {newsList.map((newsItem: any) => (
              <NewsCard
                key={newsItem._id} 
                news={newsItem} 
              />
            ))}
          </div>
        )}

      </div>
    </main>
  )
}

export default CategoryPage


