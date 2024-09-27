import axios from 'axios';

const API_KEY = '46087000-8dffe905d5bdd270a8d626623';
const BASE_URL = 'https://pixabay.com/api/';


export async function fetchImages(query, pageNumber = 1) {
try {
    const response = await axios.get(BASE_URL, {
    params: {
        key: API_KEY,
        q: query,
        image_type: 'photo',
        orientation: 'horizontal',
        safesearch: true,
        page: pageNumber,
        per_page: 15,
    },
    });
    return response.data;
} catch (error) {
    throw new Error("Images not found");
}
}