"use client"

import { useState } from 'react'
import { useMutation } from '@tanstack/react-query'
import { loginAdmin } from '@/api/adminAuth'
import { useRouter } from 'next/navigation'

// import { toast } from 'react-hot-toast'

const AdminLoginPage = () => {
  const [login, setLogin] = useState('')
  const router = useRouter()
  const [password, setPassword] = useState('')

  const { mutate, isPending } = useMutation({
  mutationFn: loginAdmin,

  onSuccess: (data) => {
    console.log("Данные, пришедшие в onSuccess:", data)


    const token = data?.token || data?.data?.token

    if (token) {

      localStorage.setItem('token', token) 
      
    
      router.push('/admin')
    } else {
      console.error("Бэкенд ответил успешно, но токена в ответе нет!", data)
    }
  },
  onError: (error) => {
    console.error("Ошибка мутации логина:", error)
  }
})

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!login || !password) {
      // toast.error("Заполните все поля")
      return
    }
    // Отправляем данные на бэк
    mutate({ login, password })
  }

  return (
    <form onSubmit={handleSubmit} className="p-6 max-w-sm mx-auto mt-20 bg-white rounded-xl shadow-md border">
      <h2 className="text-xl font-bold mb-4">Вход в Админку</h2>
      
      <input 
        type="text" 
        placeholder="Логин" 
        value={login}
        onChange={(e) => setLogin(e.target.value)}
        className="w-full p-2 border rounded mb-3 text-black"
      />
      
      <input 
        type="password" 
        placeholder="Пароль" 
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="w-full p-2 border rounded mb-4 text-black"
      />

      <button 
        type="submit" 
        disabled={isPending}
        className="w-full bg-blue-600 text-white p-2 rounded hover:bg-blue-700 disabled:bg-gray-400"
      >
        {isPending ? 'Проверка...' : 'Войти'}
      </button>
    </form>
  )
}

export default AdminLoginPage