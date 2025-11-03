import axios from 'axios';
import { Flight } from '../types/flight';

const API_BASE_URL = 'https://flight-explorer-api.codewalnut.com';

export const getFlights = async (): Promise<Flight[]> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/flights`);
    return response.data.flights;
  } catch (error) {
    console.error('Error fetching flights:', error);
    throw error;
  }
};