import { Box, Typography } from "@mui/material";

interface WeatherHeaderProps {
  title: string;
}

const WeatherHeader = ({ title }: WeatherHeaderProps) => (
  <Box
    sx={{
      padding: "16px",
      background: "linear-gradient(80deg, #4a90e2 48%, #16324b 64%)",
    }}
  >
    <Typography
      sx={{
        color: "#fff",
        fontWeight: 700,
        letterSpacing: 1,
        fontSize: 24,
      }}
    >
      {title}
    </Typography>
  </Box>
);

export default WeatherHeader;
