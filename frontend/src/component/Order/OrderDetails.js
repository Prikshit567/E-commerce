import React, { Fragment, useEffect } from 'react';
import './OrderDetails.css';
import Loader from '../Loader/Loader';
import { Typography } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getOrderDetails } from '../../Redux/slices/orderSlice';


const OrderDetails = () => {
  const { order, loading } = useSelector((state) => state.order);
  const { user } = useSelector((state) => state.user);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(()=>{
    dispatch(getOrderDetails(id));
  }, [dispatch, id]);

  return (
    <Fragment>
      {loading ? (
        <Loader />
      ) : (
        <Fragment>
          <div className="orderDetailsPage">
            <div className="orderDetailsContainer">
              <Typography component="h1">
                Order {order._id}
              </Typography>
              <Typography>Shipping Info</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p>Name:</p>
                  <span>{user.name}</span>
                </div>
                <div>
                  <p>Phone Number:</p>
                  <span>{order.shippingInfo.phoneNumber}</span>
                </div>
                <div>
                  <p>Address:</p>
                  <span>
                    {order.shippingInfo &&
                      `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.country}, ${order.shippingInfo.pinCode}`}
                  </span>
                </div>
              </div>
              <Typography>Payment</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.paymentInfo.status === 'succeeded'
                        ? 'greenColor'
                        : 'redColor'
                    }
                  >
                    {order.paymentInfo.status === 'succeeded'
                      ? 'PAID'
                      : 'NOT PAID'}
                  </p>
                </div>
                <div>
                  <p>Amount:</p>
                  <span>{order.totalPrice}</span>
                </div>
              </div>
              <Typography>Order Status</Typography>
              <div className="orderDetailsContainerBox">
                <div>
                  <p
                    className={
                      order.orderStatus === 'Delivered'
                        ? 'greenColor'
                        : 'redColor'
                    }
                  >
                    {order.orderStatus}
                  </p>
                </div>
              </div>
            </div>
            <div className="orderDetailsCartItems">
              <Typography>Order Items:</Typography>
              <div className="orderDetailsCartItemsContainer">
                {order.orderItems.map((item) => (
                  <div key={item.product}>
                    <img src={item.image} alt="Product" />
                    <Link to={`/product/${item.product}`}>{item.name}</Link>
                    <span>
                      {item.quantity} X ₹{item.price} = <b>₹{item.price * item.quantity}</b>
                    </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Fragment>
      )}
    </Fragment>
  );
};

export default OrderDetails;



// If wrong order is crated using backend then we willl try chaining in our component to avoid errors of order coming as undefined
// import React, { Fragment, useEffect } from 'react';
// import './OrderDetails.css';
// import Loader from '../Loader/Loader';
// import { Typography } from '@mui/material';
// import { Link, useParams } from 'react-router-dom';
// import { useDispatch, useSelector } from 'react-redux';
// import { getOrderDetails, clearErrors } from '../../Redux/slices/orderSlice';
// import { useAlert } from 'react-alert';

// const OrderDetails = () => {
//   const { order, loading, error } = useSelector((state) => state.order);
//   const { user } = useSelector((state) => state.user);
//   const { id } = useParams();
//   const dispatch = useDispatch();
//   const alert = useAlert();

//   useEffect(() => {
//     if (error) {
//       alert.error(error);
//       dispatch(clearErrors());
//     }

//     dispatch(getOrderDetails(id));
//   }, [dispatch, id, error, alert]);

//   return (
//     <Fragment>
//       {loading ? (
//         <Loader />
//       ) : (
//         <Fragment>
//           <div className="orderDetailsPage">
//             <div className="orderDetailsContainer">
//               <Typography component="h1">
//                 Order {order?._id}
//               </Typography>
//               <Typography>Shipping Info</Typography>
//               <div className="orderDetailsContainerBox">
//                 <div>
//                   <p>Name:</p>
//                   <span>{user?.name}</span>
//                 </div>
//                 <div>
//                   <p>Phone Number:</p>
//                   <span>{order?.shippingInfo?.phoneNumber}</span>
//                 </div>
//                 <div>
//                   <p>Address:</p>
//                   <span>
//                     {order?.shippingInfo &&
//                       `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.country}, ${order.shippingInfo.pinCode}`}
//                   </span>
//                 </div>
//               </div>
//               <Typography>Payment</Typography>
//               <div className="orderDetailsContainerBox">
//                 <div>
//                   <p
//                     className={
//                       order?.paymentInfo?.status === 'success'
//                         ? 'greenColor'
//                         : 'redColor'
//                     }
//                   >
//                     {order?.paymentInfo?.status === 'success'
//                       ? 'PAID'
//                       : 'NOT PAID'}
//                   </p>
//                 </div>
//                 <div>
//                   <p>Amount:</p>
//                   <span>{order?.totalPrice}</span>
//                 </div>
//               </div>
//               <Typography>Order Status</Typography>
//               <div className="orderDetailsContainerBox">
//                 <div>
//                   <p
//                     className={
//                       order?.orderStatus === 'Delivered'
//                         ? 'greenColor'
//                         : 'redColor'
//                     }
//                   >
//                     {order?.orderStatus}
//                   </p>
//                 </div>
//               </div>
//             </div>
//             <div className="orderDetailsCartItems">
//               <Typography>Order Items:</Typography>
//               <div className="orderDetailsCartItemsContainer">
//                 {order?.orderItems?.map((item) => (
//                   <div key={item.product}>
//                     <img src={item.image} alt="Product" />
//                     <Link to={`/product/${item.product}`}>{item.name}</Link>
//                     <span>
//                       {item.quantity} X ₹{item.price} = <b>₹{item.price * item.quantity}</b>
//                     </span>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </Fragment>
//       )}
//     </Fragment>
//   );
// };

// export default OrderDetails;
