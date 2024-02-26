import { useState } from "react";
import {
  NavbarContainer,
  Logo,
  IconsContainer,
  Icon,
  ShoppingCartIcon,
} from "./Navbar.style";
import ShoppingCart from "../ShoppingCart/ShoppingCart";
import { Button } from "@material-ui/core";
import { Link } from "react-router-dom";

const Navbar = () => {
  const [cartOpen, setCartOpen] = useState(false);

  return (
    <NavbarContainer>
      <Link to={`/`}>
        <Logo>Codifin</Logo>
      </Link>

      <IconsContainer>
        <Icon>
          <Button
            style={{ color: "white" }}
            variant="text"
            component={Link}
            to={`/products/new`}
          >
            New Product
          </Button>
        </Icon>
        <Icon>
          <Button
            style={{ color: "white" }}
            variant="text"
            component={Link}
            to={`/products/list`}
          >
            Products List
          </Button>
        </Icon>
        <Icon onClick={() => setCartOpen(!cartOpen)}>
          <ShoppingCartIcon />
          {cartOpen && (
            <ShoppingCart cartOpen={cartOpen} setCartOpen={setCartOpen} />
          )}
        </Icon>
      </IconsContainer>
    </NavbarContainer>
  );
};

export default Navbar;
