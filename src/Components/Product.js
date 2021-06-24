import { useEffect, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import CommentList from "./CommentList";

const Product = ({ products, user, comments, setComments }) => {
  const [product, setProduct] = useState(productLoad);
  const history = useHistory();
  const location = useLocation();
  const itemId = parseInt(location.pathname.split("/item/")[1]);
  const productComments = comments.filter(c => c.product_id === itemId)

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
  }, [products]);

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
    <div>
      <h1>{product.name}</h1>
      <img className="product-image" src={product.image} alt={product.name} />
      <h4>$ {product.price}</h4>
      <h6>Product Details: {product.description}</h6>

      {comments ? (
        comments.find(
          (c) => c.user_id === user.id && c.product_id === itemId
        ) ? (
          <>
            <button onClick={() => history.push(`/comment/${product.id}`)}>
              Edit Review
            </button>
            <button onClick={() => deleteComment(product.id)}>
              Delete review
            </button>
          </>
        ) : (
          <button onClick={() => handleClick(product.id)}>
            Leave a Review
          </button>
        )
      ) : null}
      <h1>Customer Reviews</h1>
      <CommentList comments={productComments} />
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
