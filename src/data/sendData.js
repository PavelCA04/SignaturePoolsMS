import axios from 'axios';

async function sendData(url, data) {
  try {
    const response = await axios.post(url, data);
    return response.status;
  } catch (error) {
    console.error(error);
  }
}

export { sendData };
