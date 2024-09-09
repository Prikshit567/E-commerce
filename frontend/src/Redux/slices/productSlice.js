
import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";


const initialState = {
  loading: false,
  error: null,
  products: [],
  adminProducts: [],
  product: {},
  productCount: 0,
  success: false,
  resultPerPage:0,
  category:"",
  filteredProductsCount:0,
  isDeleted:false,
  isUpdated:false,
  reviews:[],
};

const productSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    fetchDataRequest: (state) => {
      state.loading = true;
      state.products = [];
      
    },
    fetchDataSuccess: (state, action) => {
      state.loading = false;
      state.products = action.payload.products;
      state.productCount = action.payload.productCount;
      state.resultPerPage= action.payload.resultPerPage;
      state.filteredProductsCount = action.payload.filteredProductsCount;
    },
    fetchDataFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    adminProductRequest:(state,action)=>{
      state.loading = true;
    },
    adminProductSuccess:(state,action)=>{
      state.loading = false;
      state.adminProducts = action.payload.adminProducts
    },
    adminProductFail:(state,action)=>{
      state.loading = false;
      state.error = action.payload.error;
    },
    ClearError: (state) => {
      state.error = null;
    },
    fetchDetailsRequest: (state) => {
      state.loading = true;
    },
    fetchDetailsSuccess: (state, action) => {
      state.loading = false;
      state.product = action.payload.product;
    },
    fetchDetailsFail: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
    newReviewRequest:(state, action) =>{
      state.loading = true;
    },
    newReviewSuccess:(state, action) =>{
      state.loading = false;
      state.success = action.payload.success;
    },
    newReviewFail:(state,action)=>{
      state.loading = true;
      state.error = action.payload
    },
    newProductRequest:(state, action) =>{
      state.loading = true;
    },
    newProductsSuccess:(state, action) =>{
      state.loading = false;
      state.success = action.payload.success;
      state.product = action.payload.product
    },
    newProductFail:(state,action)=>{
      state.loading = true;
      state.error = action.payload
    },
    deleteProductRequest:(state, action)=>{
      state.loading  = true;
    },
    deleteProductSuccess:(state,action)=>{
      state.loading = false;
      state.isDeleted = action.payload.success;
    },
    deleteProductFail:(state,action)=>{
      state.loading = false;
      state.error = action.payload.error;
    },
    deleteProductReset:(state, action)=>{
      state.isDeleted = false;
    },
    updateProductRequest:(state,action)=>{
      state.loading = true;
    },
    updateProductSuccess:(state,action)=>{
      state.loading = false;
      state.isUpdated = action.payload.success;
    },
    updateProductFail:(state,action)=>{
      state.loading = true;
      state.error = action.payload.error;
    },
    updateProductReset:(state,action)=>{
      state.isUpdated = false;
    },
    allReviewsRequest:(state,action)=>{
      state.loading = true;
    },
    allReviewsSuccess:(state,action)=>{
      state.loading = false;
      state.reviews = action.payload;
    },
    allReviewsFail:(state,action)=>{
      state.loading = true;
      state.error = action.payload.error;
    },
    deleteReviewsRequest:(state,action)=>{
      state.loading = true;
    },
    deleteReviewsSuccess:(state,action)=>{
      state.loading = true;
      state.isDeleted = action.payload
    },
    deleteReviewsFail:(state,action)=>{
      state.loading = true;
      state.error = action.payload.error;
    },
    deleteReviewsReset:(state,action)=>{
      state.isDeleted = false;
    },
  },
});

export const {
  fetchDataRequest,
  fetchDataSuccess,
  fetchDataFail,
  ClearError,
  fetchDetailsRequest,
  fetchDetailsSuccess,
  fetchDetailsFail,
  newReviewFail,
  newReviewRequest,
  newReviewSuccess,
  adminProductFail,
  adminProductRequest,
  adminProductSuccess,
  newProductFail,
  newProductRequest,
  newProductsSuccess,
  deleteProductFail,
  deleteProductRequest,
  deleteProductReset,
  deleteProductSuccess,
  updateProductRequest,
  updateProductSuccess,
  updateProductFail,
  updateProductReset,
  allReviewsFail,
  allReviewsRequest,
  allReviewsSuccess,
  deleteReviewsFail,
  deleteReviewsRequest,
  deleteReviewsReset,
  deleteReviewsSuccess,
} = productSlice.actions;

export default productSlice.reducer;

// Fetching all Products user
export const fetchProducts = (keyword="", currentPage=1, price=[0, 1000000000], category, ratings=0) => async (dispatch) => {
  try {
    dispatch(fetchDataRequest());

    let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${ratings}`;

    if(category){
      // link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${ratings}`
      link += `&category=${category}`;
    }

    console.log("fetchProducts - category:", category);
    console.log("fetchProducts - link:", link);

   
    const { data } = await axios.get(link);
    dispatch(fetchDataSuccess({
        products: data.products,
        productCount: data.productCount,
        resultPerPage: data.resultPerPage,
        filteredProductsCount:data.filteredProductsCount }));
  } catch (error) {
    dispatch(fetchDataFail(error.response.data.message));
  }
};

// Get all Products By admin

export const getAllProductsAdmin = () => async(dispatch)=>{
  try {
    dispatch(adminProductRequest());
    
    const {data} = await axios.get ("/api/v1/admin/products");
    dispatch(adminProductSuccess({adminProducts: data.adminProducts}));
    console.log(data.adminProducts)
  } catch (error) {
    dispatch(adminProductFail(error.response.data.message));
  }
};

// Delete Produt(Admin)

export const deleteProduct = (id) => async(dispatch) =>{
  try {
    dispatch(deleteProductRequest());
   
    const {data} = await axios.delete(`/api/v1/admin/product/${id}`)
    dispatch(deleteProductSuccess(data.success))
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
    dispatch(deleteProductFail(errorMessage))
  }
  };

// Get Product Details

export const fetchProductDetails = (id) => async (dispatch) => {
  try {
    dispatch(fetchDetailsRequest());
    const { data } = await axios.get(`/api/v1/product/${id}`);
    dispatch(fetchDetailsSuccess({ product: data.product }));
  } catch (error) {
    dispatch(fetchDetailsFail(error.response.data.message));
  }
};


// Creating New Review

export const newReview = (reviewData) => async(dispatch) =>{
try {
  dispatch(newReviewRequest());
  const config ={
    headers:{
      "Content-Type":"application/json"
    },
  };
  const {data} = await axios.put("/api/v1/product/review", reviewData, config)
  dispatch(newReviewSuccess(data.success))
} catch (error) {
  dispatch(newReviewFail(error.response.data.message))
}
};

// Create Product (Admin)

export const newProduct = (productData) => async(dispatch)=>{
  try {
    dispatch(newProductRequest())
    const config = {
      headers :{
        "Content-Type":"appliation/json",
        // "token":"token"
      },
    };
    const {data} = await axios.post("/api/v1/admin/product/new", productData, config)
    dispatch(newProductsSuccess(data))
    console.log(data)
  } catch (error) {
    dispatch(newProductFail(error.response.data.message))
  }
};


// Update Product (Admin)

export const updateProduct = (id, productData) => async(dispatch)=>{
  try {
    dispatch(updateProductRequest())
    const config = {
      headers :{
        "Content-Type":"appliation/json",
      },
    };
    const {data} = await axios.put(`/api/v1/admin/product/${id}`, productData, config)
    dispatch(updateProductSuccess(data))
    console.log("updatedDataApi ------> ", data)
  } catch (error) {
    dispatch(updateProductFail(error.response.data.message))
  }
};

// ?id=${id}
// Get all Reviews By admin

export const getAllReviews = (id) => async(dispatch)=>{
  console.log("workin1")
  try {
    dispatch(allReviewsRequest());
    console.log("working2")
    const {data} = await axios.get (`/api/v1/reviews?id=${id}`);
    console.log("working3", data)
    dispatch(allReviewsSuccess( data.reviews ));
    console.log("reviews",data.reviews)
  } catch (error) {
    dispatch(allReviewsFail(error?.response?.data?.message || "An unexpected error occurred."));
  }
};

// Delteing Review (Admin)

export const deleteReview = (reviewId, productId) => async(dispatch) =>{
  try {
    dispatch(deleteReviewsRequest());
   const url = `/api/v1/reviews?id=${reviewId}&productId=${productId}`
   console.log(url)
    const {data} = await axios.delete(`/api/v1/reviews?id=${reviewId}&productId=${productId}`)
    console.log("workin",data)
    dispatch(deleteReviewsSuccess(data.success))
  } catch (error) {
    const errorMessage = error.response?.data?.message || "An unexpected error occurred.";
    dispatch(deleteReviewsFail(errorMessage))
  }
  };


// ClearErrors

export const ClearErrors = () => async (dispatch) => {
  dispatch(ClearError());
};
