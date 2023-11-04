import axios from 'axios';

import { ApiConfig } from '../configs';

export class BaseApi {
  protected readonly api = axios.create({
    baseURL: new ApiConfig().getHttpBaseUrl(),
    headers: { 'Content-Type': 'application/json' },
  });
}
