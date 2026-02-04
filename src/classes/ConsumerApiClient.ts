import ApiClient from './ApiClient';
import { CreateAxiosDefaults } from 'axios';

class WeatherApiClient extends ApiClient {
  constructor() {
    const apiUrl = String(import.meta.env.VITE_CONS_API_URL || '');

    const baseConfig: CreateAxiosDefaults = {
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json',
      },
    };

    if (apiUrl) {
      baseConfig.baseURL = apiUrl;
    }

    super(baseConfig);
  }
}

export default WeatherApiClient;
