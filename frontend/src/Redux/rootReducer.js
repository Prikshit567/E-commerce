import { combineReducers, createReducer } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import productreducer from "./slices/productSlice";
import userreducer from "./slices/userSlice"
import profilereducer from "./slices/profileSlice";
import cartreducer from "./slices/cartSlice";
import orderReducer from "./slices/orderSlice"

const rootPersistConfig = {
    key: "root",
    storage,
    keyPrefix: "store-",
    
  };


  const rootReducer = combineReducers({
    products:productreducer,
    user: userreducer,
    profile:profilereducer,
    cart:cartreducer,
    order:orderReducer
    // admin: adminReducer,
  });

  
export { rootPersistConfig, rootReducer };