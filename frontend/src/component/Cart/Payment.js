import React, { Fragment, useRef } from 'react';
import './Payment.css';
import CheckoutSteps from './CheckoutSteps';
import { Typography } from '@mui/material';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EventIcon from '@mui/icons-material/Event';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import { CardNumberElement, CardExpiryElement, CardCvcElement, useStripe, useElements } from "@stripe/react-stripe-js";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import {createOrder} from "../../Redux/slices/orderSlice"


const Payment = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const stripe = useStripe();
    const elements = useElements();

    const { shippingInfo, cartItems } = useSelector((state) => state.cart);
    const { user } = useSelector((state) => state.user);
    const { error } = useSelector((state) => state.order);

    const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

    const paymentData = {
        amount: Math.round(orderInfo.totalPrice * 100),
    };


    const order = {
        shippingInfo,
        orderItems:cartItems,
        itemPrice:orderInfo.subtotal,
        taxPrice:orderInfo.tax,
        shippingPrice:orderInfo.shippingCharges,
        totalPrice:orderInfo.totalPrice
    }
    console.log("order",order)

    const submitHandler = async (e) => {
        e.preventDefault();

        payBtn.current.disabled = true;
        try {
            const config = {
              headers: {
                "Content-Type": "application/json",
              },
            };
            const { data } = await axios.post(
              "/api/v1/payment/process",
              paymentData,
              config
            );

            const client_secret = data.client_secret;
        
        

            if (!stripe || !elements) return;

            const result = await stripe.confirmCardPayment(client_secret, {
                payment_method: {
                    card: elements.getElement(CardNumberElement),
                    billing_details: {
                        name: user.name,
                        email: user.email,
                        address: {
                            line1: shippingInfo.address,
                            city: shippingInfo.city,
                            state: shippingInfo.state,
                            postal_code: shippingInfo.pinCode,
                            country: shippingInfo.country,
                        },
                    },
                },
            });

            if (result.error) {
                payBtn.current.disabled = false;
                console.log("1",result.error.message);
            } else {
                if (result.paymentIntent.status === "succeeded") {
                    order.paymentInfo = {
                        id: result.paymentIntent.id,
                        status: result.paymentIntent.status
                    };
                    console.log("paymentInfo",order.paymentInfo)
                    dispatch(createOrder(order))
                    navigate("/success");
                } else {
                    alert("There is some issue while processing the payment");
                }
            }
        } catch (error) {
            payBtn.current.disabled = false;
            console.log("Error in catch",error)
        }
    };

    const payBtn = useRef(null);

    return (
        <Fragment>
            <CheckoutSteps activeStep={2} />
            <div className='paymentContainer'>
                <form className='paymentForm' onSubmit={(e) => submitHandler(e)}>
                    <Typography>Card Info</Typography>
                    <div>
                        <CreditCardIcon />
                        <CardNumberElement className="paymentInput" />
                    </div>
                    <div>
                        <EventIcon />
                        <CardExpiryElement className="paymentInput" />
                    </div>
                    <div>
                        <VpnKeyIcon />
                        <CardCvcElement className="paymentInput" />
                    </div>
                    <input
                        type="submit"
                        value={`Pay - ₹${orderInfo && orderInfo.totalPrice}`}
                        ref={payBtn}
                        className="paymentFormBtn"
                    />
                </form>
            </div>
        </Fragment>
    );
};

export default Payment;

