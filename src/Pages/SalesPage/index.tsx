import { FC, useState } from "react";
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
import axios from "axios";

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
  buttonColor: "#b00020",
};

// Main component
const SalesPage: FC = () => {
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [salesData, setSalesData] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch sales data
  const fetchSalesData = async () => {
    if (!fromDate || !toDate) {
      setError("Please select both 'From' and 'To' dates.");
      return;
    }
    setError(null);

    try {
      const response = await axios.get(
        `http://localhost:5500/sales/sales/daywise?from=${format(
          fromDate,
          "yyyy-MM-dd"
        )}&to=${format(toDate, "yyyy-MM-dd")}`
      );
      setSalesData(response.data);
    } catch (err) {
      setError("Failed to fetch sales data. Please try again.");
    }
  };

  // Prepare data for bar and line charts
  const dates = salesData.map((item) => item._id);
  const totalQuantities = salesData.map((item) => item.totalQuantity);
  const totalSales = salesData.map((item) => item.totalSales);

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
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#fff", // Set border color to white on hover
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#ff0000", // Set border color to red when focused
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
                    "&:hover .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#fff", // Set border color to white on hover
                    },
                    "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                      borderColor: "#ff0000", // Set border color to red when focused
                    },
                  },
                },
              }}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={12}>
          <Button
            variant="contained"
            fullWidth
            style={{ backgroundColor: darkTheme.buttonColor, color: "#fff" }}
            onClick={fetchSalesData}
          >
            Fetch Sales Data
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

      {salesData.length > 0 && (
        <>
          <Box mt={5}>
            <Typography variant="h6" align="center" gutterBottom>
              Sales Quantities
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
              Total Sales (in ₹)
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
