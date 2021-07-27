import './App.css';
import Home from './components/Home'
import Login from './components/Login'
import SignUp from './components/SignUp'
import DashBoard from './components/DashBoard/DashBoard'

import { BrowserRouter as Router, Switch, Route, Link} from 'react-router-dom'

function App() {
  return (
    <>
      <Router>
        <div>
          <nav className="nav navbar-nav">
            <ul className="nav nav-pills nav-fill">
              <li className="nav-item">
                <Link to="/">Home</Link>
              </li>
              <li className="nav-item">
                <Link to="/login">DashBoard</Link>
              </li>
              <li className="nav-item">
                <Link to="/signup">Sign up</Link>
              </li>
              <li className="nav-item">
                <Link to="/dashnoard">login</Link>
              </li>
            </ul>
          </nav>
        </div>
        <Switch >
          <Route path="/" exact> <Home /></Route>
          <Route path="/login" exact> <Login /></Route>
          <Route path="/signup" exact> <SignUp /></Route>
          <Route path="/dashboard" exact> <DashBoard /></Route>
        </Switch>
      </Router>
    </>
  );
}

export default App;
