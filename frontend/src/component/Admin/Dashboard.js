import React, { useEffect } from 'react';
import './Dashboard.css'
import Sidebar from './Sidebar'
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';
import { Doughnut, Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend,
  } from 'chart.js';
import { useDispatch, useSelector } from 'react-redux';
import { getAllProductsAdmin } from '../../Redux/slices/productSlice';

  ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    ArcElement,
    Title,
    Tooltip,
    Legend
  );

const Dashboard = () => {

    const {adminProducts} = useSelector((state)=>state.products)
    
    const {adminOrders} = useSelector((state)=>state.order)

    const {users} = useSelector((state)=>state.user)
    let outOfStock = 0 ;

    adminProducts && adminProducts.forEach((item)=>{
        if(item.Stock === 0){
            outOfStock+= 1
        }
    })

    const dispatch = useDispatch()

    useEffect(()=>{
        dispatch(getAllProductsAdmin())
    },[dispatch])

    let totalAmount = 0;
    adminOrders &&
      adminOrders.forEach((item) => {
        totalAmount += item.totalPrice;
      });
  

    const lineState = {
        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
          {
            label: "TOTAL AMOUNT",
            backgroundColor: ["tomato"],
            hoverBackgroundColor: ["rgb(197, 72, 49)"],
            data: [0, totalAmount],
          },
        ],
      };
      const doughnutState = {
        labels: ["Out of Stock", "InStock"],
        datasets: [
          {
            backgroundColor: ["#00A6B4", "#6800B4"],
            hoverBackgroundColor: ["#4B5000", "#35014F"],
            data: [outOfStock, adminProducts.length - outOfStock],
            // data:[2,10]
          },
        ],
      };
    return (
        <div className='dashboard'>

            <Sidebar />
            <div className='dashboardContainer'>
                <Typography component="h1">Dashboard</Typography>
                <div className='dashboardSummary'>
                    <div>
                        <p>
                            Total Amount  <br /> ₹ {totalAmount}
                        </p>
                    </div>
                    <div className='dashboardSummaryBox2' >
                        <Link to='/admin/products' >
                            <p>Products</p>
                            {/* {adminProducts && adminProducts.length}  */}
                            <p>{adminProducts && adminProducts.length}</p>
                        </Link>
                        <Link to='/admin/orders' >
                            <p>Orders</p>
                            <p>{adminOrders && adminOrders.length}</p>
                        </Link>
                        <Link to='/admin/users' >
                            <p>Users</p>
                            <p>{users && users.length}</p>
                        </Link>
                    </div>
                </div>

                <div className="lineChart">
                    <Line data={lineState} />
                </div>
                <div className="doughnutChart">
                    <Doughnut data={doughnutState} />
                </div>
            </div>
        </div>
    )
};

export default Dashboard;
