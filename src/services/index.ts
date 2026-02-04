import ConsumerApiClient from "../classes/ConsumerApiClient";
import HistoryApiClient from "../classes/HistoryApiClient";
import { DowloadHistoryWeather } from "./DowloadHistoryWeather";
import { WeatherService } from "./WeatherService";

const consumerApiClient = new ConsumerApiClient();
const historyApiClient = new HistoryApiClient();

export const weatherService = new WeatherService(consumerApiClient);

export const historyService = new DowloadHistoryWeather(historyApiClient);
