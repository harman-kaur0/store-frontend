import { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom'

const SearchPage = ({products}) => {
    const [searchResults, setSearchResults] = useState([])
    let query = useLocation().search.slice(1).toLocaleLowerCase()

    useEffect(() => {
        const filteredProducts = products.filter(p => p.name.toLowerCase().includes(query) || p.category.name.includes(query))
        setSearchResults(filteredProducts)
    }, [query])

    return (
        <div>

        </div>
    )
}


export default SearchPage;