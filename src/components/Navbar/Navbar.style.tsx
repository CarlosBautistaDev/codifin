import styled from "styled-components";
import { FaShoppingCart, FaUser, FaList, FaTrash } from "react-icons/fa";

export const NavbarContainer = styled.nav`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding-right: 30px;
  padding-left: 30px;
  background: #2a2a2a;
  color: #fff;
  height: 60px;

  @media (max-width: 768px) {
    flex-direction: column;
    height: auto;
  }
`;

export const Logo = styled.h1`
  color: #fff;
  background-color: #4c4c4c;
  padding: 4px 10px;
  border-radius: 10px;
`;

export const IconsContainer = styled.div`
  display: flex;
  align-items: center;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

export const Icon = styled.div`
  margin: 0 30px;
  cursor: pointer;
  @media (max-width: 768px) {
    margin: 10px 0;
  }
`;

export const ShoppingCartIcon = styled(FaShoppingCart)`
  font-size: 24px;
`;

export const UserIcon = styled(FaUser)`
  font-size: 24px;
`;

export const ListIcon = styled(FaList)`
  font-size: 24px;
`;

export const CartDropdown = styled.div`
  position: absolute;
  right: 0;
  width: 300px;
  max-height: 400px;
  overflow-y: auto;
  padding: 20px;
  background: #252526;
  color: #c7c7c7;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
`;

export const CartItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 20px;
`;

export const CartItemImage = styled.img`
  width: 50px;
  height: 50px;
  margin-right: 10px;
`;

export const CartItemInfo = styled.div`
  flex-grow: 1;
`;

export const CartItemName = styled.p`
  margin: 0;
  font-weight: bold;
`;

export const CartItemPrice = styled.p`
  margin: 0;
`;

export const Divider = styled.hr`
  border: none;
  border-top: 1px solid #c7c7c7;
`;

export const Total = styled.p`
  text-align: right;
  font-weight: bold;
`;

export const CheckoutButton = styled.button`
  width: 100%;
  padding: 10px;
  margin-top: 20px;
  background: #1e1e1e;
  color: #fff;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background: #252526;
  }
`;
export const CartItemDeleteIcon = styled(FaTrash)`
  cursor: pointer;
  font-size: 20px;
`;
