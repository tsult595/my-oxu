"use client"

import { deleteCategory, getCategories } from "../../../api/categoryApi"
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"



const DeleteCategory = () => {
    const queryClient = useQueryClient()
    const {data: categoryData, isLoading} = useQuery({
        queryKey: ['category'],
        queryFn: getCategories
    })

    const {mutate: deleteCategoryMutation} = useMutation({
        mutationFn: deleteCategory,
        onSuccess: () => {
            // После успешного удаления категории, можно обновить список категорий
           queryClient.invalidateQueries({ queryKey: ['category'] })
        },
        onError: (error) => {
            console.error("Ошибка при удалении категории:", error)
        }
    })

    const handleDelete = (id: string) => {
        if (confirm("Вы уверены, что хотите удалить эту категорию?")) {
            deleteCategoryMutation(id)
        }
    }

    const categories = Array.isArray(categoryData) ? categoryData : categoryData?.data || [];

  return (
    <div>
        <h1>Удалить категорию</h1>
        <div className="category-details text-black">
            {categories.map((category) => (
                <div onClick={()=>handleDelete(category._id)} key={category._id}>
                    <h2>{category.name}</h2>
                </div>
            ))}
        </div>
    </div>
  )
}

export default DeleteCategory