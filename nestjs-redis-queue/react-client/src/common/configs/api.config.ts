export class ApiConfig {
  private readonly REACT_APP_HTTP_BASE_URL = process.env.REACT_APP_HTTP_BASE_URL;
  private readonly REACT_APP_WS_BASE_URL = process.env.REACT_APP_WS_BASE_URL;

  public getHttpBaseUrl(): string {
    return this.REACT_APP_HTTP_BASE_URL;
  }

  public getWsBaseUrl(): string {
    return this.REACT_APP_WS_BASE_URL;
  }
}
