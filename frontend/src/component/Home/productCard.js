import React from 'react'
import { Link } from 'react-router-dom'
import { Rating } from '@material-ui/lab'


const productCard = ({ product }) => {
    const options = {
        value: product.ratings,
        isHalf: true,
        readOnly: true
    }
    return (
        <Link className='productCard' to={`/product/${product._id}`}>
            <img src={product.images[0].url} alt={product.name} />
            <p>{product.name}</p>
            <div>
                <Rating {...options} />{" "}
                <span className='productCardSpan'>({product.numOfReviews} Reviews)</span>
            </div>
            <span>{`₹ ${product.price}`}</span>
        </Link>
    )
}

export default productCard
