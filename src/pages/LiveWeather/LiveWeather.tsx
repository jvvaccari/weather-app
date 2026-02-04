import { useEffect, useState } from "react";
import { Backdrop, Box, Button, IconButton, Modal, Stack } from "@mui/material";
import WeatherDashboard from "./components/WeatherDashboard";
import WeatherHeader from "./components/WeatherHeader";
import BrazilianMap from "./components/BrazilianMap";

import brazilIcon from "../../assets/pages/LiveWeater/icons/brasil.png";
import { historyService, weatherService } from "../../services";

const LiveWeather = () => {
  const [data, setData] = useState(null);
  const [alerts, setAlerts] = useState({});
  const [fetchError, setFetchError] = useState(null);
  const [lastUpdate, setLastUpdate] = useState<Date | null>(null);
  const [open, setOpen] = useState(false);
  const [stateName, setStateName] = useState("");

  const fetchData = async () => {
    try {
      const [weatherData, weatherAlert] = await Promise.all([
        weatherService.getDashboardData(),
        weatherService.getDashboardAlerts(),
      ]);

      setData(weatherData);
      setAlerts(weatherAlert ?? {});
      setFetchError(null);
      setLastUpdate(new Date());
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Erro ao buscar dados";
      setFetchError(message);
    }
  };

  const postCoordinates = async (
    latitude = -22.25,
    longitude = -42.66,
    selectedStateName = "Rio de Janeiro",
  ) => {
    try {
      await weatherService.postCoordinates(latitude, longitude);
      await fetchData();
      setOpen(false);
      setStateName(selectedStateName);
      setFetchError(null);
    } catch (err) {
      const message =
        err instanceof Error ? err.message : "Erro ao enviar coordenadas";
      setFetchError(message);
    }
  };

  const dowloadHistoryWeather = async () => {
    try {
      historyService.dowloadHistoryWeather();
    } catch (error) {
      console.error("Erro ao baixar histórico:", error);
    }
  };

  useEffect(() => {
    postCoordinates();
    fetchData();
    const intervalId = setInterval(fetchData, 32000);
    return () => clearInterval(intervalId);
  }, []);

  if (!data) return null;

  if (fetchError) {
    console.error(fetchError);
  }

  return (
    <Box position={"relative"}>
      <IconButton
        sx={{
          position: "fixed",
          zIndex: 1300,

          top: { xs: "auto", md: 24 },
          right: { xs: 16, md: 48 },
          bottom: { xs: 48, md: "auto" },

          "&:focus": {
            outline: "none",
          },
          "&.Mui-focusVisible": {
            outline: "none",
          },
        }}
        onClick={() => setOpen(true)}
      >
        <Box
          component="img"
          src={brazilIcon}
          width={24}
          p={0.6}
          borderRadius={2}
          border="2px solid #e2245df6"
          bgcolor={"#e2245d1e"}
        />
      </IconButton>

      <Stack spacing={3.2}>
        <WeatherHeader title={stateName} />

        <WeatherDashboard data={data} alerts={alerts} lastUpdate={lastUpdate} />

        <Box>
          <Button
            sx={{
              padding: "12px 20px",
              background: "linear-gradient(80deg, #4a90e2 48%, #16324b 64%)",
              color: "#fff",
              fontWeight: 600,
            }}
            onClick={() => dowloadHistoryWeather()}
          >
            Histórico do Clima
          </Button>
        </Box>
        <Modal
          open={open}
          onClose={() => setOpen(false)}
          aria-labelledby="modal-title"
          aria-describedby="modal-description"
          closeAfterTransition
          slots={{ backdrop: Backdrop }}
          slotProps={{
            backdrop: {
              timeout: 500,
              sx: { backgroundColor: "rgba(0, 0, 0, 0.5)", p: 8 },
            },
          }}
        >
          <Stack
            sx={{
              position: "absolute",
              top: "50%",
              left: "50%",
              transform: "translate(-50%, -50%)",
              width: { xs: "86%", md: "33%" },
              p: 2,
              bgcolor: "background.paper",
              overflow: "hidden",
            }}
          >
            <BrazilianMap
              setSelectedState={(state) => {
                if (state) postCoordinates(state.lat, state.long, state.name);
              }}
            />
          </Stack>
        </Modal>
      </Stack>
    </Box>
  );
};

export default LiveWeather;
