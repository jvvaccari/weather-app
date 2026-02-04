import IApiClient from "../interfaces/IApiClient";

export class DowloadHistoryWeather {
  private api: IApiClient;

  constructor(api: IApiClient) {
    this.api = api;
  }

  //   const dowloadHistoryWeather = async () => {
  //     try {
  //       const response = await fetch("http://localhost:8087/history/download");
  //       if (!response.ok) {
  //         throw new Error("Falha ao baixar o arquivo");
  //       }
  //       const blob = await response.blob();
  //       const url = window.URL.createObjectURL(blob);
  //       const link = document.createElement("a");
  //       link.href = url;
  //       link.download = "weather-history.json";
  //       document.body.appendChild(link);
  //       link.click();
  //       link.remove();
  //       window.URL.revokeObjectURL(url);
  //     } catch (error) {
  //       console.error("Erro ao baixar histórico:", error);
  //     }
  //   };

    public async dowloadHistoryWeather() {
    const res = await this.api.get<Blob>("/history/download", {
      responseType: "blob",
    });

    const blob = res.data;
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "weather-history.json";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);
    return res.data;
  }
}
