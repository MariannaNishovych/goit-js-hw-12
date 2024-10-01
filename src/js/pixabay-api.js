import axios from 'axios'; 

const API_KEY = '46087000-8dffe905d5bdd270a8d626623';  
const BASE_URL = 'https://pixabay.com/api/'; 
export const PER_PAGE = 15; 

export async function fetchImages(query, page = 1) {
  const params = new URLSearchParams({
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    per_page: PER_PAGE,
    page: page,
  });

  const response = await axios.get(`${BASE_URL}?key=${API_KEY}&${params}`);
  const {
    data: { hits, totalHits },
  } = response;
  return { hits, totalHits };
}



// try {
//     const response = await axios.get(BASE_URL, {
//     params: {
//         key: API_KEY,
//         q: query,
//         image_type: 'photo',
//         orientation: 'horizontal',
//         safesearch: true,
//         page: page,
//         per_page: 15,
//     },
//     });
//     return response.data;
// } catch (error) {
//     throw new Error("Images not found");
// }