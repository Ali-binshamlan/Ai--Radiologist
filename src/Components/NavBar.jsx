import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { useAuth } from "../context/AuthContext";
import "../assets/Styling/NavBar.css";
import Logo from "../Components/Logo";
import Swal from "sweetalert2";
import styled from "styled-components";


const NavBar = () => {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  const handleLogoutClick = () => {
    Swal.fire({
      title: "Are you sure?",
      text: "You will be logged out from your account.",
      icon: "question",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Logout",
      cancelButtonText: "Cancel",
      reverseButtons: true,
      backdrop: true,
    }).then((result) => {
      if (result.isConfirmed) {
        logout();
        navigate("/AI_Radiologist/Login");
        Swal.fire({
          title: "Logged out!",
          text: "You have been logged out successfully.",
          icon: "success",
          timer: 2000,
          showConfirmButton: false,
        });
      }
    });
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!dropdownRef.current?.contains(event.target)) setDropdownOpen(false);
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const navItems = [
    { name: "Home", path: "/AI_Radiologist/Home" },
    { name: "Our Vision", path: "/AI_Radiologist/Home" },
    { name: "Upload", path: "/AI_Radiologist/Upload" },
    { name: "How Use It", path: "/AI_Radiologist/Home" },
    { name: "About", path: "/AI_Radiologist/Home" },
  ];

  return (
    <header className="header">
      <nav className="nav container">
        <Link to="/AI_Radiologist" className="nav__logo p-0">
          <Logo />
        </Link>

        <div className={`nav__menu mt-1${menuOpen ? "show-menu" : ""}`}>
          <ul className="nav__list">
            {navItems.map((item, index) => (
              <li key={index}>
                <Link
                  to={item.path}
                  className="nav__link"
                  onClick={() => setMenuOpen(false)}
                >
                  {item.name}
                </Link>
              </li>
            ))}
          </ul>
          <div className="nav__close" onClick={() => setMenuOpen(false)}>
            <i className="bx bx-x"></i>
          </div>
        </div>

        <div className="nav__actions ">
          {user ? (
            <div className="dropdown" ref={dropdownRef}>
              <div
                className="dropdown__profile"
                onClick={() => setDropdownOpen((prev) => !prev)}
              >
                <div className="dropdown__image">
                  <img src={user.profile_image || "/default-avatar.png"} />
                </div>
                <div className="dropdown__names">
                  <h3>
                    {user.first_name} {user.last_name}
                  </h3>
                </div>
              </div>

              <ul
                className={`dropdown__list ${
                  dropdownOpen ? "show-dropdown" : ""
                }`}
              >
                <div className="d-flex align-items-center mb-2">
                  <img
                    width={"40px"}
                    src={user.profile_image || "/default-avatar.png"}
                  />
                  <h6 className="mx-2" style={{ fontSize: "12px" }}>
                    {user.first_name} {user.last_name}
                  </h6>
                </div>
                <li>
                  <Link
                    className="dropdown__link"
                    to="/AI_Radiologist/profile_User"
                  >
                    <i className="bx bx-user me-2"></i> Profile
                  </Link>
                </li>
                <li>
                  <Link
                    className="dropdown__link"
                    to="/AI_Radiologist/Settings_User"
                  >
                    <i className="bx bx-cog me-2"></i> Settings
                  </Link>
                </li>
                {user.user_type === "admin" && (
                  <li>
                    <Link
                      className="dropdown__link"
                      to="/AI_Radiologist/AdminPanel"
                    >
                      <i className="bx bx-grid-alt me-2"></i> Dashboard
                    </Link>
                  </li>
                )}
                <li>
                  <button
                    style={{
                      background: "none",
                      border: "none",
                      cursor: "pointer",
                    }}
                    className="dropdown__link text-danger"
                    onClick={handleLogoutClick}
                  >
                    <i className="bx bx-log-out me-2 text-danger"></i> Logout
                  </button>
                </li>
              </ul>
            </div>
          ) : (
            <StyledWrapper>
              <button
                onClick={() => navigate("/AI_Radiologist/Registration")}
                className="button"
              >
                <span className="button_lg">
                  <span className="button_sl" />
                  <span className="button_text">Registration</span>
                </span>
              </button>
            </StyledWrapper>
          )}

          <div className="nav__toggle" onClick={() => setMenuOpen(true)}>
            <i className="bx bx-menu"></i>
          </div>
        </div>
      </nav>
    </header>
  );
};
const StyledWrapper = styled.div`
  .button {
    -moz-appearance: none;
    -webkit-appearance: none;
    appearance: none;
    border: none;
    background: none;
    color: #0f1923;
    cursor: pointer;
    position: relative;
    padding: 6px;
    margin-bottom: 12px;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 14px;
    transition: all 0.15s ease;
    border-radius: 20px;
  }

  .button::before,
  .button::after {
    content: "";
    display: block;
    position: absolute;
    right: 0;
    left: 0;
    height: calc(50% - 5px);
    border: 1px solid #7d8082;
    transition: all 0.15s ease;
    border-radius: 14px;
  }

  .button::before {
    top: 0;
    border-bottom-width: 0;
  }

  .button::after {
    bottom: 0;
    border-top-width: 0;
  }

  .button:active,
  .button:focus {
    outline: none;
  }

  .button:active::before,
  .button:active::after {
    right: 3px;
    left: 3px;
  }

  .button:active::before {
    top: 3px;
  }

  .button:active::after {
    bottom: 3px;
  }

  .button_lg {
    border-radius: 14px;
    position: relative;
    display: block;
    padding: 10px 20px;
    color: #fff;
    background-color: #0f1923;
    overflow: hidden;
    box-shadow: inset 0px 0px 0px 1px transparent;
  }

  .button_lg::before {
    content: "";
    display: block;
    position: absolute;
    top: 0;
    left: 0;
    width: 2px;
    height: 2px;
    background-color: #0f1923;
    border-radius: 6px;
  }

  .button_lg::after {
    content: "";
    display: block;
    position: absolute;
    right: 0;
    bottom: 0;
    width: 4px;
    height: 4px;
    background-color: #0f1923;
    transition: all 0.2s ease;
    border-radius: 6px;
  }

  .button_sl {
    border-radius: 14px;
    display: block;
    position: absolute;
    top: 0;
    bottom: -1px;
    left: -8px;
    width: 0;
    background-color: #ff4655;
    transform: skew(-15deg);
    transition: all 0.2s ease;
  }

  .button_text {
    position: relative;
  }

  .button:hover {
    color: #0f1923;
  }

  .button:hover .button_sl {
    width: calc(100% + 15px);
  }

  .button:hover .button_lg::after {
    background-color: #fff;
  }
`;

export default NavBar;
