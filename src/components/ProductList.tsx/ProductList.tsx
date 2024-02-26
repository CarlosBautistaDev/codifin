import React, { useContext, useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Paper,
  Grid,
} from "@material-ui/core";
import { FaArrowUp, FaArrowDown } from "react-icons/fa";
import ProductContext, { Product } from "../../context/ProductContext";
import { Link } from "react-router-dom";
import { Alert } from "@material-ui/lab";

const useStyles = makeStyles((theme) => ({
  container: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#d0d0d0",
    borderRadius: "10px",
    boxShadow: "0px 0px 10px rgba(0, 0, 0, 0.1)",
    padding: "20px",
    maxWidth: "90%",
    margin: "0 auto",
    marginTop: "50px",
    [theme.breakpoints.up("sm")]: {
      maxWidth: "75%",
    },
    [theme.breakpoints.up("md")]: {
      maxWidth: "50%",
    },
  },
  table: {
    minWidth: 650,
    backgroundColor: "white",
    color: "black",
  },
  whiteText: {
    color: "#393939",
  },
}));

const ProductList: React.FC = () => {
  const classes = useStyles();
  const context = useContext(ProductContext);
  const [search, setSearch] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  if (!context) {
    throw new Error("ProductList must be used within a ProductProvider");
  }

  const { products, addToCart } = context;
  const handleCart = (product: Product) => {
    addToCart(product);
    setCheckoutSuccess(true);
    setTimeout(() => {
      setCheckoutSuccess(false);
    }, 2200);
  };
  const sortedProducts = [...products].sort((a, b) => {
    const nameA = a.name.toLowerCase();
    const nameB = b.name.toLowerCase();

    if (sortOrder === "asc") {
      if (nameA < nameB) return -1;
      if (nameA > nameB) return 1;
      return 0;
    } else {
      if (nameA > nameB) return -1;
      if (nameA < nameB) return 1;
      return 0;
    }
  });

  const filteredProducts = sortedProducts.filter((product) =>
    product.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className={classes.container}>
      {checkoutSuccess && (
        <Alert severity="success">Product successfully added!</Alert>
      )}
      <h1 className={classes.whiteText}>Product List</h1>
      <Grid container spacing={0}>
        <Grid item xs={6} sm={6}>
          <div style={{ display: "flex", justifyContent: "center" }}>
            <TextField
              label="Search by name"
              variant="outlined"
              fullWidth
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </Grid>
        <Grid item xs={6} sm={6}>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginBottom: "50px",
            }}
          >
            <Button
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
              startIcon={sortOrder === "asc" ? <FaArrowUp /> : <FaArrowDown />}
            >
              Sort by price ({sortOrder === "asc" ? "ascending" : "descending"})
            </Button>
          </div>
        </Grid>
      </Grid>

      <TableContainer component={Paper}>
        <Table className={classes.table} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.whiteText}>Name</TableCell>
              <TableCell className={classes.whiteText}>Price</TableCell>
              <TableCell className={classes.whiteText}>Image</TableCell>
              <TableCell className={classes.whiteText}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredProducts.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className={classes.whiteText}>
                  No products found
                </TableCell>
              </TableRow>
            )}
            {filteredProducts.map((product) => (
              <TableRow key={product.name}>
                <TableCell
                  component="th"
                  scope="row"
                  className={classes.whiteText}
                >
                  {product.name}
                </TableCell>
                <TableCell className={classes.whiteText}>
                  {product.price}
                </TableCell>
                <TableCell className={classes.whiteText}>
                  {product.image && (
                    <img
                      src={URL.createObjectURL(product.image)}
                      alt={product.name}
                      style={{ maxWidth: "100px" }}
                    />
                  )}
                </TableCell>
                <TableCell className={classes.whiteText}>
                  <Button
                    variant="contained"
                    component={Link}
                    to={`/products/${product.id}`}
                  >
                    View Details
                  </Button>
                  &nbsp; &nbsp; &nbsp;
                  <Button
                    color="primary"
                    variant="contained"
                    onClick={() => handleCart(product)}
                  >
                    Add to Cart
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  );
};

export default ProductList;
