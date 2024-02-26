import React, { useContext, useState } from "react";

import ProductContext from "../../context/ProductContext";
import {
  CartDropdown,
  CartItem,
  CartItemDeleteIcon,
  CartItemImage,
  CartItemInfo,
  CartItemName,
  CartItemPrice,
  CheckoutButton,
  Divider,
  Total,
} from "../Navbar/Navbar.style";
import { Alert } from "@material-ui/lab";
interface ShoppingCartProps {
  cartOpen: boolean;
  setCartOpen: React.Dispatch<React.SetStateAction<boolean>>;
}
const ShoppingCart: React.FC<ShoppingCartProps> = ({ setCartOpen }) => {
  const context = useContext(ProductContext);

  if (!context) {
    throw new Error("ShoppingCart must be used within a ProductProvider");
  }

  const { cart, removeFromCart } = context;

  const handleDeleteItem = (event: React.MouseEvent, id: string) => {
    event.stopPropagation();
    removeFromCart(id);
  };

  const total = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );
  const [checkoutSuccess, setCheckoutSuccess] = useState(false);

  const handleCheckout = (event: React.MouseEvent) => {
    event.stopPropagation();

    setCheckoutSuccess(true);
    setTimeout(() => {
      setCartOpen(false);
    }, 2600);
  };
  return (
    <CartDropdown>
      <h2>Shopping Cart</h2>
      <Divider />
      {cart.length === 0 && (
        <div style={{ textAlign: "center" }}>
          <h4>
            <br />
            Empty Cart
            <br />
            <br />
          </h4>
        </div>
      )}
      {cart.map((item) => (
        <CartItem key={item.id}>
          <CartItemImage
            src={item.image ? URL.createObjectURL(item.image) : ""}
            alt={item.name}
          />
          <CartItemInfo>
            <CartItemName>{item.name}</CartItemName>
            <CartItemPrice>
              ${item.price} x {item.quantity}
            </CartItemPrice>
          </CartItemInfo>
          <CartItemDeleteIcon
            onClick={(event) => handleDeleteItem(event, item.id)}
          />
        </CartItem>
      ))}
      <Divider />
      <Total>Total: ${total}</Total>
      <CheckoutButton style={{marginBottom:'20px'}} onClick={(event) => handleCheckout(event)}>
        Checkout
      </CheckoutButton>
   
      {checkoutSuccess && <Alert severity="success">Checkout complete!</Alert>}
    </CartDropdown>
  );
};

export default ShoppingCart;
