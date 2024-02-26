import styled from "styled-components";
import { FaList, FaPlusCircle } from "react-icons/fa";

export const Container = styled.div`
  width: 100%;
  height: calc(100vh - 60px); 
  display: flex;
  justify-content: center;
  align-items: center;
  background: #1e1e1e;
  color: #fff;
`;

export const CardsContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
export const Card = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 300px;
  height: 200px;
  margin: 20px;
  padding: 20px;
  border-radius: 10px;
  background: #252526;
  color: #c7c7c7;
  text-align: center;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
  transition: transform 0.3s ease-in-out;

  &:hover {
    transform: scale(1.05);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    width: 80%;
    font-size: 0.8em;
  }
`;

export const IconList = styled(FaList)`
  font-size: 48px;
  margin-bottom: 10px;
`;

export const IconPlusCircle = styled(FaPlusCircle)`
  font-size: 48px;
  margin-bottom: 10px;
`;

export const Footer = styled.footer`
  position: fixed;
  bottom: 0;
  width: 100%;
  padding: 10px;
  text-align: center;
  background: #252526;
  color: #c7c7c7;
`;
