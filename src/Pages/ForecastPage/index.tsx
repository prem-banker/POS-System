// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { FC, useState, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  PointElement,
} from "chart.js";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";

// Register Chart.js components
ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

// Define a type for the category keys
type Category =
  | "Others"
  | "Pet Accessories"
  | "Pet Food & Treats"
  | "Pet Grooming"
  | "Pet Medicines";

// Define prices object with explicit category types
const prices: Record<Category, number> = {
  Others: 10,
  "Pet Accessories": 20,
  "Pet Food & Treats": 5,
  "Pet Grooming": 15,
  "Pet Medicines": 25,
};

const redTheme = {
  backgroundColor: "#1c1c1c",
  color: "#fff",
  buttonColor: "#ff0000",
  chartColors: [
    "rgba(255, 99, 132, 0.6)",
    "rgba(255, 69, 132, 0.6)",
    "rgba(255, 39, 132, 0.6)",
    "rgba(255, 10, 132, 0.6)",
    "rgba(205, 10, 100, 0.6)",
  ],
};

const ForecastPage: FC = () => {
  const [weeks, setWeeks] = useState<number>(1);
  const [forecastData, setForecastData] = useState<Record<
    Category,
    number[]
  > | null>(null);
  const [error, setError] = useState<string | null>(null);

  // Fetch forecast data based on weeks
  const fetchForecastData = async () => {
    try {
      const response = await fetch(`http://localhost:5000/forecast/${weeks}`);
      const data = await response.json();
      setForecastData(data);
    } catch (err) {
      setError("Failed to fetch forecast data.");
    }
  };

  // Fetch data on weeks change
  useEffect(() => {
    fetchForecastData();
  }, [weeks]);

  // Calculate projected revenue
  const calculateRevenue = (data: Record<Category, number[]>) => {
    return Object.keys(data).map((category) => {
      const categoryKey = category as Category; // Assert 'category' as Category
      return data[categoryKey].map(
        (quantity: number) => quantity * prices[categoryKey]
      );
    });
  };

  const revenueData = forecastData ? calculateRevenue(forecastData) : [];

  return (
    <Container
      maxWidth="lg"
      style={{
        backgroundColor: redTheme.backgroundColor,
        color: redTheme.color,
        padding: "2rem",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        style={{ color: redTheme.color }}
      >
        Forecast Dashboard
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6}>
          <TextField
            label="Number of Weeks"
            type="number"
            value={weeks}
            onChange={(e) => setWeeks(Number(e.target.value))}
            fullWidth
            sx={{
              "& .MuiInputBase-input": {
                color: redTheme.color, // Set input text color to white
              },
              "& .MuiInputLabel-root": {
                color: redTheme.color, // Set label color to white
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: redTheme.buttonColor, // Set border color to red
              },
            }}
          />
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            variant="contained"
            sx={{
              backgroundColor: redTheme.buttonColor,
              color: redTheme.color,
              "&:hover": {
                backgroundColor: "#ff4d4d", // Lighter red on hover
              },
            }}
            onClick={fetchForecastData}
          >
            Get Forecast
          </Button>
        </Grid>
      </Grid>

      {error && (
        <Typography
          variant="body1"
          align="center"
          color="error"
          style={{ marginTop: "1rem" }}
        >
          {error}
        </Typography>
      )}

      {forecastData && (
        <>
          <Box mt={5}>
            <Typography variant="h6" align="center" gutterBottom>
              Forecasted Quantities (Bar Chart)
            </Typography>
            <Bar
              data={{
                labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
                datasets: Object.keys(forecastData).map((category, index) => ({
                  label: category,
                  data: forecastData[category as Category],
                  backgroundColor:
                    redTheme.chartColors[index % redTheme.chartColors.length],
                })),
              }}
              options={{
                responsive: true,
                scales: {
                  x: { ticks: { color: redTheme.color } },
                  y: { ticks: { color: redTheme.color } },
                },
              }}
            />
          </Box>

          <Box mt={5}>
            <Typography variant="h6" align="center" gutterBottom>
              Projected Revenue (Line Chart)
            </Typography>
            <Line
              data={{
                labels: ["Week 1", "Week 2", "Week 3", "Week 4"],
                datasets: Object.keys(forecastData).map((category, index) => ({
                  label: category,
                  data:
                    revenueData[Object.keys(forecastData).indexOf(category)],
                  borderColor:
                    redTheme.chartColors[index % redTheme.chartColors.length],
                  backgroundColor:
                    redTheme.chartColors[index % redTheme.chartColors.length],
                  fill: true,
                })),
              }}
              options={{
                responsive: true,
                scales: {
                  x: { ticks: { color: redTheme.color } },
                  y: { ticks: { color: redTheme.color } },
                },
              }}
            />
          </Box>
        </>
      )}
    </Container>
  );
};

export default ForecastPage;
