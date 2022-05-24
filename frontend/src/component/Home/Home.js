import React, { Fragment, useEffect } from 'react'
import { CgMouse } from 'react-icons/cg';
import "./Home.css";
import ProductCard from "./productCard.js"
import MetaData from "../layout/MetaData"
import { clearErrors, getProduct } from "../../actions/productAction"
import { useSelector, useDispatch } from "react-redux"
import Loader from "../layout/Loader/Loader"
import { useAlert } from "react-alert";


const Home = () => {
    const alert = useAlert();
    const dispatch = useDispatch();
    const { loading, error, products } = useSelector(state => state.products)

    useEffect(() => {
        if (error) {
            alert.error(error);
            dispatch(clearErrors());
        }
        dispatch(getProduct())
    }, [dispatch, error, alert])

    return (
        <Fragment>
            {loading ? (<Loader />) : <Fragment>
                <MetaData title="Shopify Hub" />
                <div className="banner">
                    <p>Welcome to ShopifyHub</p>
                    <h1>Explore Amazing Products Here</h1>
                    <a href="#container">
                        <button>
                            scroll<CgMouse />
                        </button>
                    </a>
                </div>
                <h2 className="homeHeading">Featured Product</h2>
                <div className="container" id="container">
                    {products && products.map(product => (
                        <ProductCard product={product} />
                    ))}
                </div>
            </Fragment>}
        </Fragment>

    );
}

export default Home
