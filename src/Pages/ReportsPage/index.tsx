import { FC, useState } from "react";
import {
  Box,
  Button,
  Container,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  Typography,
} from "@mui/material";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider, DatePicker } from "@mui/x-date-pickers";

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

  // Handle change in report type selection
  const handleReportTypeChange = (event: SelectChangeEvent<string>) => {
    setReportType(event.target.value as string);
    setFromDate(null);
    setToDate(null);
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
            sx={{
              backgroundColor: redTheme.buttonColor,
              color: redTheme.color,
              "&:hover": {
                backgroundColor: "#ff4d4d", // Lighter red on hover
              },
            }}
          >
            Download {reportType} Report
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default ReportsPage;
