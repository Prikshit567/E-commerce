import React, { Fragment, useEffect, useState } from 'react';
import './ProductReview.css'
import Sidebar from './Sidebar';
import { DataGrid } from '@mui/x-data-grid';
import { useNavigate, useParams } from 'react-router-dom';
import { Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { useDispatch, useSelector } from 'react-redux';
import Star from "@mui/icons-material/Star";
import { deleteReview, getAllReviews, deleteReviewsReset,  ClearErrors } from '../../Redux/slices/productSlice';
import MetaData from '../layout/MetaData';




const ProductReview = () => {
  
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // const { productId } = useParams();

    const {reviews, isDeleted, error, loading} = useSelector((state)=>state.products);

    const [productId, setProductId] = useState("");

    const deleteReviewHandler = (reviewId) =>{
     
        dispatch(deleteReview(reviewId, productId))
    }
 

    const productReviewsSubmitHandler = (e) =>{
        e.preventDefault();
        dispatch(getAllReviews(productId))
    }

    useEffect(()=>{
        if (productId.length === 24) {
            dispatch(getAllReviews(productId));
          
          }
      if(error){
        console.log(error);
        dispatch(ClearErrors())
      };
      if(isDeleted){
       
        navigate("/admin/reviews");
        dispatch(deleteReviewsReset());
      }

    },[dispatch, error, isDeleted,  navigate, productId ])  
    const columns = [
        { field: "id", headerName: "Review ID", minWidth: 180, flex: 0.8 },

        {
          field: "user",
          headerName: "User",
          minWidth: 200,
          flex: .6,
        },
        {
          field: "comment",
          headerName: "Comment",
          minWidth: 350,
          flex: 1,
        },
    
        {
          field: "rating",
          headerName: "Rating",
          type: "number",
          minWidth: 180,
          flex: 0.4,
          cellClassName: (params) => {
            return  params.row.rating >= 3 ? "greenColor" : "redColor";
          },
        },
    
    
        {
          field: "actions",
          flex: 0.3,
          headerName: "Actions",
          minWidth: 150,
          type: "number",
          sortable: false,
            renderCell: (params) => {
              return (
                <Fragment>
            <Button
           
              onClick={() =>{
                deleteReviewHandler(params.row.id)
        
        }
              }
            >
              <DeleteIcon />
            </Button>
          </Fragment>
              );
            },
          },
    ]
    const rows = [];

    reviews &&
      reviews.forEach((item) => {
        rows.push({
          id: item._id,
          rating: item.rating,
          comment: item.comment,
          user: item.name,
        });
      });

//    console.log("users ---->",users)


   
  return (
    <Fragment>
    <MetaData title={`ALL REVIEWS - Admin`} />

    <div className="dashboard">
      <Sidebar />
      <div className="productReviewsContainer">
        <form
          className="productReviewsForm"
          onSubmit={productReviewsSubmitHandler}
        >
          <h1 className="productReviewsFormHeading">ALL REVIEWS</h1>

          <div>
            <Star />
            <input
              type="text"
              placeholder="Product Id"
              required
              value={productId}
              onChange={(e) =>{ setProductId(e.target.value)
               }
              }
            />
          </div>

          <Button
            id="createProductBtn"
            type="submit"
            disabled={
              loading ? true : false || productId === "" ? true : false
            }
          >
            Search
          </Button>
        </form>

        {reviews && reviews.length > 0 ? (
          <DataGrid
            rows={rows}
            columns={columns}
            pageSize={10}
            disableSelectionOnClick
            className="productListTable"
            autoHeight
          />
        ) : (
          <h1 className="productReviewsFormHeading">No Reviews Found</h1>
        )}
      </div>
    </div>
  </Fragment>
  )
}

export default ProductReview
