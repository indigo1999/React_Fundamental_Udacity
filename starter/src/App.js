import "./App.css";
import { Link , BrowserRouter as Router , Route , Switch } from "react-router-dom"
import MainPage from "./components/MainPage.js"
import SearchPage from "./components/SearchPage.js"

function App() {
  return (
    <Router>
      <nav>
        <Link to="/"></Link>
        <Link to="/search"></Link>
      </nav>
      <Switch>
        <Route exact path="/" component={MainPage} />
        <Route path="/search" component={SearchPage} />
      </Switch>
    </Router>
  )
}

export default App;
