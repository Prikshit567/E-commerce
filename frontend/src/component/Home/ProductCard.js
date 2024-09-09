import React from 'react'
import {Link} from 'react-router-dom'
import ReactStars from 'react-rating-stars-component'



const   ProductCard = ({product}) => {

  if (!product) {
    console.log("null")
    return product; // or some fallback UI
  }

  // const { _id, images, name, ratings, numOfReviews, price } = product;
  // console.log(product)
  // console.log("RATING",ratings)
    const options={
        edit:false,
        color:"rgba(20,20,20,0.1)",
        activeColor:"tomato",
        size:window.innerWidth<600 ? 20 : 25,
        value:product.ratings || 0,
        isHalf:true
    };
  return (
   <Link className='productCard' to={`/product/${product._id}`}>
   <img src={product.images[0].url} alt={product.name} />
   <p>{product.name}</p>

   <div>
    <ReactStars {...options}/>
    <span>({product.numOfReviews} Reviews)</span>
   </div>
   <span>{`₹${product.price}`}</span>
   </Link>
  )
}

export default ProductCard
