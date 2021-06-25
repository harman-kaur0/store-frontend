import { useEffect, useState } from "react";
import { useLocation, useHistory } from "react-router-dom";

<<<<<<< HEAD
const SearchPage = ({products, handleFilterSort}) => {
    const [searchResults, setSearchResults] = useState([])
    const history = useHistory();
    let query = useLocation().search.slice(1).toLowerCase().replaceAll("%", " " )
=======
const SearchPage = ({ products }) => {
  const [searchResults, setSearchResults] = useState([]);
  const history = useHistory();
  let query = useLocation().search.slice(1).toLowerCase().replaceAll("%", " ");
>>>>>>> origin/main

  useEffect(() => {
    const filteredProducts = products.filter(
      (p) =>
        p.name.toLowerCase().includes(query) || p.category.name.includes(query)
    );
    setSearchResults(filteredProducts);
  }, [query]);

<<<<<<< HEAD
    return searchResults ?(
        <div>
            <label for="products">Sort by:</label>
            <select id="products" name="products" onChange={e => handleFilterSort(e)}>
                <option value="most">Most Reviewed</option>
                <option value="newest">Newest Arrivals</option>
            </select>
            {searchResults.map(p => 
                (
                <div className="products" onClick= {() => history.replace(`/products/item/${p.id}`)} key={p.id}>
                    <img src={p.image} alt={p.name} className="productsImg" />
                    <h6>{p.name}</h6>
                    <h4>$ {p.price}</h4>
               </div>
                )
             )}
        </div>
    ): <h1>No products found...</h1>
}
=======
  return searchResults ? (
    <div style={{ margin: "20rem" }}>
      <div style={{ display: "flex", justifyContent: "center" }} >
        <h1>Header</h1>
      </div>
      <div id="ProductList" style={{ display: "flex", flexWrap: "wrap" }}>
        {searchResults.map((p) => (
          <article
            onClick={() => history.replace(`/products/item/${p.id}`)}
            key={p.id}
          >
            <img src={p.image} alt={p.name} />
            <div className="card-wrapper">
              <div className="header-wrapper">
                <div className="h1-wrapper">
                  <h4
                    style={{
                      fontSize: ".3rem !important",
                      marginTop: "0",
                      marginBottom: "0",
                    }}
                  >
                    {p.name}
                  </h4>
                </div>
                <div className="h2-wrapper">
                  <h4
                    style={{
                      fontSize: ".5rem !important",
                      marginTop: "0",
                      marginBottom: "0",
                    }}
                  >
                    $ {p.price}
                  </h4>
                </div>
              </div>
              <p className="copy">Click to Learn More</p>
            </div>
          </article>
        ))}
      </div>
    </div>
  ) : (
    <h1>No products found...</h1>
  );
};
>>>>>>> origin/main

export default SearchPage;
