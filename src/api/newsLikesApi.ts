import { api } from "./api";

const like = async (id: string) => {
    try {
        const response = await api.patch(`/news_like/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}
const dislike = async (id: string) => {
    try {
        const response = await api.patch(`/news_dislike/${id}`);
        return response.data;
    } catch (error) {
        console.error(error);
        throw error;
    }
}


export { like, dislike }