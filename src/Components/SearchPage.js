import { useEffect, useState } from "react";
import { useLocation, useHistory } from 'react-router-dom'

const SearchPage = ({products, handleFilterSort}) => {
    const [searchResults, setSearchResults] = useState([])
    const history = useHistory();
    let query = useLocation().search.slice(1).toLowerCase().replaceAll("%", " " )

    useEffect(() => {
        const filteredProducts = products.filter(p => p.name.toLowerCase().includes(query) || p.category.name.includes(query))
        setSearchResults(filteredProducts)
    }, [query])

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


export default SearchPage;