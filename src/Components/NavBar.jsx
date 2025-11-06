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
    { name: "About", path: "/AI_Radiologist/Home" },
    { name: "Our Vision", path: "/AI_Radiologist/Home" },
    { name: "Upload", path: "/AI_Radiologist/Upload" },
    { name: "How Use It", path: "/AI_Radiologist/Home" },
  ];

  return (
    <header className="header">
      <nav className="nav container">
        <Link to="/AI_Radiologist" className="nav__logo p-0">
          <Logo />
        </Link>

        <div className={`nav__menu mt-1 ${menuOpen ? "show-menu" : ""}`}>
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

            {/* زر Register يظهر فقط داخل المينيو */}
            <li className="nav__item-register">
              <Link
                to="/AI_Radiologist/Registration"
                className="nav__link_r" // أو أي كلاس زر عندك
              >
                Register
              </Link>
            </li>
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
              <div className="btn-wrapper">
                <button
                  className="btn-r"
                  onClick={() => navigate("/AI_Radiologist/Registration")}
                >
                  <svg
                    className="btn-svg"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M9.813 15.904 9 18.75l-.813-2.846a4.5 4.5 0 0 0-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 0 0 3.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 0 0 3.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 0 0-3.09 3.09ZM18.259 8.715 18 9.75l-.259-1.035a3.375 3.375 0 0 0-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 0 0 2.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 0 0 2.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 0 0-2.456 2.456ZM16.894 20.567 16.5 21.75l-.394-1.183a2.25 2.25 0 0 0-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 0 0 1.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 0 0 1.423 1.423l1.183.394-1.183.394a2.25 2.25 0 0 0-1.423 1.423Z"
                    />
                  </svg>

                  <div className="txt-wrapper">
                    {/* الحالة العادية */}
                    <div className="txt-1">
                      <span className="btn-letter">R</span>
                      <span className="btn-letter">e</span>
                      <span className="btn-letter">g</span>
                      <span className="btn-letter">i</span>
                      <span className="btn-letter">s</span>
                      <span className="btn-letter">t</span>
                      <span className="btn-letter">r</span>
                      <span className="btn-letter">a</span>
                      <span className="btn-letter">t</span>
                      <span className="btn-letter">i</span>
                      <span className="btn-letter">o</span>
                      <span className="btn-letter">n</span>
                    </div>

                    {/* حالة التحميل */}
                    <div className="txt-2">
                      <span className="btn-letter">R</span>
                      <span className="btn-letter">e</span>
                      <span className="btn-letter">g</span>
                      <span className="btn-letter">i</span>
                      <span className="btn-letter">s</span>
                      <span className="btn-letter">t</span>
                      <span className="btn-letter">e</span>
                      <span className="btn-letter">r</span>
                      <span className="btn-letter">i</span>
                      <span className="btn-letter">n</span>
                      <span className="btn-letter">g</span>
                    </div>
                  </div>
                </button>
              </div>
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
  .btn-wrapper {
    position: relative;
    display: inline-block;
  }

  .btn-r {
    --border-radius: 24px;
    --padding: 4px;
    --transition: 0.4s;
    --button-color: #101010; /* Same as background */
    --highlight-color-hue: 210deg;

    user-select: none;
    display: flex;
    justify-content: center;
    padding: 0.5em 0.5em 0.5em 1.1em;
    font-family: "Poppins", "Inter", "Segoe UI", sans-serif;
    font-size: 1em;
    font-weight: 400;

    background-color: var(--button-color);

    box-shadow:
      /* inset */ inset 0px 1px 1px rgba(255, 255, 255, 0.2),
      inset 0px 2px 2px rgba(255, 255, 255, 0.15),
      inset 0px 4px 4px rgba(255, 255, 255, 0.1),
      inset 0px 8px 8px rgba(255, 255, 255, 0.05),
      inset 0px 16px 16px rgba(255, 255, 255, 0.05),
      /* drop */ 0px -1px 1px rgba(0, 0, 0, 0.02),
      0px -2px 2px rgba(0, 0, 0, 0.03), 0px -4px 4px rgba(0, 0, 0, 0.05),
      0px -8px 8px rgba(0, 0, 0, 0.06), 0px -16px 16px rgba(0, 0, 0, 0.08);

    border: solid 1px #fff2;
    border-radius: var(--border-radius);
    cursor: pointer;

    transition: box-shadow var(--transition), border var(--transition),
      background-color var(--transition);
  }
  .btn-r::before {
    content: "";
    position: absolute;
    top: calc(0px - var(--padding));
    left: calc(0px - var(--padding));
    width: calc(100% + var(--padding) * 2);
    height: calc(100% + var(--padding) * 2);
    border-radius: calc(var(--border-radius) + var(--padding));
    pointer-events: none;
    background-image: linear-gradient(0deg, #0004, #000a);

    z-index: -1;
    transition: box-shadow var(--transition), filter var(--transition);
    box-shadow: 0 -8px 8px -6px #0000 inset, 0 -16px 16px -8px #00000000 inset,
      1px 1px 1px #fff2, 2px 2px 2px #fff1, -1px -1px 1px #0002,
      -2px -2px 2px #0001;
  }
  .btn-r::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    border-radius: inherit;
    pointer-events: none;
    background-image: linear-gradient(
      0deg,
      #fff,
      hsl(var(--highlight-color-hue), 100%, 70%),
      hsla(var(--highlight-color-hue), 100%, 70%, 50%),
      8%,
      transparent
    );
    background-position: 0 0;
    opacity: 0;
    transition: opacity var(--transition), filter var(--transition);
  }

  .btn-letter {
    position: relative;
    display: inline-block;
    color: #fff5;
    animation: letter-anim 2s ease-in-out infinite;
    transition: color var(--transition), text-shadow var(--transition),
      opacity var(--transition);
  }

  @keyframes letter-anim {
    50% {
      text-shadow: 0 0 3px #fff8;
      color: #fff;
    }
  }

  .btn-svg {
    flex-grow: 1;
    height: 24px;
    margin-right: 0.5rem;
    fill: #e8e8e8;
    animation: flicker 2s linear infinite;
    animation-delay: 0.5s;
    filter: drop-shadow(0 0 2px #fff9);
    transition: fill var(--transition), filter var(--transition),
      opacity var(--transition);
  }
  @keyframes flicker {
    50% {
      opacity: 0.3;
    }
  }

  /* Focus state */
  .txt-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    min-width: 6.4em;
  }
  .txt-1,
  .txt-2 {
    position: absolute;
    word-spacing: -1em;
  }
  .txt-1 {
    animation: appear-anim 1s ease-in-out forwards;
  }
  .txt-2 {
    opacity: 0;
  }
  @keyframes appear-anim {
    0% {
      opacity: 0;
    }
    100% {
      opacity: 1;
    }
  }
  .btn-r:focus .txt-1 {
    animation: opacity-anim 0.3s ease-in-out forwards;
    animation-delay: 1s;
  }
  .btn-r:focus .txt-2 {
    animation: opacity-anim 0.3s ease-in-out reverse forwards;
    animation-delay: 1s;
  }
  @keyframes opacity-anim {
    0% {
      opacity: 1;
    }
    100% {
      opacity: 0;
    }
  }
  

  .btn-r:focus .btn-letter {
    animation: focused-letter-anim 1s ease-in-out forwards,
      letter-anim 1.2s ease-in-out infinite;
    animation-delay: 0s, 1s;
  }
  @keyframes focused-letter-anim {
    0%,
    100% {
      filter: blur(0px);
    }
    50% {
      transform: scale(2);
      filter: blur(10px) brightness(150%)
        drop-shadow(-36px 12px 12px hsl(var(--highlight-color-hue), 100%, 70%));
    }
  }
  .btn-r:focus .btn-svg {
    animation-duration: 1.2s;
    animation-delay: 0.2s;
  }

  .btn-r:focus::before {
    box-shadow: 0 -8px 12px -6px #fff3 inset,
      0 -16px 16px -8px hsla(var(--highlight-color-hue), 100%, 70%, 20%) inset,
      1px 1px 1px #fff3, 2px 2px 2px #fff1, -1px -1px 1px #0002,
      -2px -2px 2px #0001;
  }
  .btn-r:focus::after {
    opacity: 0.6;
    mask-image: linear-gradient(0deg, #fff, transparent);
    filter: brightness(100%);
  }

  /* Animation delays for .btn-letter elements */
  .btn-letter:nth-child(1),
  .btn-r:focus .btn-letter:nth-child(1) {
    animation-delay: 0s;
  }
  .btn-letter:nth-child(2),
  .btn-r:focus .btn-letter:nth-child(2) {
    animation-delay: 0.08s;
  }
  .btn-letter:nth-child(3),
  .btn-r:focus .btn-letter:nth-child(3) {
    animation-delay: 0.16s;
  }
  .btn-letter:nth-child(4),
  .btn-r:focus .btn-letter:nth-child(4) {
    animation-delay: 0.24s;
  }
  .btn-letter:nth-child(5),
  .btn-r:focus .btn-letter:nth-child(5) {
    animation-delay: 0.32s;
  }
  .btn-letter:nth-child(6),
  .btn-r:focus .btn-letter:nth-child(6) {
    animation-delay: 0.4s;
  }
  .btn-letter:nth-child(7),
  .btn-r:focus .btn-letter:nth-child(7) {
    animation-delay: 0.48s;
  }
  .btn-letter:nth-child(8),
  .btn-r:focus .btn-letter:nth-child(8) {
    animation-delay: 0.56s;
  }
  .btn-letter:nth-child(9),
  .btn-r:focus .btn-letter:nth-child(9) {
    animation-delay: 0.64s;
  }
  .btn-letter:nth-child(10),
  .btn-r:focus .btn-letter:nth-child(10) {
    animation-delay: 0.72s;
  }
  .btn-letter:nth-child(11),
  .btn-r:focus .btn-letter:nth-child(11) {
    animation-delay: 0.8s;
  }
  .btn-letter:nth-child(12),
  .btn-r:focus .btn-letter:nth-child(12) {
    animation-delay: 0.88s;
  }
  .btn-letter:nth-child(13),
  .btn-r:focus .btn-letter:nth-child(13) {
    animation-delay: 0.96s;
  }

  /* Active state */
  .btn-r:active {
    border: solid 1px hsla(var(--highlight-color-hue), 100%, 80%, 70%);
    background-color: hsla(var(--highlight-color-hue), 50%, 20%, 0.5);
  }
  .btn-r:active::before {
    box-shadow: 0 -8px 12px -6px #fffa inset,
      0 -16px 16px -8px hsla(var(--highlight-color-hue), 100%, 70%, 80%) inset,
      1px 1px 1px #fff4, 2px 2px 2px #fff2, -1px -1px 1px #0002,
      -2px -2px 2px #0001;
  }
  .btn-r:active::after {
    opacity: 1;
    mask-image: linear-gradient(0deg, #fff, transparent);
    filter: brightness(200%);
  }
  .btn-r:active .btn-letter {
    text-shadow: 0 0 1px hsla(var(--highlight-color-hue), 100%, 90%, 90%);
    animation: none;
  }

  /* Hover state */
  .btn:hover {
    border: solid 1px hsla(var(--highlight-color-hue), 100%, 80%, 40%);
  }

  .btn:hover::before {
    box-shadow: 0 -8px 8px -6px #fffa inset,
      0 -16px 16px -8px hsla(var(--highlight-color-hue), 100%, 70%, 30%) inset,
      1px 1px 1px #fff2, 2px 2px 2px #fff1, -1px -1px 1px #0002,
      -2px -2px 2px #0001;
  }

  .btn:hover::after {
    opacity: 1;
    mask-image: linear-gradient(0deg, #fff, transparent);
  }

  .btn:hover .btn-svg {
    fill: #fff;
    filter: drop-shadow(0 0 3px hsl(var(--highlight-color-hue), 100%, 70%))
      drop-shadow(0 -4px 6px #0009);
    animation: none;
  }
  @media screen and (max-width: 768px) {
    .btn-wrapper {
      display: none;
    }
  }
`;

export default NavBar;
