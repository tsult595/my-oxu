"use client"

import { editCategory, getCategories } from "@/api/categoryApi"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useState } from "react"

const EditCategory = () => {
  const [isOpen, setIsOpen] = useState(false)
    const [categoryName, setCategoryName] = useState('')
    const [selectedCategoryId, setSelectedCategoryId] = useState<string | null>(null);
  // Временный стейт для инпута в UI
   const queryClient = useQueryClient()
    const {data: categoryData, isLoading} = useQuery({
        queryKey: ['category'],
        queryFn: getCategories
    })

     const {mutate: editCategoryMutation} = useMutation({
       mutationFn: ({ _id, name }: { _id: string; name: string }) => editCategory(_id, { name }),
        
        onSuccess: () => {
            // После успешного редактирования категории, можно обновить список категорий
           queryClient.invalidateQueries({ queryKey: ['category'] })
        },
        onError: (error) => {
            console.error("Ошибка при редактировании категории:", error)
        }
    })

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Редактировать категорию</h1>
      
      {/* Симуляция строки в таблице/списке */}
      <div className="flex items-center justify-between flex-col p-4 bg-white rounded-lg border border-gray-200 shadow-sm">
        {
            isLoading ? (
                <p>Загрузка...</p>
            ) : (
        categoryData.map((category : { _id: string; name: string }) => (
         <div key={category._id} className="w-full flex items-center justify-between p-4 bg-white rounded-lg border border-gray-200 shadow-sm mb-2">
         <h2 className="text-lg font-medium text-gray-900">{category.name}</h2>
           <button 
            onClick={() => {
                setIsOpen(true);
                setCategoryName(category.name);
                setSelectedCategoryId(category._id);
            }}
            className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md text-sm font-medium transition-colors"
        >
            Редактировать
        </button>
        </div>
      ))
            )
        }
      
      </div>

      {/* МОДАЛЬНОЕ ОКНО (Задний фон-оверлей) */}
      {isOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 animate-fade-in">
          
          {/* Контент модалки */}
          <div className="bg-white rounded-xl shadow-xl max-w-md w-full p-6 mx-4 transform transition-all">
            
            {/* Хедер модалки */}
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold text-gray-900">Редактирование</h2>
              <button 
                onClick={() => setIsOpen(false)}
                className="text-gray-400 hover:text-gray-600 text-2xl font-semibold leading-none"
              >
                &times;
              </button>
            </div>

            {/* Описание */}
            <p className="text-sm text-gray-500 mb-4">
              Измените название категории. Изменения сразу отобразятся в системе после сохранения.
            </p>

            {/* Форма */}
            <form onSubmit={(e) => e.preventDefault()}>
              <div className="mb-6">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Название категории
                </label>
                <input 
                  type="text" 
                  value={categoryName}
                  onChange={(e) => setCategoryName(e.target.value)}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Введите название..."
                />
              </div>

              {/* Футер модалки с кнопками */}
              <div className="flex justify-end gap-3">
                <button 
                  type="button"
                  onClick={() => {setIsOpen(false)}}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors"
                >
                  Отмена
                </button>
                <button 
                  type="button"
                  onClick={() => {
                    if (selectedCategoryId) {
                   editCategoryMutation({ _id: selectedCategoryId, name: categoryName });
                    }
                    setIsOpen(false);
                  }}
                  className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-md text-sm font-medium text-white transition-colors"
                >
                  Сохранить
                </button>
              </div>
            </form>

          </div>
        </div>
      )}
    </div>
  )
}

export default EditCategory