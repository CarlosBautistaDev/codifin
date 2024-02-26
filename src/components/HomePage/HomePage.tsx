import { Link } from 'react-router-dom';
import { Container, Card, Footer } from './HomePage.style';
import { FaList, FaPlusCircle } from 'react-icons/fa';

function HomePage() {
    return (
        <>
            <Container>
                <Link to="/products/new">
                    <Card>
                        <FaPlusCircle size={48} />
                        <h2>Add Product</h2>
                    </Card>
                </Link>
                <Link to="/products/list">
                    <Card>
                        <FaList size={48} />
                        <h2>Product List</h2>
                    </Card>
                </Link>
            </Container>
            <Footer>This test was performed by Carlos Bautista</Footer>
        </>
    );
}

export default HomePage;