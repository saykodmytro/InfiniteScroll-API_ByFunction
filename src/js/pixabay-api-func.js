import axios from 'axios';
const API_KEY = '39430730-0a1aacc0e107061ec7cb5615a';
const BASE_URL = `https://pixabay.com/api/?key=${API_KEY}&q=`;
const FILTER_RESPONSE =
  '&orientation=horizontal&image_type=photo&safesearch=true&';

export async function getPhotosFun() {
  try {
    // Виконуємо асинхронний запит GET до вказаного URL
    const response = await axios.get(`${BASE_URL}${FILTER_RESPONSE}`);

    // Отримуємо дані з відповіді
    const data = response.data;

    // Робимо що-небудь із отриманими даними
    console.log(data);

    // Повертаємо дані або робимо щось інше з ними
    return data;
  } catch (error) {
    // Обробка помилок, якщо запит не вдалося виконати
    console.error('Помилка запиту:', error);
    throw error; // Можна обробляти помилки тут або передавати їх далі
  }
}

// Виклик функції і очікування результату
getPhotosFun()
  .then(result => {
    // Результат доступний тут, можна його використовувати
    console.log('Результат:', result);
  })
  .catch(err => {
    // Обробка помилок, якщо вони сталися під час виконання запиту або функції
    console.error('Помилка виконання запиту або функції:', err);
  });
