"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
// 🔥 Импортируем твои готовые функции из сервиса авторизации
import { getToken, verifyAdmin, logoutAdmin } from '../../../api/adminAuth' 

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const router = useRouter()
  const [isAuthorized, setIsAuthorized] = useState(false)

  useEffect(() => {
    const checkAuth = async () => {
      // 1. Используем ТВОЮ функцию вместо localStorage.getItem напрямую
      const token = getToken() 
      
      if (!token) {
        router.push('/login')
        return
      }

      try {
        // 2. Самый сок: Проверяем токен на бэкенде через твою функцию verifyAdmin
        // (Бэк проверит, живой ли JWT токен, не истек ли его срок действия)
        await verifyAdmin() 
        
        // Если бэк ответил успешно — пускаем админа!
        setIsAuthorized(true)
      } catch (error) {
        console.error("Токен невалидный или просрочен:", error)
        
        // Если бэк сказал, что токен тухлый — стираем его и выгоняем
        logoutAdmin() // 🔥 Твоя функция очистки
        router.push('/login')
      }
    }

    checkAuth()
  }, [router])

  if (!isAuthorized) {
    return (
      <div className="h-screen w-full flex items-center justify-center bg-gray-50 text-gray-500 font-medium">
        Проверка прав доступа...
      </div>
    )
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Твой сайдбар и children */}
      {children}
    </div>
  )
}