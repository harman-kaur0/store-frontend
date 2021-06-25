import { useHistory } from "react-router-dom";

const Home = ({ products }) => {
  const history = useHistory();

  const recentlyAdd = products.slice(-6);
  return (
    <div className="" style={{ position: "relative" }}>
      <img
        style={{ height: "100vh", width: "110%", cursor: "default" }}
        src="https://png.pngtree.com/thumb_back/fw800/back_our/20190620/ourmid/pngtree-creative-minimalist-e-commerce-banner-image_168445.jpg"
        alt=""
      ></img>
      <div
        className=""
        style={{
          margin: "0rem 20rem 0rem 20rem",
          position: "relative",
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center",
          }}
        >
          <h1
            style={{
              position: "absolute",
              marginTop: "-650px",
              fontSize: "60px",
            }}
          >
            Now Shipping
          </h1>
          <h4
            style={{
              position: "absolute",
              marginTop: "-570px",
              fontSize: "25px",
            }}
          >
            Summer Toys & Outdoor Furniture
          </h4>
        </div>
        <div
          className=""
          style={{
            display: "flex",
            flexWrap: "wrap",
            position: "absolute",
            marginTop: "-500px",
          }}
        >
          {recentlyAdd.map((p) => (
            <article style={{ backgroundColor: "white" }}>
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
    </div>
  );
};

export default Home;
