import React, { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
} from "@material-ui/core";
import ProductContext, { Product } from "../../context/ProductContext";
import { useStyles } from "./ProductDetails.styles";
import { Alert } from "@material-ui/lab";

const ProductDetails: React.FC = () => {
  const classes = useStyles();
  const { id } = useParams<{ id: string }>();
  const context = useContext(ProductContext);
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  if (!context) {
    throw new Error("ProductDetails must be used within a ProductProvider");
  }

  const { products, addToCart } = context;
  const product = products.find((p) => p.id === id);

  if (!product) {
    return <div>Product not found{id}</div>;
  }
  const handleCart = (product: Product) => {
    addToCart(product);
    setCheckoutSuccess(true);
    setTimeout(() => {
      setCheckoutSuccess(false);
    }, 2200);
  };

  return (
    <Card className={classes.card}>
      <CardMedia
        className={classes.media}
        component="img"
        alt={product.name}
        image={product.image ? URL.createObjectURL(product.image) : ""}
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
          Product Name:&nbsp;&nbsp;
          <b>{product.name}</b>
        </Typography>
        <br />
        <Typography variant="h6">
          Product Price:&nbsp;&nbsp;
          <b>{product.price}</b>
        </Typography>
        <br />
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleCart(product)}
        >
          Add to Cart
        </Button>
        {checkoutSuccess && (
          <>
          <br />
          <br />
          <Alert severity="success">Product successfully added!</Alert>
          </>
        )}
      </CardContent>
    </Card>
  );
};

export default ProductDetails;
