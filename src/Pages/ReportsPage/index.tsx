import { FC, useState } from "react";
import {
  Button,
  Container,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  Typography,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";
import axios from "axios";
import { format } from "date-fns";
import { saveAs } from "file-saver";
import Papa from "papaparse";

// Theme settings for red color
const redTheme = {
  backgroundColor: "#1c1c1c",
  color: "#fff",
  buttonColor: "#ff0000",
  borderColor: "#ffffff",
};

const ReportsPage: FC = () => {
  const [reportType, setReportType] = useState<string>("");
  const [fromDate, setFromDate] = useState<Date | null>(null);
  const [toDate, setToDate] = useState<Date | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  // Handle change in report type selection
  const handleReportTypeChange = (event: SelectChangeEvent<string>) => {
    setReportType(event.target.value as string);
    setFromDate(null);
    setToDate(null);
  };

  // Function to download CSV
  const downloadCSV = (data: any[], filename: string) => {
    const csv = Papa.unparse(data);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, filename);
  };

  // Fetch Sales Report
  const fetchSalesReport = async () => {
    if (!fromDate || !toDate) {
      alert("Please select a date range for Sales report.");
      return;
    }
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:5500/sales/sales/daywise?from=${format(
          fromDate,
          "yyyy-MM-dd"
        )}&to=${format(toDate, "yyyy-MM-dd")}`
      );
      downloadCSV(response.data, "Sales_Report.csv");
    } catch (error) {
      console.error("Failed to fetch sales report.", error);
      alert("Failed to fetch sales report.");
    } finally {
      setLoading(false);
    }
  };

  // Fetch Inventory Report
  const fetchInventoryReport = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5500/inventory");
      const formattedData = response.data.map((item: any) => ({
        productId: item.product.id,
        productName: item.product.productName,
        productCategory: item.product.productCategory,
        unitOfMeasure: item.product.unitOfMeasure,
        productImage: item.product.productImage,
        productPrice: item.product.productPrice,
        lastRestocked: item.lastRestocked,
        stockSize: item.stockSize,
      }));
      downloadCSV(formattedData, "Inventory_Report.csv");
    } catch (error) {
      console.error("Failed to fetch inventory report.", error);
      alert("Failed to fetch inventory report.");
    } finally {
      setLoading(false);
    }
  };

  // Handle report download based on report type
  const handleDownloadReport = () => {
    if (reportType === "Sales") {
      fetchSalesReport();
    } else if (reportType === "Inventory") {
      fetchInventoryReport();
    }
  };

  return (
    <Container
      maxWidth="sm"
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
        Download Reports
      </Typography>

      <Grid container spacing={3} justifyContent="center">
        <Grid item xs={12}>
          <Select
            value={reportType}
            onChange={handleReportTypeChange}
            displayEmpty
            fullWidth
            sx={{
              "& .MuiOutlinedInput-root": {
                "& fieldset": {
                  borderColor: redTheme.borderColor, // Set the border color to white
                },
                "&:hover fieldset": {
                  borderColor: redTheme.buttonColor, // Set hover color to red
                },
                "&.Mui-focused fieldset": {
                  borderColor: redTheme.buttonColor, // Set focused color to red
                },
              },
              "& .MuiInputBase-input": {
                color: redTheme.color,
              },
              "& .MuiSvgIcon-root": {
                color: redTheme.color,
              },
            }}
          >
            <MenuItem value="" disabled>
              Select Report Type
            </MenuItem>
            <MenuItem value="Sales">Sales</MenuItem>
            <MenuItem value="Inventory">Inventory</MenuItem>
          </Select>
        </Grid>

        {reportType === "Sales" && (
          <>
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
                          color: redTheme.color,
                        },
                        "& .MuiInputLabel-root": {
                          color: redTheme.color,
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: redTheme.borderColor,
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
                          color: redTheme.color,
                        },
                        "& .MuiInputLabel-root": {
                          color: redTheme.color,
                        },
                        "& .MuiOutlinedInput-notchedOutline": {
                          borderColor: redTheme.borderColor,
                        },
                      },
                    },
                  }}
                />
              </LocalizationProvider>
            </Grid>
          </>
        )}

        <Grid item xs={12}>
          <Button
            variant="contained"
            fullWidth
            onClick={handleDownloadReport}
            disabled={loading}
            sx={{
              backgroundColor: redTheme.buttonColor,
              color: redTheme.color,
              "&:hover": {
                backgroundColor: "#ff4d4d", // Lighter red on hover
              },
            }}
          >
            {loading ? "Generating Report..." : `Download ${reportType} Report`}
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ReportsPage;
