// eslint-disable-next-line no-unused-vars
import { Route, Redirect } from 'react-router-dom';

const ProtectedRoute = ({ component: Component, ...props }) => (
    <Route>
      {() => (props.loggedIn ? <Component {...props} /> : <Redirect to="/sign-in" />)
      }
    </Route>
);

export default ProtectedRoute;
