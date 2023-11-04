export class ApiConfig {
  private readonly REACT_APP_API_BASE_URL = process.env.REACT_APP_API_BASE_URL;

  public getApiBaseUrl(): string {
    return this.REACT_APP_API_BASE_URL;
  }
}
