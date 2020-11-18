import axios from 'axios';


const instance = axios.create({
  baseURL: 'https://react-burger-builder-1b4e0.firebaseio.com/'
});

export default instance;