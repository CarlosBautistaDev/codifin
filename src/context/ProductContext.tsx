import React, { useState } from "react";

export interface Product {
  id: string;
  name: string;
  price: number;
  image: File | null;
}

interface CartItem extends Product {
  quantity: number;
}

interface ProductContextProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  cart: CartItem[];
  addToCart: (product: Product) => void;
}
interface ProductContextProps {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  cart: CartItem[];
  addToCart: (product: Product) => void;
  removeFromCart: (productId: string) => void; 
}
const ProductContext = React.createContext<ProductContextProps | undefined>(
  undefined
);

export const ProductProvider: React.FC = ({ children }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [cart, setCart] = useState<CartItem[]>([]);

  const addToCart = (product: Product) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((p) => p.id === product.id);
      if (existingProduct) {
        return prevCart.map((p) =>
          p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p
        );
      } else {
        return [...prevCart, { ...product, quantity: 1 }];
      }
    });
  };
  const removeFromCart = (productId: string) => {
    setCart((prevCart) =>
      prevCart.reduce((acc, item) => {
        if (item.id === productId) {
          if (item.quantity > 1) {
            return [...acc, { ...item, quantity: item.quantity - 1 }];
          }
          return acc;
        } else {
          return [...acc, item];
        }
      }, [] as CartItem[])
    );
  };

  return (
    <ProductContext.Provider
      value={{ products, setProducts, cart, addToCart, removeFromCart }}
    >
      {children}
    </ProductContext.Provider>
  );
};

export const ProductConsumer = ProductContext.Consumer;

export default ProductContext;
