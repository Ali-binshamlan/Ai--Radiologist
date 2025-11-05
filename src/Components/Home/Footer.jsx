import { motion } from "framer-motion";
import styled from "styled-components";
import { Link } from "react-router-dom";
import {
  FaTwitter,
  FaEnvelope,
  FaInstagram,
  FaPhone,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { SiX } from "react-icons/si";


const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <FooterWrapper>
      {/* Wave Decoration */}
      <div className="wave-divider">
        <svg
          data-name="Layer 1"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 120"
          preserveAspectRatio="none"
        >
          <path
            d="M321.39,56.44c58-10.79,114.16-30.13,172-41.86,82.39-16.72,168.19-17.73,250.45-.39C823.78,31,906.67,72,985.66,92.83c70.05,18.48,146.53,26.09,214.34,3V0H0V27.35A600.21,600.21,0,0,0,321.39,56.44Z"
            className="shape-fill"
          ></path>
        </svg>
      </div>

      <div className="footer-content">
        {/* Main Footer Section */}
        <div className="footer-main">
          <div className="container">
            <div className="footer-grid">
              {/* Brand Section */}
              <motion.div
                className="footer-brand"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
              >
                <h3 className="brand-title">AI Radiologist</h3>
                <p className="brand-description">
                  Innovative AI-Powered Technology for Better Healthcare. Save
                  time and costs with instant results—no hospital visits
                  required.
                </p>
                <div className="social-links">
                  <motion.div
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link to="/" className="social-link">
                      <FaInstagram size={20} />
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link to="/" className="social-link">
                      <FaEnvelope size={20} />
                    </Link>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.1, y: -2 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Link to="/" className="social-link">
                      <SiX size={20} />
                    </Link>
                  </motion.div>
                </div>
              </motion.div>

              {/* Quick Links */}
              <motion.div
                className="footer-links"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <h4>Quick Links</h4>
                <ul>
                  <li>
                    <Link to="/">Home</Link>
                  </li>
                  <li>
                    <Link to="/">About Us</Link>
                  </li>
                  <li>
                    <Link to="/">Our Vision</Link>
                  </li>
                  <li>
                    <Link to="/">Upload</Link>
                  </li>
                  <li>
                    <Link to="/">How It Works</Link>
                  </li>
                </ul>
              </motion.div>

              {/* Services */}
              <motion.div
                className="footer-links"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h4>Our Services</h4>
                <ul>
                  <li>
                    <Link to="/AI_Radiologist/Upload">X-Ray Analysis</Link>
                  </li>
                  <li>
                    <Link to="/AI_Radiologist/Upload">CT Scan Analysis</Link>
                  </li>
                  <li>
                    <Link to="/AI_Radiologist/Upload">MRI Analysis</Link>
                  </li>
                </ul>
              </motion.div>

              {/* Contact Info */}
              <motion.div
                className="footer-contact"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
              >
                <h4>Contact Us</h4>
                <div className="contact-info">
                  <div className="contact-item">
                    <div className="contact-icon">
                      <FaEnvelope />
                    </div>
                    <div>
                      <p>Email</p>
                      <span>info@AIRadologist.com</span>
                    </div>
                  </div>
                  <div className="contact-item">
                    <div className="contact-icon">
                      <FaPhone />
                    </div>
                    <div>
                      <p>Phone</p>
                      <span>7777777777</span>
                    </div>
                  </div>
                  
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Bottom Footer */}
        <div className="footer-bottom">
          <div className="container">
            <div className="footer-bottom-content">
              <div className="copyright">
                <p>&copy; {currentYear} MediScanAI. All rights reserved.</p>
              </div>
              <div className="footer-legal">
                <Link to="/">Privacy Policy</Link>
                <Link to="/">Terms of Service</Link>
                <Link to="/">Cookie Policy</Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </FooterWrapper>
  );
};

export default Footer;

const FooterWrapper = styled.footer`
  background: linear-gradient(135deg, #0a1f3a 0%, #1a3a5f 50%, #2d3748 100%);
  color: white;
  position: relative;
  margin-top: 4rem;

  .wave-divider {
    position: absolute;
    top: -2px;
    left: 0;
    width: 100%;
    overflow: hidden;
    line-height: 0;

    svg {
      position: relative;
      display: block;
      width: calc(100% + 1.3px);
      height: 60px;
    }

    .shape-fill {
      fill: #0a1f3a;
    }
  }

  .footer-content {
    position: relative;
    z-index: 1;
  }

  .footer-main {
    padding: 4rem 0 2rem;

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }
  }

  .footer-grid {
    display: grid;
    grid-template-columns: 2fr 1fr 1fr 1.5fr;
    gap: 3rem;
    align-items: start;

    @media (max-width: 968px) {
      grid-template-columns: 1fr 1fr;
      gap: 2rem;
    }

    @media (max-width: 768px) {
      grid-template-columns: 1fr;
      gap: 2rem;
    }
  }

  .footer-brand {
    .brand-title {
      font-size: 2.2rem;
      font-weight: 800;
      margin-bottom: 1rem;
      background: linear-gradient(135deg, #80dfdf 0%, #309df0 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
    }

    .brand-description {
      color: rgba(255, 255, 255, 0.8);
      line-height: 1.6;
      margin-bottom: 2rem;
      font-size: 1.1rem;
    }

    .social-links {
      display: flex;
      gap: 1rem;

      .social-link {
        display: flex;
        align-items: center;
        gap: 0.5rem;
        padding: 0.8rem 1.2rem;
        background: rgba(255, 255, 255, 0.1);
        border-radius: 12px;
        color: white;
        text-decoration: none;
        transition: all 0.3s ease;
        backdrop-filter: blur(10px);
        border: 1px solid rgba(255, 255, 255, 0.1);

        &:hover {
          background: rgba(255, 255, 255, 0.15);
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
        }

        svg {
          width: 20px;
          height: 20px;
        }

        span {
          font-size: 0.9rem;
          font-weight: 500;
        }
      }
    }
  }

  .footer-links {
    h4 {
      font-size: 1.3rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
      color: #80dfdf;
      position: relative;

      &::after {
        content: "";
        position: absolute;
        bottom: -8px;
        left: 0;
        width: 40px;
        height: 3px;
        background: linear-gradient(90deg, #80dfdf, transparent);
        border-radius: 2px;
      }
    }

    ul {
      list-style: none;
      padding: 0;
      margin: 0;

      li {
        margin-bottom: 0.8rem;

        a {
          color: rgba(255, 255, 255, 0.8);
          text-decoration: none;
          transition: all 0.3s ease;
          position: relative;
          padding-left: 0;

          &::before {
            content: "▸";
            position: absolute;
            left: -1rem;
            opacity: 0;
            transition: all 0.3s ease;
            color: #80dfdf;
          }

          &:hover {
            color: #80dfdf;
            padding-left: 1rem;

            &::before {
              opacity: 1;
              left: 0;
            }
          }
        }
      }
    }
  }

  .footer-contact {
    h4 {
      font-size: 1.3rem;
      font-weight: 700;
      margin-bottom: 1.5rem;
      color: #80dfdf;
      position: relative;

      &::after {
        content: "";
        position: absolute;
        bottom: -8px;
        left: 0;
        width: 40px;
        height: 3px;
        background: linear-gradient(90deg, #80dfdf, transparent);
        border-radius: 2px;
      }
    }

    .contact-info {
      .contact-item {
        display: flex;
        align-items: center;
        gap: 1rem;
        margin-bottom: 1.2rem;
        padding: 0.8rem;
        background: rgba(255, 255, 255, 0.05);
        border-radius: 10px;
        transition: all 0.3s ease;

        &:hover {
          background: rgba(255, 255, 255, 0.1);
          transform: translateX(5px);
        }

        .contact-icon {
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          background: rgba(128, 223, 223, 0.1);
          border-radius: 8px;

          svg {
            width: 18px;
            height: 18px;
            color: #80dfdf;
          }
        }

        div {
          p {
            margin: 0;
            font-size: 0.9rem;
            color: rgba(255, 255, 255, 0.7);
          }

          span {
            font-size: 0.95rem;
            color: white;
            font-weight: 500;
          }
        }
      }
    }
  }

  .footer-bottom {
    border-top: 1px solid rgba(255, 255, 255, 0.1);
    padding: 1.5rem 0;

    .container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 0 1rem;
    }

    .footer-bottom-content {
      display: flex;
      justify-content: space-between;
      align-items: center;

      @media (max-width: 768px) {
        flex-direction: column;
        gap: 1rem;
        text-align: center;
      }

      .copyright {
        p {
          margin: 0;
          color: rgba(255, 255, 255, 0.7);
          font-size: 0.95rem;
        }
      }

      .footer-legal {
        display: flex;
        gap: 2rem;

        @media (max-width: 480px) {
          flex-direction: column;
          gap: 0.5rem;
        }

        a {
          color: rgba(255, 255, 255, 0.7);
          text-decoration: none;
          font-size: 0.9rem;
          transition: color 0.3s ease;

          &:hover {
            color: #80dfdf;
          }
        }
      }
    }
  }

  /* Animation for social links */
  @keyframes float {
    0%,
    100% {
      transform: translateY(0px);
    }
    50% {
      transform: translateY(-5px);
    }
  }

  .social-link:hover svg {
    animation: float 2s ease-in-out infinite;
  }
`;
