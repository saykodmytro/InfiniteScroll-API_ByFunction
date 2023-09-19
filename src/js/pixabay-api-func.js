import axios from 'axios';

export async function getPhotosFun(query, page) {
  const endpoint = `https://pixabay.com/api/?key=39430730-0a1aacc0e107061ec7cb5615a&q=${query}&image_type=photo&safesearch=true&page=${page}&per_page=40&orientation=horizontal`;
  const response = await axios.get(endpoint);
  return response.data;
}
