import { api } from "./api";

 const getCategories = async () => {
    try {
        const response = await api.get('/categories');
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const getCategoryById = async (id) => {
    try {
        const response = await api.get(`/news_by_categ/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}



const createCategory = async (categoryData) => {
    try {
        const token = localStorage.getItem("token");
        // Передаем categoryData как Body (тело запроса)
        const response = await api.post('/categories', categoryData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

const deleteCategory = async (id) => {
    try {
        const token = localStorage.getItem("token");
        const response = await api.delete(`/categories/${id}`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }   
}

const editCategory = async (id, categoryData) => {
    try {
        const token = localStorage.getItem("token");
        const response = await api.patch(`/categories/${id}`, categoryData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}



export { getCategories, getCategoryById, createCategory, deleteCategory, editCategory };