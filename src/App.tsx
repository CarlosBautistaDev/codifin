import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductList from './screens/ProductList';
import HomePage from './screens/HomePage';
import GlobalStyle from './components/GlobalStyle';
import NavBar from './components/Navbar/Navbar';
import { Product, ProductProvider } from './context/ProductContext';
import { useState } from 'react';
import ProductForm from './screens/ProductForm';
import ProductDetails from './screens/ProductDetails';

function App() {
  const [products, setProducts] = useState<Product[]>([]);

  return (
    <Router>
      <GlobalStyle />
      <ProductProvider value={{ products, setProducts }}>
        <NavBar />
        <Routes>
          <Route path="/products/new" element={<ProductForm />} />
          <Route path="/products/list" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetails />} />
          <Route path="/home" element={<HomePage />} />
          <Route path="/" element={<HomePage />} />
        </Routes>
      </ProductProvider>
    </Router>
  );    
}

export default App;