import { useHistory } from "react-router-dom";

const OrderItem = ({item, products, patchUserCart, user, comments}) => {

    const history = useHistory();

    let product = products.find(p => p.id === item.product_id)

    const productComment =  product && user ? comments.filter(c => c.product.id === product.id).find(c => c.user.id === user.id)  : null

    const convert = str => {
        var date = new Date(str)
        return date.toLocaleString([], {month: '2-digit', day: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit'})
    }


  const handleRating = (comment) => {
    switch (comment) {
      case 1:
        return "⭐";
      case 2:
        return "⭐⭐";
      case 3:
        return "⭐⭐⭐";
      case 4:
        return "⭐⭐⭐⭐";
      case 5:
        return "⭐⭐⭐⭐⭐";
      default:
        return;
    }
  }

    return (
        <div className="order-content">
            {
                product ?
                    <div className="order-item">
                        <div className="item-image" onClick={() => history.push(`products/item/${product.id}`)}>
                            <img src={product.image}/>
                        </div>
                        <div className="item-name">
                            <div style={{height: "40%", width: "100%"}}>
                                <div 
                                    onClick={() => history.push(`products/item/${product.id}`)}
                                    style={{cursor: "pointer", overflow: "hidden", whiteSpace: "nowrap"}}
                                >
                                    {product.name}
                                </div>
                                <div style={{display: "flex", justifyContent: "space-around", marginTop: "10px"}}> 
                                    <h4 style={{fontWeight: "bold", fontSize: "clamp(8px, 1vw, 15px)"}}>Price: ${product.price}</h4>
                                    <h4 style={{fontWeight: "bold", fontSize: "clamp(8px, 1vw, 15px)"}}>Ordered on {convert(item.ordered_on)}</h4>
                                </div>
                                <div>
                                    <button onClick={() => history.push(`/comment/${product.id}`)} className="edit-button">{productComment ? "Edit your Review" : "Leave a Review"}</button>
                                    <button onClick={() => patchUserCart(product.id, item.quantity)} className="buy-again-button">Buy Again</button>
                                </div>
                            </div>
                            {
                                productComment ? 
                                <div className="item-review">  
                                    <div className="item-review-content">
                                        <div style={{display: "flex", justifyContent: "space-evenly", alignItems: "center"}}>
                                            <h2>{productComment.title}</h2>
                                            <h4>{handleRating(productComment.rating)}</h4>
                                        </div>
                                        <div className="item-review-description"><p>{productComment.text}</p></div>
                                        <h5>Reviewed on {convert(productComment.created_at)}</h5>
                                    </div>       
                                </div>
                            : null
                        }
                        </div>
                    </div>
                : null
            }

        </div>
    )
}

export default OrderItem;