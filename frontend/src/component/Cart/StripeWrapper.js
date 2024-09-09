import React, { useEffect, useState } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements } from '@stripe/react-stripe-js';
import axios from 'axios';
import Loader from '../Loader/Loader'; // Adjust the path according to your project structure
import Payment from './Payment'; // Adjust the path according to your project structure

const StripeWrapper = () => {
    const [stripeApiKey, setStripeApiKey] = useState("");
    const [loading, setLoading] = useState(true);

    async function getStripeApiKey() {
        const { data } = await axios.get("/api/v1/stripeapikey");
        setStripeApiKey(data.stripeApiKey);
        setLoading(false);
    }

    useEffect(() => {
        getStripeApiKey();
    }, []);

    const stripePromise = stripeApiKey ? loadStripe(stripeApiKey) : null;

    return (
        loading ? (
            <Loader />
        ) : (
            stripePromise && (
                <Elements stripe={stripePromise}>
                    <Payment />
                </Elements>
            )
        )
    );
};

export default StripeWrapper;
