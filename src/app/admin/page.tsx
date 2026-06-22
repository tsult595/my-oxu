"use client"


import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { deleteNews,getAllNews } from '@/api/newsApi' // Твоя готовая функция запроса новостей
// import { deleteNews } from '@/api/newsApi' // Потом создашь на удаление
import Link from 'next/link'
import { logoutAdmin } from '@/api/adminAuth'
import { useRouter } from 'next/navigation'
// import { toast } from 'react-hot-toast'

const AdminDashboard = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  
  const { data: newsData, isLoading } = useQuery({
    queryKey: ['admin-news'],
    queryFn: () => getAllNews({ page: '1', limit: '50', search: '', sort: 'newest' })
  })

  const { mutate: deleteNewsMutation } = useMutation({
  mutationFn: deleteNews, // Используем твою функцию из API
  onSuccess: () => {
    // Говорим TanStack Query: "Списки новостей устарели, перекачай их с бэка!"
    queryClient.invalidateQueries({ queryKey: ['admin-news'] })
    // Если новости используются и на главном сайте, можно инвалидировать и их:
    queryClient.invalidateQueries({ queryKey: ['news'] })
    // toast.success("Новость успешно удалена!")
  },
  onError: (error) => {
    console.error("Не удалось удалить:", error)
    // toast.error("Ошибка при удалении новости")
  }
})



  const newsList = newsData?.data || []

  // 2. Сюда в будущем прикрутишь мутацию удаления новости
  const handleDelete = (id: string) => {
    if (confirm("Вы уверены, что хотите удалить эту новость?")) {
      deleteNewsMutation(id)
    }
  }



  if (isLoading) return <div className="p-10 text-center font-bold">Загрузка админки...</div>

  return (
    <div className="p-6">
      {/* Верхняя панель */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold text-gray-800">Панель управления новостями</h1>
        <Link 
          href="/admin/create" 
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          + Добавить новость
        </Link>
        <Link 
          href="/admin/deleteCategory" 
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors"
        >
          + Удалить категорию
        </Link>
        <Link 
          href="/admin/createcategories" 
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors ml-5"
        >
          + Добавить категорию
        </Link>
        <Link 
          href="/admin/editcategory" 
          className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-lg font-medium transition-colors ml-5"
        >
          + Редактировать категорию
        </Link>
        <button onClick={() => {
          logoutAdmin()
          router.push('/')
        }} className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
          Logout
        </button>
      </div>

      {/* Таблица новостей */}
      <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-gray-50 border-b border-gray-100 text-gray-600 text-sm font-semibold">
              <th className="p-4">Заголовок</th>
              <th className="p-4">Просмотры</th>
              <th className="p-4">Лайки</th>
              <th className="p-4 text-right">Действия</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-50 text-sm text-gray-700">
            {newsList.map((news: { _id: string; title: string; view: number; like: number }) => (
              <tr key={news._id} className="hover:bg-gray-50/50 transition-colors">
                <td className="p-4 font-medium max-w-md truncate">{news.title || "Без заголовка"}</td>
                <td className="p-4 text-gray-500">{news.view || 0} 👀</td>
                <td className="p-4 text-gray-500">{news.like || 0} ❤️</td>
                <td className="p-4 text-right space-x-2">
                  <Link 
                    href={`/admin/edit/${news._id}`}
                    className="text-blue-600 hover:text-blue-800 font-medium bg-blue-50 px-3 py-1 rounded"
                  >
                    Ред.
                  </Link>
                  <button 
                    onClick={() => handleDelete(news._id)}
                    className="text-red-600 hover:text-red-800 font-medium bg-red-50 px-3 py-1 rounded"
                  >
                    Удалить
                  </button>
                </td>
              </tr>
            ))}
            {newsList.length === 0 && (
              <tr>
                <td colSpan={4} className="text-center p-10 text-gray-400">
                  Новостей пока нет. Создайте первую!
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default AdminDashboard