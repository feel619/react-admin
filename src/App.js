import { Router, Route, Switch, Redirect } from "react-router-dom";
import AdminLayout from "./layouts/Admin";
import AuthLayout from "./layouts/Auth.js";
import { history } from './redux/_helpers';

function App() {
    const getBasename = path => path.substr(0, path.lastIndexOf('/'));
    console.log(getBasename(window.location.pathname))
    return (
    <Router history={history}  >
      <Route path={`/admin`} render={(props) => <AdminLayout {...props} /> } />
      <Route path={`/auth`} render={(props) => <AuthLayout {...props} />} />
        <Switch>
          {
            localStorage.getItem('user')
            ? <> <Redirect from="*" to={`/admin/index`} /></>
            : <> <Redirect from="*" to={`/auth/login`} /></>
          }
        </Switch>
    </Router>
  );
}
export default App;
