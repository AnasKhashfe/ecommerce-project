import axios from 'axios';
import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router';
import { Header } from '../../components/Header';
import { ProductsGrid } from './ProductsGrid';
import './HomePage.css';

export function HomePage({ cart, loadCart }) {
    const [products, setProducts] = useState([]);
    const [searchParams] = useSearchParams();
    const search = searchParams.get('search');
    
    useEffect(() => {

        const getHomeData = async () => {
            const urlPath = search 
            ? `/api/products?search=${search}`
            : '/api/products';
            const response = await axios.get(urlPath)
            setProducts(response.data)
        }
            
        getHomeData();
// we added 'http://localhost:3000 to vite.config.js so when it see /api auto the request will go to localhost:3000'

    }, [search])


    return (
        <>

            <title>Ecommerce Project</title>


            <Header cart = { cart } />

            <div className="home-page">
                <ProductsGrid products={ products } loadCart={loadCart} />
            </div>
        </>
    );
}