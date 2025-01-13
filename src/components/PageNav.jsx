import { NavLink } from "react-router-dom";

function PageNav() {
  return (
    <div>
      <ul>
        <li>
          <NavLink to="/">Home</NavLink>
        </li>
        <li>
          <NavLink to="/product">Product</NavLink>
        </li>
        <li>
          <NavLink to="/price">Price</NavLink>
        </li>
      </ul>
    </div>
  );
}

export default PageNav;
