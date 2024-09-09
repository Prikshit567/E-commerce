

import React, { Fragment, useEffect, useState } from 'react';
import './Products.css'
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from '../../Redux/slices/productSlice';
import Loader from '../Loader/Loader';
import ProductCard from '../Home/ProductCard';
import { useParams } from 'react-router-dom';
import Pagination from 'react-js-pagination';
import Typography from "@mui/material/Typography";
import Slider from "@mui/material/Slider";
import MetaData from "../layout/MetaData"

const categories = [
  "Laptop",
  "Footwear",
  "Bottom",
  "Top",
  "Attire",
  "Camera",
  "SmartPhones",
  "Electronic",
  "Body Products",
  "Samsung"
];

const Products = () => {
  const dispatch = useDispatch();
  const [currentPage, setCurrentPage] = useState(1);
  const [price, setPrice] = useState([0, 100000]);
  const [category, setCategory] = useState("");
  const [ratings, setRatings] = useState(0);

  const { loading, error, products, productCount, resultPerPage, filteredProductsCount } = useSelector((state) => state.products);

  const { keyword } = useParams();
  console.log("category",category)

  useEffect(() => {
    dispatch(fetchProducts(keyword, currentPage, price, category, ratings));
  }, [dispatch, keyword, currentPage, price, category, ratings]);

  const setCurrentPageNo = (e) => {
    setCurrentPage(e);
  };

  const priceHandler = (event, newPrice) => {
    setPrice(newPrice);
  };

  return (
    <>
      {loading ? (
        <Loader />
      ) : (

        <Fragment>

          <MetaData title={"Products -- ShoppingHub"} />

          <h2 className='productsHeading'>Products</h2>
          <div className='products'>
            {products && products.map(product => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          <div className='filterBox'>
            <Typography>Price</Typography>
            <Slider
              value={price}
              onChange={priceHandler}
              valueLabelDisplay='auto'
              aria-labelledby='range-slider'
              min={0}
              max={200000}
            />
           <Typography>Categories</Typography>
            <ul className="categoryBox">
              {categories.map((category) => (
                <li
                  className="category-link"
                  key={category}
                  onClick={() => setCategory(category)}
                >
                  {category}
                </li>
              ))}
            </ul>
            <Typography>Rating Filter</Typography>
            <Slider
              value={ratings}
              onChange={(e, newRating)=>{
                setRatings(newRating)
              }}
              valueLabelDisplay='auto'
              aria-labelledby='continuous-slider'
              min={0}
              max={5}
            />
            <fieldset>
                
            </fieldset>

          </div>
          {resultPerPage < filteredProductsCount && (
            <div className="paginationBox">
              <Pagination
                activePage={currentPage}
                itemsCountPerPage={resultPerPage}
                totalItemsCount={filteredProductsCount}
                onChange={setCurrentPageNo}
                nextPageText="Next"
                prevPageText="Prev"
                firstPageText="1st"
                lastPageText="Last"
                itemClass="page-item"
                linkClass="page-link"
                activeClass="pageItemActive"
                activeLinkClass="pageLinkActive"
              />
            </div>
          )}
        </Fragment>
      )}
    </>
  );
};

export default Products;
