import axios from 'axios';

import { ApiConfig } from '../configs';

export class BaseApi {
  protected readonly api = axios.create({
    baseURL: new ApiConfig().getApiBaseUrl(),
    headers: { 'Content-Type': 'application/json' },
  });

  constructor(private readonly controllerPath?: string) {}

  protected getUrl(path?: string): string {
    let url = '';

    if (this.controllerPath) {
      if (this.controllerPath.startsWith('/')) {
        url += this.controllerPath;
      } else {
        url += `/${this.controllerPath}`;
      }
    }

    if (path) {
      if (path.startsWith('/')) {
        url += path;
      } else {
        url += `/${path}`;
      }
    }

    return url;
  }
}
