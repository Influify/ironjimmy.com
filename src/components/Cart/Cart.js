import React from "react"
import PropTypes from "prop-types"
import styled from "styled-components"
import LineItems from "./LineItems"
import {displayPrice} from "../../utils/price"

const Total = styled.p`
    border-top: 2px solid ${({theme}) => theme.colors.black};
    padding-top: 3rem;
    text-align: right;
    font-size: 2rem;
    font-weight: 600;
    text-transform: uppercase;
`

const Checkout = styled.a`
    color: ${({theme}) => theme.colors.black};
    justify-self: center;
    padding: 1.5rem 6rem;
    border: none;
    font-weight: 600;
    text-transform: uppercase;
    border-radius: 3px;
    background: ${({theme}) => theme.colors.red};
    cursor: pointer;
    transition: all 300ms;

    &:hover {
        background: ${({theme}) => theme.colors.darkred};
        color: ${({theme}) => theme.colors.black};
    }
`

const Cart = ({cart}) => {
    return (
        <>
            <LineItems cart={cart}/>
            <Total>{displayPrice(cart.totalPrice)}</Total>
            <Checkout href={cart.webUrl}>Checkout</Checkout>
        </>
    )
}

Cart.propTypes = {
    cart: PropTypes.object.isRequired,
}

export default Cart
