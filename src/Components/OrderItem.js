import { useHistory } from "react-router-dom";

const OrderItem = ({item, products, patchUserCart}) => {

    const history = useHistory();

    let product = products.find(p => p.id === item.product_id)

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
        <div>
            {
                product ?
                    <div className="cards">
                        <div className="card-image" onClick={() => history.push(`products/item/${product.id}`)}>
                            <img src={product.image}/>
                        </div>
                        <div className="text">
                            <div 
                                onClick={() => history.push(`products/item/${product.id}`)}
                                style={{cursor: "pointer"}}
                            >
                                {product.name}
                            </div>
                            <div>
                                <h4>Price: ${product.price}</h4>
                                <h4>Ordered on {convert(item.ordered_on)}</h4>
                            </div>
                            <button onClick={() => history.push(`/comment/${product.id}`)}>Leave a Review</button>
                            <button onClick={() => patchUserCart(product.id, item.quantity)}>Buy Again</button>
                            <div>
                                {product.comments.map(c => {
                                    return (
                                        <div>
                                        <h2>{c.title}</h2>
                                        <p>{c.text}</p>
                                        <h4>{handleRating(c.rating)}</h4>
                                        <h5>Reviewed on {convert(c.created_at)}</h5>
                                        </div>
                                    )
                                })}
                            </div>
                        </div>
                    </div>
                : null
            }

        </div>
    )
}

export default OrderItem;