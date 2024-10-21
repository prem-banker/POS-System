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
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import {
  Box,
  Button,
  Container,
  Grid,
  TextField,
  Typography,
} from "@mui/material";
import { format } from "date-fns";

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

// Styling for the dark theme
const darkTheme = {
  backgroundColor: "#1c1c1c",
  color: "#fff",
  buttonColor: "#ff0000",
};

// Main component
const SalesPage: FC = () => {
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [salesData, setSalesData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch sales data from local JSON file
  const fetchLocalSalesData = async () => {
    try {
      const response = await fetch("/salesData.json"); // Adjust path as needed
      const data = await response.json();
      setSalesData(data);
    } catch (err) {
      setError("Failed to fetch sales data from local file.");
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchLocalSalesData();
  }, []);

  // Filter sales data based on selected date range
  const filteredSalesData = salesData.filter((item) => {
    if (!fromDate || !toDate) return true;
    const saleDate = new Date(item._id);
    return saleDate >= fromDate && saleDate <= toDate;
  });

  // Prepare data for bar and line charts
  const dates = filteredSalesData.map((item) => item._id);
  const totalQuantities = filteredSalesData.map((item) => item.totalQuantity);
  const totalSales = filteredSalesData.map((item) => item.totalSales);

  return (
    <Container
      maxWidth="lg"
      style={{
        backgroundColor: darkTheme.backgroundColor,
        color: darkTheme.color,
        padding: "2rem",
      }}
    >
      <Typography
        variant="h4"
        align="center"
        gutterBottom
        style={{ color: darkTheme.color }}
      >
        Sales Dashboard
      </Typography>

      <Grid container spacing={2} justifyContent="center">
        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="From Date"
              value={fromDate}
              onChange={(date) => setFromDate(date)}
              slotProps={{
                textField: {
                  fullWidth: true,
                  sx: {
                    "& .MuiInputBase-input": {
                      color: "#fff", // Set input text color to white
                    },
                    "& .MuiInputLabel-root": {
                      color: "#fff", // Set label color to white
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#fff", // Set border color to white
                    },
                  },
                },
              }}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={12} sm={6}>
          <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
              label="To Date"
              value={toDate}
              onChange={(date) => setToDate(date)}
              slotProps={{
                textField: {
                  fullWidth: true,
                  sx: {
                    "& .MuiInputBase-input": {
                      color: "#fff", // Set input text color to white
                    },
                    "& .MuiInputLabel-root": {
                      color: "#fff", // Set label color to white
                    },
                    "& .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#fff", // Set border color to white
                    },
                  },
                },
              }}
            />
          </LocalizationProvider>
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

      {filteredSalesData.length > 0 && (
        <>
          <Box mt={5}>
            <Typography variant="h6" align="center" gutterBottom>
              Sales Quantities (Bar Chart)
            </Typography>
            <Bar
              data={{
                labels: dates,
                datasets: [
                  {
                    label: "Total Quantity Sold",
                    data: totalQuantities,
                    backgroundColor: darkTheme.buttonColor,
                  },
                ],
              }}
              options={{
                responsive: true,
                scales: {
                  x: {
                    type: "category",
                    ticks: { color: "#fff" },
                  },
                  y: {
                    ticks: { color: "#fff" },
                  },
                },
              }}
            />
          </Box>

          <Box mt={5}>
            <Typography variant="h6" align="center" gutterBottom>
              Total Sales (Line Chart)
            </Typography>
            <Line
              data={{
                labels: dates,
                datasets: [
                  {
                    label: "Total Sales",
                    data: totalSales,
                    borderColor: darkTheme.buttonColor,
                    backgroundColor: "rgba(255, 0, 0, 0.2)",
                    fill: true,
                  },
                ],
              }}
              options={{
                responsive: true,
                scales: {
                  x: {
                    type: "category",
                    ticks: { color: "#fff" },
                  },
                  y: {
                    ticks: { color: "#fff" },
                  },
                },
              }}
            />
          </Box>
        </>
      )}
    </Container>
  );
};

export default SalesPage;
