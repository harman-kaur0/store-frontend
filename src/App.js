
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Home from './Containers/Home'
import Login from './Components/Login'
import Navigation from './Navigation'


const App = () => {
  return (
    <div>
      <Router>
        <Navigation/>
        <Route exact path='/' render={() => <Home/>}/>
        <Route exact path='/login' render={() => <Login/>}/>
      </Router>
    </div>
  );
}

export default App;
