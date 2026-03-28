import { it, expect, describe, vi, beforeEach } from "vitest";
import { render, screen } from "@testing-library/react";
// Renders a component in a fake web page
import userEvent from "@testing-library/user-event";
import axios from "axios";
import { Product } from "./Product";
vi.mock('axios'); // this mock the intair axios


let product ;

let loadCart ; // vi.fn() = creates a fake function that doesn't do anything

let user ;
beforeEach(() => {
    product = {
        id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
        image: "images/products/athletic-cotton-socks-6-pairs.jpg",
        name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
        rating: {
            stars: 4.5,
            count: 87
        },
        priceCents: 1090,
        keywords: ["socks", "sports", "apparel"]
    };

    user = userEvent.setup();
    
    loadCart = vi.fn();
});

// beforeEach() afterEach() beforeAll() afterAll() 
// Test Hooks help us to do some clean up with our code



describe('Product component', () => {
    it('displays the product details correctly', () => {

        render(<Product product={product} loadCart={loadCart} />);
        // screen = check the fake web page
        expect(screen.getByText('Black and Gray Athletic Cotton Socks - 6 Pairs')).toBeInTheDocument();

        expect(
            screen.getByText('$10.90')
        ).toBeInTheDocument();


        expect(
            screen.getByTestId('product-image')
        ).toHaveAttribute('src', 'images/products/athletic-cotton-socks-6-pairs.jpg');

        expect(
            screen.getByTestId('product-rating-starts-image')
        ).toHaveAttribute('src', 'images/ratings/rating-45.png');


        expect(
            screen.getByText('87')
        ).toBeInTheDocument();
        // toBeInTheDocument = check if this element exist on the screen or on the fake web page
    })

    it('adds a product to the cart', async () => {

        render(<Product product={product} loadCart={loadCart} />);

        
        const addToCartButton = screen.getByTestId('add-to-cart-button')
        await user.click(addToCartButton); // this simulate a click event and it takes time to click the button so this is asynchronous code (it returns a Promise)


        expect(axios.post).toHaveBeenCalledWith(
            '/api/cart-items',
            {
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 1
            }
        );

        expect(loadCart).toHaveBeenCalled();

    });

    it('Test select a quantity', async () => {
        render(<Product product={product} loadCart={loadCart} />);

        const quantitySelector = screen.getByTestId('product-quantity-selector');
        expect(quantitySelector).toHaveValue('1');

        
        await user.selectOptions(quantitySelector, '3');

        expect(quantitySelector).toHaveValue('3');

        const addToCartButton = screen.getByTestId('add-to-cart-button');
        await user.click(addToCartButton);

        expect(axios.post).toHaveBeenCalledWith(
            '/api/cart-items',
            {
                productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
                quantity: 3
            }
        );
        expect(loadCart).toHaveBeenCalled();


    })
});

// Mock = create a fake version of this function