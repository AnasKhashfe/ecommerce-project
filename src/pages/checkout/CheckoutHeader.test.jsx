import { describe, it, expect, vi, beforeEach } from 'vitest';
import axios from 'axios';
import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router';
import { CheckoutHeader } from './CheckoutHeader';

vi.mock('axios');

describe('CheckoutHeader component', () => {
    let loadCart;
    let cart;
    let deliveryOptions;


    beforeEach(() => {
        loadCart = vi.fn();

        cart = [{
            productId: 'e43638ce-6aa0-4b85-b27f-e1d07eb678c6',
            quantity: 2,
            deliveryOptionId: '1',
            product: {
                id: "e43638ce-6aa0-4b85-b27f-e1d07eb678c6",
                image: "images/products/athletic-cotton-socks-6-pairs.jpg",
                name: "Black and Gray Athletic Cotton Socks - 6 Pairs",
                rating: {
                    stars: 4.5,
                    count: 87
                },
                priceCents: 1090,
                keywords: ["socks", "sports", "apparel"]
            }
        }, {
            productId: '15b6fc6f-327a-4ec4-896f-486349e85a3d',
            quantity: 1,
            deliveryOptionId: '2',
            product: {
                id: "15b6fc6f-327a-4ec4-896f-486349e85a3d",
                image: "images/products/intermediate-composite-basketball.jpg",
                name: "Intermediate Size Basketball",
                rating: {
                    stars: 4,
                    count: 127
                },
                priceCents: 2095,
                keywords: ["sports", "basketballs"]
            }
        }];
        deliveryOptions = [{
            id: '1',
            deliveryDays: 7,
            priceCents: 0,
            estimatedDeliveryTimeMs: 1747597994451,
        }, {
            id: '2',
            deliveryDays: 3,
            priceCents: 499,
            estimatedDeliveryTimeMs: 1747252394451,
        }, {
            id: '3',
            deliveryDays: 1,
            priceCents: 999,
            estimatedDeliveryTimeMs: 1747079594451,
        }];

        axios.get.mockImplementation(async (url) => {
            if(url === '/api/delivery-options?expand=estimatedDeliveryTime'){
                return {data : deliveryOptions}
            }
            
        })

    });

    it('displays the page correctly' , async () => {
        render(
            <MemoryRouter>
                <CheckoutHeader cart={cart} loadCart={loadCart}/>
            </MemoryRouter>
        );

        
    })



})