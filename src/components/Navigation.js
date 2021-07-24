import { Link } from "react-router-dom";
import routes from '../routs';

const Navigation = () => {
  return (
  <div className="col-sm-2">
    <ul className="sidebar-nav">
      {routes.map((route, ind) => (
        <li key={ ind }>
          <Link to={route.path}>{route.text}</Link>
        </li>
      ))}
    </ul>
    <style jsx>{`
      .sidebar-nav {
        margin-top: 20px;
        padding: 0;
        list-style: none;
      }
    `}</style>
  </div>
);
}

export default Navigation;
