import React, { Fragment, useEffect, useState } from 'react';
import "./ProductDetails2.css";
import Carousel from "react-material-ui-carousel";
import { useSelector, useDispatch } from 'react-redux';
// import Loader from '../layout/Loader/Loader';
import { fetchProductDetails, newReview } from '../../Redux/slices/productSlice';
import { useParams } from "react-router-dom"
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Button,
} from "@mui/material";
import { Rating } from "@mui/lab";
import ReactStars from 'react-rating-stars-component'
import Loader from '../Loader/Loader';
import ReviewCard from './ReviewCard';
import MetaData from "../layout/MetaData"
import { addItemsToCart } from '../../Redux/slices/cartSlice';



const ProductDetails = ({ }) => {

    const dispatch = useDispatch();
    const { id } = useParams()
    const { product, loading, error } = useSelector((state) => state.products);

    const { success, error: reviewError } = useSelector(
      (state) => state.products
    );

    const [quantity, setQuantity] = useState(1)
    const [rating, setRating] = useState(0);
    const [comment, setComment] = useState("")
    const [open, setOpen] = useState(false)
    useEffect(() => {
        dispatch(fetchProductDetails(id));
    }, [dispatch, id]);

    const options = {
      size: "large",
      value: product.ratings,
      readOnly: true,
      precision: 0.5,
    };
    const handleDecrement = () =>{
      if (1 >= quantity) return;

    const qty = quantity - 1;
    setQuantity(qty);
  };

    const handleIncrement = () =>{
      if(product.Stock<= quantity) return;

        const qty = quantity + 1;
        setQuantity(qty);
        console.log(qty)
        return
      
    }
    const handleCart = () =>{
      dispatch(addItemsToCart(id, quantity))
    }

    const submitReviewToggle = () => {
      open ? setOpen(false) : setOpen(true);
    };

    const reviewSubmitHandler = () =>{
      const myForm = new FormData();

      myForm.set("rating", rating);
      myForm.set("comment", comment);
      myForm.set("productId",id);

      dispatch(newReview(myForm));
      setOpen(false);
      console.log("working", myForm)
    };
  


    return (
        <Fragment>
          {loading ? (
            <Loader />
          ) : (
            <Fragment>
             <MetaData title={`${product.name} -- ShippingHub`} />
              <div className="ProductDetails">
                {/* <div className='ProductDetails-1'> */}
                  <Carousel>
                    {product.images &&
                      product.images.map((item, i) => (
                        <img
                          className="CarouselImage"
                          key={i}
                          src={item.url}
                          alt={`${i} Slide`}
                        />
                      ))}
                  </Carousel>
                {/* </div> */}
    
                <div className='ProductDetails-2'>
                  <div className="detailsBlock-1">
                    <h2>{product.name}</h2>
                    <p>Product # {product._id}</p>
                  </div>
                  <div className="detailsBlock-2">
                    <ReactStars {...options} />
                    <span className="detailsBlock-2-span">
                      {" "}
                      ({product.numOfReviews} Reviews)
                    </span>
                  </div>
                  <div className="detailsBlock-3">
                    <h1>{`₹${product.price}`}</h1>
                    <div className="detailsBlock-3-1">
                      <div className="detailsBlock-3-1-1">
                        <button onClick={handleDecrement} >-</button>
                        <input readOnly value={quantity}  type="number" />
                        <button onClick={handleIncrement} >+</button>
                      </div>
                      <button
                      disabled={product.Stock < 1 ? true : false}
                       onClick={handleCart} >
                        Add to Cart
                      </button>
                    </div>
    
                    <p>
                      Status:
                      <b className={product.Stock < 1 ? "redColor" : "greenColor"}>
                        {product.Stock < 1 ? "OutOfStock" : "InStock"}
                      </b>
                    </p>
                  </div>
    
                  <div className="detailsBlock-4">
                    Description : <p>{product.description}</p>
                  </div>
    
                  <button onClick={submitReviewToggle} className="submitReview">
                    Submit Review
                  </button>
                </div>
              </div>
    
              <h3 className="reviewsHeading">REVIEWS</h3>
              <Dialog
            aria-labelledby="simple-dialog-title"
            open={open}
            onClose={submitReviewToggle}
          >
            <DialogTitle>Submit Review</DialogTitle>
            <DialogContent className="submitDialog">
              <Rating
                onChange={(e) => setRating(e.target.value)}
                value={rating}
                size="large"
              />

            <textarea 
            className='submitDialogTextArea'
            cols="30"
                rows="5"
                value={comment}
                onChange={(e)=>setComment(e.target.value)}
            ></textarea>
              </DialogContent>
              <DialogActions>
              <Button onClick={submitReviewToggle} color="secondary">
                Cancel
              </Button>
              <Button onClick={reviewSubmitHandler} color="primary">
                Submit
              </Button>
            </DialogActions>
          </Dialog>

             {
              product.reviews && product.reviews[0] ? (
                <div className="reviews">
                {
                 product.reviews  && product.reviews.map((review)=>(
                   <ReviewCard key={review._id} review={review} />
                 ))
                }
                 </div>
              ):( <p className="noReviews">No Reviews Yet</p>
                )}
             
             
            </Fragment>
          )}
        </Fragment>
      );
    };
    
    export default ProductDetails;
