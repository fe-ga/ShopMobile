import "./App.css";
import "@coreui/coreui/dist/css/coreui.min.css";
import "bootstrap/dist/css/bootstrap.min.css";

import Login from "./views/pages/login/Login";
import "./css/style.scss";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import Main from "./components/layouts/Main";

function App() {

  return (
    <Router>
      <Switch>
        <Route path="/login">
          <Login />
        </Route>
        <Route path="/">
          <Main />
        </Route>
      </Switch>
    </Router>
  );
}

export default App;
