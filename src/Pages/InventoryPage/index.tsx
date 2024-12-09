// Import React and related hooks
import { FC, useState, useEffect } from "react";
import {
  Container,
  Grid,
  TextField,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
} from "@mui/material";

// Styling for the dark theme
const darkTheme = {
  backgroundColor: "#1c1c1c",
  color: "#ffffff", // White font
  tableHeaderColor: "#2c2c2c",
  tableBorderColor: "#ffffff", // Red table borders
  buttonColor: "#ff0000",
};

// Main component for products page
const InventoryPage: FC = () => {
  const [products, setProducts] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState<string>("");

  // Fetch product data from local JSON or API endpoint
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://35.85.237.96:5500/inventory"); // Adjust the path to your API endpoint
      const data = await response.json();
      setProducts(data);
    } catch (err) {
      console.error("Failed to fetch products data.", err);
    }
  };

  // Fetch data on component mount
  useEffect(() => {
    fetchProducts();
  }, []);

  // Filter products based on search term
  const filteredProducts = products.filter((item) =>
    item.product.productName.toLowerCase().includes(searchTerm.toLowerCase())
  );

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
        Products Inventory
      </Typography>

      {/* Search bar for filtering products by name */}
      <Grid container spacing={2} justifyContent="center" marginBottom="2rem">
        <Grid item xs={12} sm={6}>
          <TextField
            label="Search by Product Name"
            variant="outlined"
            fullWidth
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            sx={{
              "& .MuiInputBase-input": {
                color: "#fff",
              },
              "& .MuiInputLabel-root": {
                color: "#fff",
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#fff",
              },
            }}
          />
        </Grid>
      </Grid>

      {/* Table to display product information */}
      <TableContainer
        component={Paper}
        style={{ backgroundColor: darkTheme.tableHeaderColor }}
      >
        <Table>
          <TableHead>
            <TableRow style={{ backgroundColor: darkTheme.tableHeaderColor }}>
              <TableCell
                style={{
                  color: darkTheme.color,
                  borderBottom: `2px solid ${darkTheme.tableBorderColor}`,
                }}
              >
                Product Name
              </TableCell>
              <TableCell
                style={{
                  color: darkTheme.color,
                  borderBottom: `2px solid ${darkTheme.tableBorderColor}`,
                }}
              >
                Category
              </TableCell>
              <TableCell
                style={{
                  color: darkTheme.color,
                  borderBottom: `2px solid ${darkTheme.tableBorderColor}`,
                }}
              >
                Unit of Measure
              </TableCell>
              <TableCell
                style={{
                  color: darkTheme.color,
                  borderBottom: `2px solid ${darkTheme.tableBorderColor}`,
                }}
              >
                Price
              </TableCell>
              <TableCell
                style={{
                  color: darkTheme.color,
                  borderBottom: `2px solid ${darkTheme.tableBorderColor}`,
                }}
              >
                Stock Size
              </TableCell>
              <TableCell
                style={{
                  color: darkTheme.color,
                  borderBottom: `2px solid ${darkTheme.tableBorderColor}`,
                }}
              >
                Last Restocked
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((item) => (
                <TableRow key={item.product._id}>
                  <TableCell
                    style={{
                      color: darkTheme.color,
                      borderBottom: `2px solid ${darkTheme.tableBorderColor}`,
                    }}
                  >
                    {item.product.productName}
                  </TableCell>
                  <TableCell
                    style={{
                      color: darkTheme.color,
                      borderBottom: `2px solid ${darkTheme.tableBorderColor}`,
                    }}
                  >
                    {item.product.productCategory}
                  </TableCell>
                  <TableCell
                    style={{
                      color: darkTheme.color,
                      borderBottom: `2px solid ${darkTheme.tableBorderColor}`,
                    }}
                  >
                    {item.product.unitOfMeasure}
                  </TableCell>
                  <TableCell
                    style={{
                      color: darkTheme.color,
                      borderBottom: `2px solid ${darkTheme.tableBorderColor}`,
                    }}
                  >
                    ${item.product.productPrice}
                  </TableCell>
                  <TableCell
                    style={{
                      color: darkTheme.color,
                      borderBottom: `2px solid ${darkTheme.tableBorderColor}`,
                    }}
                  >
                    {item.stockSize}
                  </TableCell>
                  <TableCell
                    style={{
                      color: darkTheme.color,
                      borderBottom: `2px solid ${darkTheme.tableBorderColor}`,
                    }}
                  >
                    {new Date(item.lastRestocked).toLocaleDateString()}
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={6}
                  style={{
                    color: darkTheme.color,
                    textAlign: "center",
                    borderBottom: `2px solid ${darkTheme.tableBorderColor}`,
                  }}
                >
                  No products found.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default InventoryPage;
