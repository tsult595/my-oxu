import { api } from "./api";



export async function loginAdmin({ login, password }: { login: string, password: string }) {
    try {
        // 🔥 Обязательно await, иначе вернется Promise, а не ответ сервера!
        const res = await api.post("/login", { login, password })
        
        // Посмотри в консоли, что именно присылает бэк:
        console.log("Ответ бэка при логине:", res.data)
        
        return res.data
    } catch (error) {
        console.error("Ошибка в функции loginAdmin:", error);
        throw error;
    }
}

export async function verifyAdmin() {
    try {
        const token = getToken() // Достаем сохраненный токен из localStorage
        
        const res = await api.get("/verify", {
            headers: {
                // 🔥 Передаем токен в стандартном формате Bearer
                Authorization: `Bearer ${token}` 
            }
        })
        return res.data
    } catch (error) {
        console.error("Ошибка верификации:", error);
        throw error;
    }
}


export function getToken() {
    return localStorage.getItem("token")
}


export function saveToken(token: string) {
    localStorage.setItem("token", token)
}


export function logoutAdmin() {
    localStorage.removeItem("token")
}