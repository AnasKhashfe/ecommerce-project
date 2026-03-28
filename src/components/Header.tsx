import { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router';
import './header.css';

type HeaderProps = {
    cart: {
        productId: string;
        quantity: number;
        deliveryOptionId: string;
    }[];
}


export function Header({ cart }: HeaderProps) // This tells TypeScript that cart Prop has object by typing {} with a property called cart and cart is an array inside array is an object and every object has thies three values .
//{}[] curly brackets and after that square brackets thats mean thier is an array of objects .

{
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();



    const searchText = searchParams.get('search');


    const [search, setSearch] = useState(searchText || '')

    const updateSearchInput = (event:
        React.ChangeEvent<HTMLInputElement> // The type is React.ChangeEvent and <HTMLInputElement> --> is to descirbe what the element is (input, textare , ...)
    ) => {
        setSearch(event.target.value);
    }

    const searchProducts = () => {
        navigate(`/?search=${search}`)
    }


    let totalQuantity = 0;
    cart.forEach((cartItem) => {
        totalQuantity += cartItem.quantity;
    })

    return (
        <div className="header">
            <div className="left-section">
                <Link to="/" className="header-link">
                    <img className="logo"
                        data-testid='header-logo'
                        src="images/mobile-logo-white.png" />
                    <img className="mobile-logo"
                        data-testid='header-mobile-logo'
                        src="images/mobile-logo-white.png" />
                </Link>
            </div>

            <div className="middle-section">
                <input className="search-bar" type="text" placeholder="Search" value={search} onChange={updateSearchInput} data-testid='header-search-bar' />

                <button className="search-button" onClick={searchProducts} data-testid='header-search-button'>
                    <img className="search-icon" src="images/icons/search-icon.png" />
                </button>
            </div>

            <div className="right-section">
                <Link className="orders-link header-link" to="/orders" data-testid='header-orders-link'>

                    <span className="orders-text">Orders</span>
                </Link>

                <Link className="cart-link header-link" to="/checkout" data-testid='header-cart-link'>
                    <img className="cart-icon" src="images/icons/cart-icon.png" />
                    <div className="cart-quantity">{totalQuantity}</div>
                    <div className="cart-text">Cart</div>
                </Link>
            </div>
        </div>

    );
}