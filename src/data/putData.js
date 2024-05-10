import axios from 'axios';

async function putData(url, data) {
  try {
    const response = await axios.put(url, data);
    return response.status;
  } catch (error) {
    console.error(error);
  }
}

export { putData };
