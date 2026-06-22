import { getToken } from "./adminAuth"
import { api } from "./api"


export const getAllNews = async ({ search , page, limit, sort = 'newest' }: { search?: string, page?: string, limit?: string, sort?: string }) => {
  const response = await api.get('/news', {
    params: {
      page: page || '1',
      limit: limit || '10',
      search: search || '',
      category_id: '',
      sort: sort 
    }
  })
  
  return response.data
}

export const getNewsById = async (id: string) => {
  const response = await api.get(`/news/${id}`)
  return response.data
}


export const deleteNews = async (id: string) => {
  try {
    const token = getToken() // Достаем токен ('token') из localStorage
    
    // 🔥 Передаем заголовки третьим параметром для DELETE запроса
    const response = await api.delete(`/news/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
    
    return response.data
  } catch (error) {
    console.error("Ошибка при удалении новости:", error)
    throw error;
  } 
}


export const editNews = async (id: string, data: [{ title: string, content: string, image: string, category_id: string }]) => {
  try {
    const token = getToken()
    
    // 🔥 Твой бэк ждет именно PATCH!
    const response = await api.patch(`/news/${id}`, data, {
      headers: {
        Authorization: `Bearer ${token}`,
        // Если будешь отправлять картинки, Axios сам выставит multipart/form-data
      }
    })
    return response.data
  } catch (error) {
    console.error("Ошибка при PATCH запросе новости:", error)
    throw error
  }
}



export const createNews = async ({ title , content, image, category_id }: { title: string, content: string, image: string, category_id: string }) => {
  try {
    const token = getToken()
    
    const response = await api.post('/news', 
      {
        title: title,
        description: content, 
        img: image || '',          
        category_id: category_id   
      },
      {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`
        }
      }
    )
    return response.data
  } catch (error) {
    console.error("Ошибка при создании новости:", error)
    throw error
  } 
}










