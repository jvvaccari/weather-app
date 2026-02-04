/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Thermometer,
  Droplets,
  CloudRain,
  Cloud,
  Wind,
  Eye,
  CloudSnow,
  Gauge,
} from "lucide-react";
import WeatherCard from "./WeatherCard";
import { Box, Typography } from "@mui/material";

interface WeatherDashboardProps {
  data: any;
  alerts: any;
  lastUpdate: any;
}

const WeatherDashboard = ({
  data,
  alerts,
  lastUpdate,
}: WeatherDashboardProps) => {
  const metrics = [
    {
      title: "Temperatura",
      value: data.temperature,
      unit: "°C",
      icon: Thermometer,
    },
    {
      title: "Sensação Térmica",
      value: data.apparentTemperature,
      unit: "°C",
      icon: Thermometer,
    },
    {
      title: "Umidade",
      value: data.relativeHumidity,
      unit: "%",
      icon: Droplets,
    },
    {
      title: "Chance de Chuva",
      value: data.probabilityOfPrecipitation,
      unit: "%",
      icon: CloudRain,
    },
    {
      title: "Precipitação",
      value: data.precipitation,
      unit: "mm",
      icon: CloudRain,
    },
    { title: "Chuva", value: data.rain, unit: "mm", icon: CloudRain },
    { title: "Neve", value: data.snowfall, unit: "mm", icon: CloudSnow },
    {
      title: "Pressão",
      value: data.seaLevelPressure,
      unit: "hPa",
      icon: Gauge,
    },
    { title: "Nuvens", value: data.cloudCover, unit: "%", icon: Cloud },
    { title: "Vento", value: data.windSpeed, unit: "m/s", icon: Wind },
    {
      title: "Rajada de Vento",
      value: data.windGusts,
      unit: "m/s",
      icon: Wind,
    },
    { title: "Visibilidade", value: data.visibility, unit: "km", icon: Eye },
  ];

  return (
    <Box
      sx={{
        fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
      }}
    >
      {lastUpdate && (
        <Typography
          sx={{
            mb: 2,
            color: "#4a90e2",
            fontSize: 18,
            fontWeight: 500,
            letterSpacing: 0.6,
          }}
        >
          Última atualização:
          <Box
            component="span"
            sx={{ fontWeight: 700, pl: 0.5, color: "#e2245df6" }}
          >
            {lastUpdate.toLocaleDateString()} {lastUpdate.toLocaleTimeString()}
          </Box>
        </Typography>
      )}

      <Box>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "repeat(auto-fill, minmax(200px, 1fr))",
              md: "repeat(4, 1fr)",
            },
            gap: "1.5rem",
          }}
        >
          {metrics.map((metric, index) => (
            <WeatherCard
              key={index}
              title={metric.title}
              value={metric.value}
              unit={metric.unit}
              icon={metric.icon}
              alert={alerts[metric.title]}
            />
          ))}
        </Box>
      </Box>
    </Box>
  );
};

export default WeatherDashboard;
