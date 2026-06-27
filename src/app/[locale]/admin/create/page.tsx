"use client"

import React, { useState } from 'react'
import { createNews} from '@/api/newsApi' // Импортируем обе функции
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useRouter } from 'next/navigation'
import { getCategories } from '@/api/categoryApi'

const Createpage = () => {
  const queryClient = useQueryClient()
  const router = useRouter()

  // Стейты для формы
  const [title, setTitle] = useState('')
  const [content, setContent] = useState('')
  const [categoryId, setCategoryId] = useState('') 

  // 🔥 1. Динамически качаем все категории с бэка!
  const { data: categories, isLoading: isCategoriesLoading } = useQuery({
    queryKey: ['categories'],
    queryFn: getCategories // Твоя готовая функция запроса категорий
  })

  // 2. Наша мутация создания новости
  const { mutate: createNewsMutation, isPending } = useMutation({
    mutationFn: createNews, 
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin-news'] })
      queryClient.invalidateQueries({ queryKey: ['news'] })
      router.push('/admin')
    }
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // Если админ вообще ничего не выбрал в селекте, берем ID самой первой категории из списка
    const finalCategoryId = categoryId || categories?.[0]?.id || ""

    // 🔥 Никакого хардкода! Передаем реальный ID, выбранный из выпадающего списка
    createNewsMutation({
      title,
      content,
      image: 'https://via.placeholder.com/400x200', 
      category_id: finalCategoryId
    })
  }

  return (
    <div className="p-6 max-w-2xl mx-auto mt-10 bg-white rounded-xl shadow border text-black">
      <h2 className="text-xl font-bold mb-6">Создать новую новость</h2>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        {/* Инпут заголовка */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Заголовок новости</label>
          <input 
            type="text" 
            value={title} 
            onChange={(e) => setTitle(e.target.value)}
            className="w-full p-2 border rounded bg-gray-50 text-black"
            required
          />
        </div>

        {/* 🔥 ДИНАМИЧЕСКИЙ ВЫПАДАЮЩИЙ СПИСОК КАТЕГОРИЙ */}
        <div>
  <label className="block text-sm font-medium mb-1 text-gray-700">Категория</label>
  {isCategoriesLoading ? (
    <p className="text-sm text-gray-500">Загрузка категорий с сервера...</p>
  ) : (
    <select 
      value={categoryId} 
      onChange={(e) => setCategoryId(e.target.value)}
      className="w-full p-2 border rounded bg-gray-50 text-black focus:outline-none focus:ring-2 focus:ring-blue-500"
      required
    >
      {/* Дефолтный пустой вариант, чтобы админ выбрал осознанно */}
      <option value="">Выберите категорию</option>
      
      {/* Рендерим реальные данные, которые вытащила твоя функция getCategories */}
      {categories?.map((cat: any) => (
        <option key={cat.id || cat._id} value={cat.id || cat._id}>
          {cat.name || cat.title} 
        </option>
      ))}
    </select>
  )}
</div>

        {/* Текстовая область */}
        <div>
          <label className="block text-sm font-medium mb-1 text-gray-700">Текст новости</label>
          <textarea 
            rows={6}
            value={content} 
            onChange={(e) => setContent(e.target.value)}
            className="w-full p-2 border rounded bg-gray-50 text-black"
            required
          />
        </div>

        {/* Кнопки */}
        <div className="flex gap-4 pt-4">
          <button type="button" onClick={() => router.back()} className="w-1/2 border p-2 rounded text-gray-700">
            Отмена
          </button>
          <button type="submit" disabled={isPending} className="w-1/2 bg-blue-600 text-white p-2 rounded hover:bg-blue-700">
            {isPending ? 'Публикация...' : 'Опубликовать'}
          </button>
        </div>
      </form>
    </div>
  )
}

export default Createpage