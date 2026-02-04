import { Box, Typography } from "@mui/material";
import * as Tooltip from "@radix-ui/react-tooltip";

interface WeatherCardProps {
  title: string;
  value: number;
  unit: string;
  icon: React.ElementType;
  alert: boolean;
}

const WeatherCard = ({
  title,
  value,
  unit,
  icon: Icon,
  alert,
}: WeatherCardProps) => {
  return (
    <Tooltip.Provider>
      <Tooltip.Root>
        <Tooltip.Trigger asChild>
          <Box
            style={{
              backgroundColor: alert ? "#ffebee" : "#fff",
              border: alert ? "2px solid #e2245df6" : "none",
              borderRadius: 10,
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
              padding: "1.5rem",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              transition: "transform 0.2s ease",
              cursor: "default",
            }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.transform = "scale(1.05)")
            }
            onMouseLeave={(e) => (e.currentTarget.style.transform = "scale(1)")}
          >
            <Icon size={36} color="#4a90e2" />
            <Typography
              variant="h6"
              sx={{ margin: "12px 0 8px", color: "#222" }}
            >
              {title}
            </Typography>
            <Typography
              sx={{
                fontSize: 24,
                fontWeight: "bold",
                margin: 0,
                color: "#111",
              }}
            >
              {value} {unit}
            </Typography>
          </Box>
        </Tooltip.Trigger>
        <Tooltip.Portal>
          {alert && (
            <Tooltip.Content
              side="top"
              align="center"
              style={{
                backgroundColor: "black",
                color: "white",
                padding: "5px 10px",
                borderRadius: 4,
                fontSize: 14,
                userSelect: "none",
                boxShadow: "0px 2px 10px rgba(0,0,0,0.3)",
                zIndex: 1000,
              }}
            >
              {alert}
              <Tooltip.Arrow offset={5} style={{ fill: "black" }} />
            </Tooltip.Content>
          )}
        </Tooltip.Portal>
      </Tooltip.Root>
    </Tooltip.Provider>
  );
};

export default WeatherCard;
