import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import CommentList from "./CommentList";

const Product = ({ products, user, comments, setComments }) => {
  const [product, setProduct] = useState(productLoad);
  const history = useHistory();
  const location = useLocation();
  const itemId = parseInt(location.pathname.split("/item/")[1]);
  const productComments = comments.filter(c => c.product.id === itemId)
  const userProductComment = productComments.find(c => c.user.id === user.id)

  const handleClick = (id) => {
    if (user) {
      history.push(`/comment/${id}`);
    } else {
      alert("Please log in to leave a review");
    }
  };

  useEffect(() => {
    let item = products.find((obj) => obj.id === itemId);
    setProduct(item);
  }, [products, itemId]);

  const deleteComment = (id) => {
    fetch(`http://localhost:3000/api/v1/comments/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt")}`,
      },
    });
    let filterComments = comments.filter((c) => c.id !== id);
    setComments(filterComments);
  };

  return product ? (
    <div className="product-page">
      <div className="product-info">
        <img src={product.image} alt={product.name} />
        <div className="product-description">
          <h1>{product.name}</h1>
          <h2>$ {product.price}</h2>
          <button>Add to Cart</button>
          <h4>Product Details: {product.description}</h4>
        </div>
      </div>

      <div className="review-container">      
          <div className="review-button">
            <button onClick={() => handleClick(product.id)}>Leave a Review</button>
          </div>
          <div className="reviews"> 
            <h1>Customer Reviews</h1>
            <CommentList productComments={productComments} deleteComment={deleteComment} userProductComment={userProductComment}/>
          </div>
      </div>

         
    </div>
  ) : (
    <h1>This page does not exist</h1>
  );
};

export default Product;

const productLoad = {
  name: "...is loading",
  image: "...is loading",
  price: "...is loading",
  description: "...is loading",
};
