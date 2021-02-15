import logo from './logo.svg';
import "bootstrap/dist/css/bootstrap.min.css";
import { Switch, Route, Link } from 'react-router-dom';

import AddTodos from "./components/addTodos";
import TodosList from "./components/todosList";

function App() {
  return (
    <div>
      <nav className="navbar navbar-expand navbar-dark bg-dark">
        <a href="/todos" className="navbar-brand">
          TodosList
        </a>
        <div className="navbar-nav mr-auto">
          <li className="nav-item">
            <Link to={"/todos"} className="nav-link">
              Todos
            </Link>
          </li>
          <li className="nav-item">
            <Link to={"/add"} className="nav-link">
              Add Todos
            </Link>
          </li> 
        </div>
      </nav>

      <div>
        <h2>React Todos</h2>
        <Switch>
          <Route exact path={["/", "/todos"]} component={TodosList}></Route>
          <Route exach path={"add"} component={AddTodos}></Route>
        </Switch>
      </div>
    </div>
  );
}

export default App;
