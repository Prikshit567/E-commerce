import React, { Fragment, useEffect, useState } from 'react';
import './Shipping.css';
import {Country , State} from 'country-state-city';
import HomeIcon from '@mui/icons-material/Home';
import PublicIcon from '@mui/icons-material/Public';
import LocationCityIcon from '@mui/icons-material/LocationCity';
import PinDropIcon from '@mui/icons-material/PinDrop';
import PhoneIcon from '@mui/icons-material/Phone';
import TransferWithinAStationIcon from '@mui/icons-material/TransferWithinAStation';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { saveShippingInfo } from '../../Redux/slices/cartSlice';
import CheckoutSteps from './CheckoutSteps';





const Shipping = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const { shippingInfo } = useSelector((state) => state.cart || {});

    const [address, setAddress] = useState(shippingInfo?.address || '');
    const [city, setCity] = useState(shippingInfo?.city || '');
    const [state, setState] = useState(shippingInfo?.state || '');
    const [country, setCountry] = useState(shippingInfo?.country || '');
    const [pinCode, setPinCode] = useState(shippingInfo?.pinCode || '');
    const [phoneNumber, setphoneNumber] = useState(shippingInfo?.phoneNumber || '');

    console.log("shippingInfo", shippingInfo)


    const shippingSubmit = (e) =>{
        e.preventDefault()
        console.log("working")
        if(phoneNumber.length > 10 || phoneNumber.length < 10 ){
            alert("Phone Number should be 10 digits long.")
            return;
        }
        dispatch(saveShippingInfo({address, city, state, country, pinCode, phoneNumber}))
        navigate('/order/confirm')
        
    console.log("shippingInfo", shippingInfo)
    }

    useEffect(() => {
        console.log("shipping component rendered");
      }, []);


    return (
        <Fragment>
            <CheckoutSteps activeStep={0}  />
            <div className="shippingContainer">
                <div className="shippingBox">
                    <h2 className="shippingHeading">Shipping Details</h2>


                    <form
                        className="shippingForm"
                        encType="multipart/form-data"
                        onSubmit={shippingSubmit}
                    >

                        <div>
                            <HomeIcon />
                            <input
                                type="text"
                                placeholder="Address"
                                required
                                value={address}
                                onChange={(e) => setAddress(e.target.value)}
                            />
                        </div>
                        <div>
                            <LocationCityIcon />
                            <input
                                type='text'
                                placeholder='City'
                                required
                                value={city}
                                onChange={(e) => setCity(e.target.value)}
                            />
                        </div>

                        <div>
                            <PinDropIcon />
                            <input
                                type="number"
                                placeholder="Pin Code"
                                required
                                value={pinCode}
                                onChange={(e) => setPinCode(e.target.value)}
                            />
                        </div>
                        <div>
                            <PhoneIcon />
                            <input
                                type="number"
                                placeholder="Phone Number"
                                required
                                value={phoneNumber}
                                onChange={(e) => setphoneNumber(e.target.value)}
                                size="10"
                            />
                        </div>

                        <div>
                            <PublicIcon />
                            <select
                                required
                                value={country}
                                onChange={(e) => setCountry(e.target.value)}
                            >

                                <option value="">Country</option>
                                {Country &&
                                    Country.getAllCountries().map((item) => (
                                        <option key={item.isoCode} value={item.isoCode}>
                                            {item.name}
                                        </option>
                                    ))}

                            </select>
                        </div>

                        {country && (
                            <div>
                                <TransferWithinAStationIcon />

                                <select
                                    required
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                >
                                    <option value="">State</option>
                                    {State &&
                                        State.getStatesOfCountry(country).map((item) => (
                                            <option key={item.isoCode} value={item.isoCode}>
                                                {item.name}
                                            </option>
                                        ))}
                                </select>
                            </div>
                        )}

                        <input
                            type="submit"
                            value="Continue"
                            className="shippingBtn"
                            disabled={state ? false : true}
                        />

                    </form>
                </div>
            </div>

        </Fragment>
    )
}

export default Shipping
