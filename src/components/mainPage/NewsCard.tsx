'use client'


import Link from 'next/link'
import Image from 'next/image'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { like, dislike } from '@/api/newsLikesApi'
// import { toast } from 'react-hot-toast' // Или твоя библиотека уведомлений

const NewsCard = ({ news }: { news: any }) => {
  const queryClient = useQueryClient()

  const { mutate: handleLike } = useMutation({
    mutationFn: () => like(news._id),
    onSuccess: () => {
      // toast.success("Лайк поставлен!")
      // Инвалидируем кэш, чтобы счетчик сразу обновился
      queryClient.invalidateQueries({ queryKey: ['news'] })
      queryClient.invalidateQueries({ queryKey: ['categoryNews'] })
    },
    onError: () => {
      // toast.error("Ошибка при установке лайка")
    }
    

  })

  
  const { mutate: handleDislike } = useMutation({
    mutationFn: () => dislike(news._id),
    onSuccess: () => {
      // toast.success("Дизлайк поставлен!")
      queryClient.invalidateQueries({ queryKey: ['news'] })
      queryClient.invalidateQueries({ queryKey: ['categoryNews'] })
    },
    onError: () => {
      // toast.error("Ошибка при установке дизлайка")
    }
  })

  return (
    <Link href={`/news/${news._id}`}>
      <div className="flex flex-col gap-4 p-3 bg-white hover:bg-gray-50 rounded-xl transition-colors duration-200 cursor-pointer border border-gray-100 group">
        
        {/* 1. Картинка */}
        <div className="relative w-32 h-24 sm:w-40 sm:h-28 flex-shrink-0 overflow-hidden rounded-lg bg-gray-100">
          <Image 
            src={news.img} 
            alt={news.title}
            fill 
            className="object-cover group-hover:scale-105 transition-transform duration-300"
          />
        </div>

        {/* 2. Контентная часть */}
        <div className="flex flex-col justify-between flex-1 min-w-0">
          <div>
            <h3 className="font-semibold text-gray-900 text-sm sm:text-base leading-snug line-clamp-2 group-hover:text-blue-600 transition-colors">
              {news.title}
            </h3>
            <p className="text-gray-500 text-xs sm:text-sm mt-1 line-clamp-2 leading-relaxed">
              {news.description}
            </p>
          </div>

          {/* 3. Нижняя панель */}
          <div className="flex items-center justify-between mt-2 text-[11px] sm:text-xs text-gray-400 font-medium border-t border-gray-50 pt-2">
            
            {/* Дата */}
            <span>{news.createdAt ? new Date(news.createdAt).toLocaleDateString('ru-RU') : ''}</span>

            {/* Статистика */}
            <div className="flex items-center gap-3">
              {/* Просмотры */}
              <div className="flex items-center gap-1">
                <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                </svg>
                <span>{news.view}</span>
              </div>

              {/* Блок Лайки / Дизлайки */}
              <div className="flex items-center gap-3">
                
                {/* Кнопка ЛАЙК */}
                <button 
                  onClick={(e) => {
                    e.preventDefault(); // 🔥 Останавливаем переход по ссылке <Link>
                    handleLike();       // 🔥 Запускаем мутацию лайка
                  }} 
                  className="flex items-center gap-1 text-emerald-600 hover:scale-110 transition-transform"
                >
                  <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.757a2.25 2.25 0 012.25 2.25c0 1.135-.845 2.1-1.96 2.22l-1.464.16a2.25 2.25 0 01-2.036-1.15L14 10zM14 10V4.5a2.5 2.5 0 00-5 0V10H4a2 2 0 00-2 2v7a2 2 0 002 2h10a2 2 0 002-2v-7a2 2 0 00-2-2h-2z" />
                  </svg>
                  <span>{news.like}</span>
                </button>

                {/* Кнопка ДИЗЛАЙК */}
                <button 
                  onClick={(e) => {
                    e.preventDefault(); // 🔥 Тоже стопаем ссылку
                    handleDislike();    // 🔥 Запускаем мутацию дизлайка
                  }} 
                  className="flex items-center gap-1 text-red-600 hover:scale-110 transition-transform"
                >
                  {/* Иконка дизлайка (перевернутый палец) */}
                  <svg className="w-3.5 h-3.5 rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14 10h4.757a2.25 2.25 0 012.25 2.25c0 1.135-.845 2.1-1.96 2.22l-1.464.16a2.25 2.25 0 01-2.036-1.15L14 10zM14 10V4.5a2.5 2.5 0 00-5 0V10H4a2 2 0 00-2 2v7a2 2 0 002 2h10a2 2 0 002-2v-7a2 2 0 00-2-2h-2z" />
                  </svg>
                  <span>{news.dislike}</span>
                </button>

              </div>
            </div>

          </div>
        </div>

      </div>
    </Link>
  )
}

export default NewsCard