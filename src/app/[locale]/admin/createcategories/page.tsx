"use client"

import { createCategory } from "@/api/categoryApi"
import { useMutation } from "@tanstack/react-query"
import { useState } from "react"


const AdminCategories = () => {
    const [text, settext] = useState('')

    const {mutate, isPending} = useMutation({
        mutationFn: createCategory,
        onSuccess: () => {
            settext('')
            

        },
        onError: (error) => {
            console.error("Ошибка при создании категории:", error)
        }

    })

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        if(!text) return
        mutate({name: text})
    }

  return (
    <div>
        <h1>Категории</h1>
        <input className="text-black" type="text" value={text} onChange={(e) => settext(e.target.value)} />
        <button onClick={handleSubmit} disabled={isPending}>Создать категорию</button>
    </div>
  )
}

export default AdminCategories