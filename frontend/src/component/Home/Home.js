import React, { Fragment, useEffect } from 'react'
// import { Link } from 'react-router-dom'
import {useSelector, useDispatch} from "react-redux";
import { fetchProducts, ClearError } from '../../Redux/slices/productSlice';

import {CgMouse} from 'react-icons/cg'
import { Link as ScrollLink } from 'react-scroll';
import './Home.css'
import ProductCard from './ProductCard';
import MetaData from '../layout/MetaData'
import Loader from '../Loader/Loader';
import { toast } from "react-toastify"

// const product={
//     name:"Nike Shoes",
//     images:[{url:"https://images.unsplash.com/photo-1475998893297-4da48a6e037d?q=80&w=1888&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}],
//     price:"₹6000",
//     _id:"prikshit"
// }
const Home = () => {
  const dispatch = useDispatch();
  const {loading, error, products} = useSelector((state)=>state.products)
  
  useEffect(() => {

    if (error) {
     toast.error(error);
      dispatch(ClearError());
    }
    dispatch(fetchProducts());
  }, [dispatch, error, alert]);
  return (
    <Fragment>
      {
        loading ?(
          <Loader />
        ) :
        <Fragment>

        <MetaData title="ShopingBuzz" />
          <div className="banner">
            <p>Welcome to Shopping Hub</p>
            <h1>FIND AMAZING PRODUCTS BELOW</h1>

           <div className="button">
           <ScrollLink to="container">
              <button>
                Scroll <CgMouse />
              </button>
            </ScrollLink>
           </div>
          </div>

        <h2 className="homeHeading">Featuring Our Latest Product</h2>    
        <div className="container" id="contianer">
            {
              products && products.map(product=>(<ProductCard product={product} />    
              ))}
        </div>
              
          </Fragment>
      }
    </Fragment>
  );
};

export default Home;
