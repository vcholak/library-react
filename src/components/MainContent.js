import { Switch, Route } from "react-router-dom";
import routes from '../routs';

const Content = () => (
  <div className="col-sm-10">
    <Switch>
      {routes.map((route, index) => (
        <Route
          key={index}
          path={route.path}
          exact={route.exact}
          children={<route.component />}
        />
      ))}
    </Switch>
  </div>
);

export default Content;
