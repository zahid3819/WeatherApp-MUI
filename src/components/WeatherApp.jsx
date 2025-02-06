import React, { useState } from "react";
import {
  TextField,
  Button,
  Card,
  CardContent,
  Typography,
  CircularProgress,
  Container,
  Box,
  IconButton,
} from "@mui/material";
import WbSunnyIcon from "@mui/icons-material/WbSunny";
import SearchIcon from "@mui/icons-material/Search";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import NightsStayIcon from "@mui/icons-material/NightsStay";
import axios from "axios";

const WeatherApp = () => {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [darkMode, setDarkMode] = useState(false);

  const API_KEY = "9871e42500214cb1ac273017250602";

  const fetchWeather = async () => {
    if (!city) return;
    setLoading(true);
    setError("");
    try {
      const response = await axios.get(
        `https://api.weatherapi.com/v1/current.json?key=${API_KEY}&q=${city}&aqi=no`
      );
      setWeather(response.data);
    } catch (err) {
      setError("City not found. Please enter a valid city name.");
      setWeather(null);
    }
    setLoading(false);
  };

  return (
    <Container
      maxWidth="sm"
      sx={{
        textAlign: "center",
        mt: 5,
        p: 3,
        borderRadius: 2,
        bgcolor: darkMode ? "#121212" : "#f5f5f5",
        color: darkMode ? "#ffffff" : "#000000",
        minHeight: "90vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
      }}
    >
      {/* Dark Mode Toggle */}
      <IconButton
        onClick={() => setDarkMode(!darkMode)}
        sx={{ position: "absolute", top: 20, right: 20, color: darkMode ? "#fbc02d" : "#1e88e5" }}
      >
        {darkMode ? <NightsStayIcon fontSize="large" /> : <WbSunnyIcon fontSize="large" />}
      </IconButton>

      <Typography variant="h4" gutterBottom fontWeight="bold" sx={{ mb: 3, color: darkMode ? "#fff" : "#000" }}>
        Weather App
      </Typography>

      <Box sx={{ display: "flex", gap: 1, width: "100%", maxWidth: "400px" }}>
        <TextField
          label="Enter City"
          variant="outlined"
          fullWidth
          value={city}
          onChange={(e) => setCity(e.target.value)}
          sx={{
            bgcolor: darkMode ? "#333" : "#fff",
            borderRadius: "8px",
            input: { color: darkMode ? "#fff" : "#000" },
            label: { color: darkMode ? "#aaa" : "#000" },
          }}
          InputLabelProps={{
            style: { color: darkMode ? "#aaa" : "#000" },
          }}
        />
        <Button variant="contained" color="primary" onClick={fetchWeather} sx={{ borderRadius: "8px" }}>
          <SearchIcon />
        </Button>
      </Box>

      {loading && <CircularProgress sx={{ mt: 3 }} />}

      {error && (
        <Typography color="error" sx={{ mt: 2, fontSize: "16px", fontWeight: "bold" }}>
          {error}
        </Typography>
      )}

      {weather && (
        <Card
          sx={{
            mt: 3,
            p: 3,
            borderRadius: "15px",
            bgcolor: darkMode ? "rgba(255, 255, 255, 0.1)" : "#e3f2fd",
            backdropFilter: "blur(10px)",
            boxShadow: "0px 6px 15px rgba(0, 0, 0, 0.2)",
          }}
        >
          <CardContent sx={{ color: darkMode ? "#fff" : "#000" }}>
            <Typography variant="h5" fontWeight="bold">
              <LocationOnIcon /> {weather.location.name}, {weather.location.country}
            </Typography>
            <img
              src={weather.current.condition.icon}
              alt="weather icon"
              style={{ width: "80px", marginTop: "10px" }}
            />

            <Typography variant="h6" sx={{ textTransform: "capitalize" }}>
              {weather.current.condition.text}
            </Typography>

            <Typography variant="h3" fontWeight="bold" sx={{ mt: 2 }}>
              {weather.current.temp_c}°C
            </Typography>

            <Typography variant="body1" sx={{ fontSize: "16px", mt: 1 }}>
              Humidity: {weather.current.humidity}% 🌫️
            </Typography>
            <Typography variant="body1" sx={{ fontSize: "16px", mt: 1 }}>
              Wind Speed: {weather.current.wind_kph} km/h 💨
            </Typography>
          </CardContent>
        </Card>
      )}
    </Container>
  );
};

export default WeatherApp;
