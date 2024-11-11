import { FC, useEffect, useState } from "react";
import {
  Container,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
} from "@mui/material";

const redTheme = {
  backgroundColor: "#1c1c1c",
  color: "#fff",
  buttonColor: "#ff0000",
  borderColor: "#ffffff",
};

interface Product {
  id: string;
  productName: string;
  productCategory: string;
  unitOfMeasure: string;
  productImage: string;
  productPrice: number;
}

interface PurchaseOrderItem {
  product: Product;
  quantity: number;
  totalAmount: number;
}

const PurchaseOrderPage: FC = () => {
  const [orderItems, setOrderItems] = useState<PurchaseOrderItem[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/purchaseOrderData.json"); // Adjust path as needed
        const data = await response.json();
        setOrderItems(data);
      } catch (error) {
        console.error("Failed to fetch purchase order data:", error);
      }
    };

    fetchData();
  }, []);

  return (
    <Container
      maxWidth="md"
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
        Purchase Order
      </Typography>

      <TableContainer
        component={Paper}
        style={{ backgroundColor: redTheme.backgroundColor }}
      >
        <Table>
          <TableHead>
            <TableRow>
              <TableCell style={{ color: redTheme.color }}>Item Name</TableCell>
              <TableCell style={{ color: redTheme.color }} align="right">
                Quantity
              </TableCell>
              <TableCell style={{ color: redTheme.color }} align="right">
                Rate
              </TableCell>
              <TableCell style={{ color: redTheme.color }} align="right">
                Total Amount
              </TableCell>
              <TableCell style={{ color: redTheme.color }} align="center">
                Action
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {orderItems.map((item) => (
              <TableRow key={item.product.id}>
                <TableCell style={{ color: redTheme.color }}>
                  {item.product.productName}
                </TableCell>
                <TableCell style={{ color: redTheme.color }} align="right">
                  {item.quantity}
                </TableCell>
                <TableCell style={{ color: redTheme.color }} align="right">
                  {item.product.productPrice}
                </TableCell>
                <TableCell style={{ color: redTheme.color }} align="right">
                  {item.totalAmount}
                </TableCell>
                <TableCell align="center">
                  <Button
                    variant="contained"
                    style={{
                      backgroundColor: redTheme.buttonColor,
                      color: redTheme.color,
                    }}
                    onClick={() => {}}
                  >
                    Buy from Vendor
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};

export default PurchaseOrderPage;
