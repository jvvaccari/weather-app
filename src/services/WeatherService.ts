import IApiClient from "../interfaces/IApiClient";

export class WeatherService {
  private api: IApiClient;

  constructor(api: IApiClient) {
    this.api = api;
  }

  //    const fetchData = async () => {
  //     try {
  //       const [weatherRes, alertsRes] = await Promise.all([
  //         fetch("http://localhost:8081/weather/data"),
  //         fetch("http://localhost:8081/weather/alerts"),
  //       ]);

  //       const weatherData = await weatherRes.json();

  //       const weatherAlert =
  //         alertsRes.status === 204 || !alertsRes.ok ? {} : await alertsRes.json();

  //       setData(weatherData);
  //       setAlerts(weatherAlert);
  //       setFetchError(null);
  //       setLastUpdate(new Date());
  //       // eslint-disable-next-line @typescript-eslint/no-explicit-any
  //     } catch (err: any) {
  //       setFetchError(err.message);
  //     }
  //   };

  public async getDashboardData<T = unknown>() {
    const res = await this.api.get<T>("/weather/data");
    return res.data;
  }

  public async getDashboardAlerts<T = unknown>() {
    const res = await this.api.get<T>("/weather/alerts", {
      validateStatus: (status) => status === 204 || (status >= 200 && status < 300),
    });

    if (res.status === 204) {
      return null;
    }

    return res.data;
  }

  public async postCoordinates(latitude: number, longitude: number) {
    const res = await this.api.post("/weather/coordinates", { latitude, longitude });
    return res.data;
  }

}
