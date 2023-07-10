import "./header.scss";
import { BiLogIn } from "react-icons/bi";
import { FaUserCircle } from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
const activeLink = ({ isActive }) => (isActive ? "active" : "");

const Header = () => {
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/");
  };

  const logoutUser = async () => {
    navigate("/login");
  };

  return (
    <header className="header">
      <nav>
        <div className="logo" onClick={goHome}>
          <BiLogIn size={35} />
          <span>AUTH:Z</span>
        </div>

        <ul className="home-links">
          <li className="--flex-center">
            <FaUserCircle size={20} />
            <p className="--color-white">HI Elkhan</p>
          </li>
          <li>
            <button className="--btn --btn-primary">
              <Link to="/login">Login</Link>
            </button>
          </li>
          <li>
            <NavLink to="/profile" className={activeLink}>
              Profile
            </NavLink>
          </li>
          <li>
            <button onClick={logoutUser} className="--btn --btn-secondary">
              Logout
            </button>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
