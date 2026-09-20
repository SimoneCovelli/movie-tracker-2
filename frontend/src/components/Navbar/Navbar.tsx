import { NavLink } from "react-router-dom";
import "./NavBar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <NavLink to={"/"} end className="brand">
          Movie Tracker
        </NavLink>
        <div className="nav-links">
          <NavLink to={"/"} className="nav-link">
            Home
          </NavLink>
          <NavLink to={"/catalog"} className="nav-link">
            Movie Catalog
          </NavLink>
          <NavLink to={"/myLibrary"} className="nav-link">
            My Movie Library
          </NavLink>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
