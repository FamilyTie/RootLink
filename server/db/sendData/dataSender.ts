import axios from "axios";
import { fetchInBatches } from "../models/Profile";

const BATCH_SIZE = 1000

async function sendDataToPythonServer() {
    try {
      const batches = await fetchInBatches(BATCH_SIZE);
      for (const batch of batches) {
        try {
          const response = await axios.post('http://python-server-url/api/endpoint', {
            profiles: batch
          });
          console.log('Data sent to Python server:', response.data);
        } catch (error) {
          console.error('Error sending data to Python server:', error);
        }
      }
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  }
  
  export default sendDataToPythonServer;