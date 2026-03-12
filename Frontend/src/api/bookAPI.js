import axios from "axios";

export const getBooks=()=>{
    return axios.get(`/api/book/getbooks`);
}

export const addBook=(data)=>{
    return axios.post(`/api/book/add`, data);
}

export const updateBook=(id, data)=>{
    return axios.put(`/api/book/updateonebook`, {
        _id:id,
        ...data});
}

export const deleteBook=(data)=>{
    return axios.delete(`/api/book/deleteonebook`, {data});
}
