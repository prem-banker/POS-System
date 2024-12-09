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

// Mock JSON data
const mockData: Record<Category, number[]> = {
  Others: [576, 623, 601, 571, 619, 657, 641, 608, 658, 693, 678, 644],
  "Pet Accessories": [15, 14, 15, 17, 16, 17, 18, 16, 17, 18, 17, 18],
  "Pet Food & Treats": [
    718,
    862,
    767,
    774,
    727,
    855,
    761,
    771,
    721,
    848,
    754,
    764,
  ],
  "Pet Grooming": [24, 27, 27, 26, 25, 25, 27, 26, 26, 25, 26, 26],
  "Pet Medicines": [104, 111, 107, 112, 79, 104, 100, 96, 107, 91, 127, 106],
};

const redTheme = {
  backgroundColor: "#1c1c1c",
  color: "#fff",
  buttonColor: "#ff0000",
  chartColors: [
    "rgba(75, 192, 192, 0.6)", // Greenish blue
    "rgba(255, 159, 64, 0.6)", // Orange
    "rgba(54, 162, 235, 0.6)", // Blue
    "rgba(153, 102, 255, 0.6)", // Purple
    "rgba(255, 205, 86, 0.6)", // Yellow
  ],
};

const ForecastPage: FC = () => {
  const [weeks, setWeeks] = useState<number>(1);
  const [forecastData, setForecastData] = useState<Record<Category, number[]>>(
    mockData
  );

  // Filter forecast data based on weeks
  const filteredData = Object.keys(forecastData).reduce((acc, category) => {
    const categoryKey = category as Category;
    acc[categoryKey] = forecastData[categoryKey].slice(0, weeks);
    return acc;
  }, {} as Record<Category, number[]>);

  // Calculate projected revenue
  const calculateRevenue = (data: Record<Category, number[]>) => {
    return Object.keys(data).map((category) => {
      const categoryKey = category as Category; // Assert 'category' as Category
      return data[categoryKey].map(
        (quantity: number) => quantity * prices[categoryKey]
      );
    });
  };

  const revenueData = calculateRevenue(filteredData);

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
                color: redTheme.color,
              },
              "& .MuiInputLabel-root": {
                color: redTheme.color,
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: redTheme.buttonColor,
              },
            }}
          />
        </Grid>
      </Grid>

      <Box mt={5}>
        <Typography variant="h6" align="center" gutterBottom>
          Forecasted Quantities (Bar Chart)
        </Typography>
        <Bar
          data={{
            labels: Array.from({ length: weeks }, (_, i) => `Week ${i + 1}`),
            datasets: Object.keys(filteredData).map((category, index) => ({
              label: category,
              data: filteredData[category as Category],
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
            labels: Array.from({ length: weeks }, (_, i) => `Week ${i + 1}`),
            datasets: Object.keys(filteredData).map((category, index) => ({
              label: category,
              data: revenueData[Object.keys(filteredData).indexOf(category)],
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
    </Container>
  );
};

export default ForecastPage;
