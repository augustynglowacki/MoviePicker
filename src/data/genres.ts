import axios from 'axios';
import {API_KEY, API_URL} from '@env';

export async function getGenres() {
  await axios
    .get(`${API_URL}/genre/movie/list?api_key=${API_KEY}&language=en-US`)
    .then(res => console.log(res.data));
}
