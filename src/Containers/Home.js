import { useHistory} from "react-router-dom";

const Home = ({ products }) => {
  const history = useHistory();
 
  const recentlyAdd = products.slice(-8);
  return (
    <div className="home-container">
      <div>
        <h1
          style={{
            fontSize: "60px",
          }}
        >
          Now Shipping
        </h1>
        <h4
          style={{
            fontSize: "25px",
          }}
        >
          Summer Toys & Outdoor Furniture
        </h4>
      </div>
      <div className="home-content">
        {recentlyAdd.map((p) => (
          <article style={{ backgroundColor: "white" }}  onClick={() => history.replace(`/products/item/${p.id}`)}>
            <img src={p.image} alt={p.name} />
            <div>
              <h4>{p.name.slice(0, 50)}...</h4>
            </div>
            <div>
              <div>
                <h5>$ {p.price}</h5>
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};

export default Home;
