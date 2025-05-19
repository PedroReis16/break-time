import axios from 'axios';

export default axios.create({
  baseURL: 'http://localhost:3000', // substitua pelo IP da sua máquina local
  timeout: 3000,
});
