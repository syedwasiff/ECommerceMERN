import React, { useEffect } from 'react';
import Sidebar from "./Sidebar";
import "./dashboard.css";
import { Typography } from "@material-ui/core";
import { Link } from "react-router-dom";
import { Line } from "react-chartjs-2"
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { useSelector, useDispatch } from 'react-redux';
import { getAdminProduct } from "../../actions/productAction"
import { getAllOrders } from '../../actions/orderAction';
import { getAllUsers } from '../../actions/userAction';

ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);


const Dashboard = () => {
    const dispatch = useDispatch();

    const { products } = useSelector((state) => state.products);
    const { orders } = useSelector((state) => state.allOrders);
    const { users } = useSelector((state) => state.allUsers);
    useEffect(() => {

        dispatch(getAdminProduct());
        dispatch(getAllOrders());
        dispatch(getAllUsers());

    }, [dispatch])

    let outOfStock = 0;

    products && products.forEach((item) => {
        if (item.Stock === 0) {
            outOfStock += 1;
        }

    });

    let totalAmount = 0;
    orders &&
        orders.forEach((item) => {
            totalAmount += item.totalPrice;
        });

    const lineState = {

        labels: ["Initial Amount", "Amount Earned"],
        datasets: [
            {
                label: "TOTAL AMOUNT",
                backgroundColor: ["#531c92"],
                hoverBackgroundColor: ["#29084e"],
                data: [0, totalAmount],
            },
        ],
    };
    const AmountOptions = {
        plugins: {
            title: {
                display: true,
                text: 'Amount Chart',
                color: 'green',
                font: {
                    size: 34
                },
                padding: {
                    top: 30,
                    bottom: 30
                },
                responsive: true,
                animation: {
                    animateScale: true,
                }
            }
        }

    }

    const doughnutState = {
        labels: ["Out Of Stock", "In Stock"],
        datasets: [
            {
                label: "STOCK CHART",
                backgroundColor: ["#00A6B4", "#6800B4"],
                hoverBackgroundColor: ["#4B5000", "#35014F"],
                data: [outOfStock, products.length - outOfStock]
            }
        ]
    }
    const StockOptions = {
        plugins: {
            title: {
                display: true,
                text: 'Stock Chart',
                color: 'blue',
                font: {
                    size: 34
                },
                padding: {
                    top: 30,
                    bottom: 30
                },
                responsive: true,
                animation: {
                    animateScale: true,
                }
            }
        }

    }

    return (
        <div className='dashboard'>
            <Sidebar />
            <div className='dashboardContainer'>
                <Typography component="h1" >Dashboard</Typography>
                <div className='dashboardSummary'>
                    <div>
                        <p>
                            Total Amount <br /> ₹ {totalAmount}
                        </p>
                    </div>
                    <div className='dashboardSummaryBox2'>
                        <Link to="/admin/products">
                            <p>Product</p>
                            <p>{products && products.length}</p>
                        </Link>
                        <Link to="/admin/orders">
                            <p>Orders</p>
                            <p>{orders && orders.length}</p>
                        </Link>
                        <Link to="/admin/users">
                            <p>Users</p>
                            <p>{users && users.length}</p>
                        </Link>
                    </div>
                </div>
                <div className='lineChart'>
                    <Line data={lineState} options={AmountOptions} />
                </div>
                <div className='lineChart'>
                    <Line data={doughnutState} options={StockOptions} />
                </div>
            </div>
        </div>
    )
}

export default Dashboard