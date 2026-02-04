import ApiClient from './ApiClient';
import { CreateAxiosDefaults } from 'axios';

class HistoryApiClient extends ApiClient {
  constructor() {
    const apiUrl = String(import.meta.env.VITE_HIST_API_URL || '');

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

export default HistoryApiClient;
