import axios from "axios";

const API = axios.create({
    baseURL: import.meta.env.VITE_API_URL
})
export const getBooks=()=>{
    return API.get(`/api/book/getbooks`);
}

export const addBook=(data)=>{
    return API.post(`/api/book/add`, data);
}

export const updateBook=(id, data)=>{
    return API.put(`/api/book/updateonebook`, {
        _id:id,
        ...data});
}

export const deleteBook=(data)=>{
    return API.delete(`/api/book/deleteonebook`, {data});
}
