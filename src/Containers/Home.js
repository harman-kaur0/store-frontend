
import { useHistory } from "react-router-dom";


const Home = ({products}) => {
    const history = useHistory()

    const recentlyAdd = products.slice(-5)
    return (
        <div className="home-page">
            <div className="card-container">
                <h2>Recently Added</h2>
                <div className="home-cards">
                {recentlyAdd.map(p => (
                    <div className="home-card">
                        <img src={p.image} alt={p.name}/>
                        <h4>{p.name.slice(0, 50)}...</h4>
                        <h5>$ {p.price}</h5>
                    </div>
                ))}
                </div>
            </div>
        </div>
            
    )
}

export default Home;