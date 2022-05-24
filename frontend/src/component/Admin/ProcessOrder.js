import React, { Fragment, useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import MetaData from "../layout/MetaData";
import { Link } from "react-router-dom";
import { Typography } from "@material-ui/core";
import { getOrderDetails, clearErrors, updateOrder } from "../../actions/orderAction";
import Loader from "../layout/Loader/Loader";
import { useAlert } from "react-alert";
import SideBar from "./Sidebar"
import AccountTreeIcon from "@material-ui/icons/AccountTree"
import { Button } from "@material-ui/core";
import { UPDATE_ORDERS_RESET } from "../../constants/orderConstants";
import "./processOrder.css"


const ProcessOrder = ({ history, match }) => {

    const { order, error, loading } = useSelector((state) => state.orderDetails);
    const { error: updateError, isUpdated } = useSelector((state) => state.order);
    const dispatch = useDispatch();
    const alert = useAlert();

    const [status, setStatus] = useState("")

    const updateOrderSubmitHandler = (e) => {
        e.preventDefault();
        const myForm = new FormData();
        myForm.set("status", status);
        dispatch(updateOrder(match.params.id, myForm))

    }

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        if (updateError) {
            alert.error(updateError);
            dispatch(clearErrors());
        }
        if (isUpdated) {
            alert.success("Order Updated Successfully");
            history.push("/admin/orders");
            dispatch({ type: UPDATE_ORDERS_RESET });
        }
        dispatch(getOrderDetails(match.params.id));
    }, [dispatch, alert, error, match.params.id, isUpdated, updateError, history]);

    return (
        <Fragment>
            {loading ? (
                <Loader />
            ) : (
                <Fragment>
                    <MetaData title="Order Detail" />
                    <div className="dashboard">
                        <SideBar />
                        <div className="orderDetailsPage">
                            <div className="orderDetailsContainer">
                                <Typography component="h1">
                                    Order #{order && order._id}
                                </Typography>
                                <Typography>Shipping Info</Typography>
                                <div className="orderDetailsContainerBox">
                                    <div>
                                        <p>Name:</p>
                                        <span>{order.user && order.user.name}</span>
                                    </div>
                                    <div>
                                        <p>Phone:</p>
                                        <span>
                                            {order.shippingInfo && order.shippingInfo.phoneNo}
                                        </span>
                                    </div>
                                    <div>
                                        <p>Address:</p>
                                        <span>
                                            {order.shippingInfo &&
                                                `${order.shippingInfo.address}, ${order.shippingInfo.city}, ${order.shippingInfo.state}, ${order.shippingInfo.pinCode}, ${order.shippingInfo.country}`}
                                        </span>
                                    </div>
                                </div>
                                <Typography>Payment</Typography>
                                <div className="orderDetailsContainerBox">
                                    <div>
                                        <p
                                            className={
                                                order.paymentInfo &&
                                                    order.paymentInfo.status === "succeeded"
                                                    ? "greenColor"
                                                    : "redColor"
                                            }
                                        >
                                            {order.paymentInfo &&
                                                order.paymentInfo.status === "succeeded"
                                                ? "PAID"
                                                : "NOT PAID"}
                                        </p>
                                    </div>
                                    <div>
                                        <p>Amount:</p>
                                        <span>{order.totalPrice && order.totalPrice}</span>
                                    </div>
                                </div>
                                <Typography>Order Status</Typography>
                                <div className="orderDetailsContainerBox">
                                    <div>
                                        <p
                                            className={
                                                order.orderStatus && order.orderStatus === "delivered"
                                                    ? "greenColor"
                                                    : "redColor"
                                            }
                                        >
                                            {order.orderStatus && order.orderStatus}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className="orderDetailsCartItems">
                                <Typography>Order Items:</Typography>
                                <div className="orderDetailsCartItemsContainer">
                                    {order.orderItems &&
                                        order.orderItems.map((item) => (
                                            <div key={item.product}>
                                                <img src={item.image} alt="product" />
                                                <Link to={`/product/${item.product}`}>{item.name}</Link>
                                                <span>
                                                    {item.quantity} X ₹{item.price}={""}
                                                    <b>₹{item.price * item.quantity}</b>
                                                </span>
                                            </div>
                                        ))}
                                </div>
                            </div>
                            <div
                                style={{
                                    display: order.orderStatus === "delivered" ? "none" : "block"
                                }}
                            >
                                <form
                                    id="processOrderForm"
                                    className='createProductForm'
                                    encType='multipart/form-data'
                                    onSubmit={updateOrderSubmitHandler}
                                >
                                    <h1>Process Order</h1>
                                    <div>
                                        <AccountTreeIcon />
                                        <select onChange={(e) => setStatus(e.target.value)}>
                                            <option value="">Choose Category</option>
                                            {order.orderStatus === "Processing" && <option value="shipped">Shipped</option>}
                                            {order.orderStatus === "shipped" && <option value="delivered">Delivered</option>}
                                        </select>
                                    </div>
                                    <Button
                                        id='createProductBtn'
                                        type='submit'
                                        disabled={loading ? true : false || status === "" ? true : false}
                                    >
                                        Process
                                    </Button>
                                </form>
                            </div>
                        </div>
                    </div>
                </Fragment>
            )
            }
        </Fragment >

    );
};

export default ProcessOrder