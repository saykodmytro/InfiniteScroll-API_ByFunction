import axios from 'axios';
import { onSubmit } from './app';

const BASE_URL = 'https://pixabay.com/api/?';
const API_KEY = '39430730-0a1aacc0e107061ec7cb5615a';

export async function getPhotosFun(query) {
  const params = new URLSearchParams({
    key: API_KEY,
    q: query,
    orientation: 'horizontal',
    image_type: 'photo',
    safesearch: true,
    page: 1,
    per_page: 40,
  });
  try {
    // Виконуємо асинхронний запит GET до вказаного URL
    const endpoint = BASE_URL + params.toString();
    const response = await axios.get(endpoint);

    // Отримуємо дані з відповіді
    const data = response.data;

    // Робимо що-небудь із отриманими даними
    console.log('In pixabay-fun: ', data);

    // Повертаємо дані або робимо щось інше з ними
    return data;
  } catch (error) {
    // Обробка помилок, якщо запит не вдалося виконати
    console.error('Помилка запиту: ', error);
    throw error; // Можна обробляти помилки тут або передавати їх далі
  }
}
