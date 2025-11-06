import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import styled, { keyframes } from "styled-components";
import { useState } from "react";
import { 
  FaXRay, 
  FaBrain, 
  FaSearch, 
  FaChartBar, 
  FaComments,
  FaCheck,
  FaClock
} from "react-icons/fa";
import { Link } from "react-router-dom";

const services = [
  {
    title: "X-Ray Analysis",
    description:
      "Advanced AI-powered analysis of X-ray images with instant results and detailed insights for accurate diagnosis.",
    icon: FaXRay,
    features: [
      "Instant Analysis",
      "High Accuracy",
      "Detailed Reports",
      "24/7 Availability",
    ],
    color: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
    delay: 0.1,
    available: true,
  },
  {
    title: "CT Scan Analysis",
    description:
      "Comprehensive CT scan interpretation using cutting-edge AI algorithms for precise medical insights.",
    icon: FaBrain,
    features: [
      "3D Reconstruction",
      "Multi-slice Analysis",
      "Volume Rendering",
      "Expert Validation",
    ],
    color: "linear-gradient(135deg, #f093fb 0%, #f5576c 100%)",
    delay: 0.2,
    available: false,
  },
  {
    title: "MRI Analysis",
    description:
      "Deep learning-based MRI analysis providing detailed anatomical and functional information.",
    icon: FaSearch,
    features: [
      "Multi-sequence Analysis",
      "Tissue Segmentation",
      "Pathology Detection",
      "Quantitative Metrics",
    ],
    color: "linear-gradient(135deg, #4facfe 0%, #00f2fe 100%)",
    delay: 0.3,
    available: false,
  },
 
    
];

const OurServices = () => {
  const [activeService, setActiveService] = useState(0);

  const handleServiceClick = (index) => {
    if (services[index].available) {
      setActiveService(index);
    }
  };

  return (
    <ServicesWrapper>
      <div className="container">
        {/* Header Section */}
        <motion.div
          className="services-header"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h2 className="section-title">Our Advanced Services</h2>
          <p className="section-subtitle">
            Leveraging cutting-edge AI technology to revolutionize medical
            imaging and healthcare delivery
          </p>
        </motion.div>

        {/* Services Navigation */}
        <div className="services-navigation">
          {services.map((service, index) => (
            <motion.button
              key={index}
              className={`nav-item ${activeService === index ? "active" : ""} ${
                !service.available ? "coming-soon" : ""
              }`}
              onClick={() => handleServiceClick(index)}
              whileHover={{ scale: service.available ? 1.05 : 1 }}
              whileTap={{ scale: service.available ? 0.95 : 1 }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              disabled={!service.available}
            >
              <span className="nav-icon">
                {service.available ? <service.icon /> : <FaClock />}
              </span>
              <span className="nav-text">
                {service.title}
                {!service.available && (
                  <span className="coming-soon-badge">Soon</span>
                )}
              </span>
            </motion.button>
          ))}
        </div>

        {/* Main Services Content */}
        <div className="services-content">
          {/* Featured Service */}
          <motion.div
            className="featured-service"
            key={activeService}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <div className="service-card">
              <div
                className="service-header"
                style={{ background: services[activeService].color }}
              >
                <h3>{services[activeService].title}</h3>
                {services[activeService].available && (
                  <div className="available-badge">
                    <FaCheck /> Available Now
                  </div>
                )}
              </div>

              <div className="service-body">
                <p>{services[activeService].description}</p>

                <div className="features-grid">
                  {services[activeService].features.map((feature, index) => (
                    <motion.div
                      key={index}
                      className="feature-item"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                    >
                      <div className="feature-check">
                        <FaCheck />
                      </div>
                      <span>{feature}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="service-actions">
                  {services[activeService].available ? (
                    <>
                      <Link to="/AI_Radiologist/Upload">
                        <motion.button
                          className="secondary-btn"
                          whileHover={{ scale: 1.05 }}
                          whileTap={{ scale: 0.95 }}
                        >
                          Try Now
                        </motion.button>
                      </Link>
                    </>
                  ) : (
                    <div className="coming-soon-section">
                      <div className="coming-soon-icon">
                        <FaClock />
                      </div>
                      <h4>Coming Soon</h4>
                      <p>
                        This service is currently under development and will be
                        available soon.
                      </p>
                      <button className="notify-btn">
                        Notify Me When Available
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </motion.div>

          {/* All Services Grid */}
          <div className="services-grid">
            {services.map((service, index) => {
              const { ref, inView } = useInView({
                triggerOnce: true,
                threshold: 0.1,
              });

              return (
                <ServiceCard
                  key={index}
                  ref={ref}
                  $color={service.color}
                  $isActive={activeService === index}
                  $isAvailable={service.available}
                  initial={{ opacity: 0, y: 50 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{ duration: 0.6, delay: service.delay }}
                  onClick={() => handleServiceClick(index)}
                >
                  {!service.available && (
                    <div className="coming-soon-overlay">
                      <div className="coming-soon-content">
                        <FaClock className="coming-soon-icon" />
                        <span>Coming Soon</span>
                      </div>
                    </div>
                  )}

                  <div
                    className="card-glow"
                    style={{ background: service.color }}
                  />

                  <div className="card-content">
                    <div className="service-icon-large">
                      <service.icon />
                    </div>

                    <h4>{service.title}</h4>
                    <p>{service.description}</p>

                    <div className="service-features">
                      {service.features.slice(0, 2).map((feature, idx) => (
                        <span key={idx} className="feature-tag">
                          {feature}
                        </span>
                      ))}
                      {service.features.length > 2 && (
                        <span className="feature-more">
                          +{service.features.length - 2} more
                        </span>
                      )}
                    </div>

                    <div className="service-status">
                      {service.available ? (
                        <div className="available-status">
                          <FaCheck /> Available
                        </div>
                      ) : (
                        <div className="coming-soon-status">
                          <FaClock /> Coming Soon
                        </div>
                      )}
                    </div>

                    <motion.div
                      className="card-hover-indicator"
                      animate={{ scale: activeService === index ? 1.2 : 1 }}
                      transition={{ duration: 0.3 }}
                    />
                  </div>
                </ServiceCard>
              );
            })}
          </div>
        </div>

        {/* Stats Section */}
        <motion.div
          className="stats-section"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <div className="stats-grid">
            <div className="stat-item">
              <motion.div
                className="stat-number"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                89.2%
              </motion.div>
              <p>Accuracy Rate</p>
            </div>

            <div className="stat-item">
              <motion.div
                className="stat-number"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                24/7
              </motion.div>
              <p>Availability</p>
            </div>

            <div className="stat-item">
              <motion.div
                className="stat-number"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.3 }}
              >
                5min
              </motion.div>
              <p>Average Response</p>
            </div>

            <div className="stat-item">
              <motion.div
                className="stat-number"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: 0.4 }}
              >
                10K+
              </motion.div>
              <p>Analyses Done</p>
            </div>
          </div>
        </motion.div>
      </div>
    </ServicesWrapper>
  );
};

export default OurServices;

// Animations
const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
`;

const pulseAnimation = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
`;

const shimmerAnimation = keyframes`
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
`;

// Styled Components
const ServicesWrapper = styled.section`
  background: linear-gradient(135deg, #f8fdff 0%, #e8f7ff 50%, #f0f9ff 100%);
  padding: 5rem 0;
  position: relative;
  overflow: hidden;

  .container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
  }

  .services-header {
    text-align: center;
    margin-bottom: 4rem;

    .section-title {
      font-size: 3.2rem;
      font-weight: 800;
      background: linear-gradient(135deg, #05445e 0%, #348e80 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 1rem;
      justify-content: center;
    }

    .section-subtitle {
      font-size: 1.2rem;
      color: #666;
      max-width: 600px;
      margin: 0 auto;
      line-height: 1.6;
    }
  }

  .services-navigation {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 3rem;
    flex-wrap: wrap;

    .nav-item {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      padding: 1rem 1.5rem;
      background: white;
      border: 2px solid #e2e8f0;
      border-radius: 15px;
      cursor: pointer;
      transition: all 0.3s ease;
      font-weight: 600;
      color: #4a5568;
      position: relative;

      &:hover {
        border-color: #309df0;
        transform: translateY(-2px);
        box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
      }

      &.active {
        background: linear-gradient(135deg, #309df0 0%, #1a6bb0 100%);
        color: white;
        border-color: #309df0;
        box-shadow: 0 15px 30px rgba(48, 157, 240, 0.3);
      }

      &.coming-soon {
        opacity: 0.7;
        cursor: not-allowed;
        
        &:hover {
          transform: none;
          border-color: #e2e8f0;
          box-shadow: none;
        }
      }

      .nav-icon {
        font-size: 1.3rem;
        display: flex;
        align-items: center;
      }

      .nav-text {
        font-size: 1rem;
        display: flex;
        align-items: center;
        gap: 0.5rem;
      }

      .coming-soon-badge {
        background: #ff6b6b;
        color: white;
        padding: 0.2rem 0.6rem;
        border-radius: 12px;
        font-size: 0.7rem;
        font-weight: 600;
      }
    }
  }

  .services-content {
    display: grid;
    gap: 3rem;
    margin-bottom: 4rem;
  }

  .featured-service {
    .service-card {
      background: white;
      border-radius: 20px;
      overflow: hidden;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
      transition: all 0.3s ease;
      position: relative;

      &:hover {
        transform: translateY(-5px);
        box-shadow: 0 30px 80px rgba(0, 0, 0, 0.15);
      }

      .service-header {
        padding: 2.5rem;
        color: white;
        text-align: center;
        position: relative;
        overflow: hidden;

        &::before {
          content: "";
          position: absolute;
          top: -50%;
          left: -50%;
          width: 200%;
          height: 200%;
          background: linear-gradient(
            45deg,
            transparent,
            rgba(255, 255, 255, 0.1),
            transparent
          );
          animation: ${floatAnimation} 6s ease-in-out infinite;
        }

        .service-icon {
          font-size: 4rem;
          margin-bottom: 1rem;
          filter: drop-shadow(0 5px 15px rgba(0, 0, 0, 0.2));
          display: flex;
          justify-content: center;
        }

        h3 {
          font-size: 2.2rem;
          font-weight: 700;
          margin: 0 0 1rem 0;
          text-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }

        .available-badge {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          background: rgba(255, 255, 255, 0.2);
          padding: 0.5rem 1rem;
          border-radius: 20px;
          font-size: 0.9rem;
          font-weight: 600;
          backdrop-filter: blur(10px);
        }
      }

      .service-body {
        padding: 2.5rem;

        p {
          font-size: 1.1rem;
          color: #666;
          line-height: 1.6;
          margin-bottom: 2rem;
          text-align: center;
        }

        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 2.5rem;

          .feature-item {
            display: flex;
            align-items: center;
            gap: 0.8rem;
            padding: 1rem;
            background: #f7fafc;
            border-radius: 10px;
            transition: all 0.3s ease;

            &:hover {
              background: #edf2f7;
              transform: translateX(5px);
            }

            .feature-check {
              width: 25px;
              height: 25px;
              background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
              border-radius: 50%;
              display: flex;
              align-items: center;
              justify-content: center;
              color: white;
              font-weight: bold;
              font-size: 0.8rem;
            }

            span {
              font-weight: 600;
              color: #2d3748;
            }
          }
        }

        .service-actions {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;

          button {
            padding: 1rem 2rem;
            border: none;
            border-radius: 12px;
            font-weight: 600;
            font-size: 1rem;
            cursor: pointer;
            transition: all 0.3s ease;

            &.primary-btn {
              color: white;
              box-shadow: 0 10px 25px rgba(0, 0, 0, 0.2);

              &:hover {
                box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
              }
            }

            &.secondary-btn {
              background: white;
              border: 2px solid #e2e8f0;
              color: #4a5568;

              &:hover {
                border-color: #309df0;
                color: #309df0;
                box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
              }
            }
          }

          .coming-soon-section {
            text-align: center;
            width: 100%;
            padding: 2rem;

            .coming-soon-icon {
              font-size: 3rem;
              color: #ff6b6b;
              margin-bottom: 1rem;
            }

            h4 {
              font-size: 1.5rem;
              color: #2d3748;
              margin-bottom: 1rem;
            }

            p {
              color: #666;
              margin-bottom: 1.5rem;
            }

            .notify-btn {
              background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
              color: white;
              border: none;
              padding: 1rem 2rem;
              border-radius: 12px;
              font-weight: 600;
              cursor: pointer;
              transition: all 0.3s ease;

              &:hover {
                transform: translateY(-2px);
                box-shadow: 0 10px 25px rgba(102, 126, 234, 0.3);
              }
            }
          }
        }
      }
    }
  }

  .services-grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 2rem;
  }

  .stats-section {
    background: linear-gradient(135deg, #05445e 0%, #348e80 100%);
    border-radius: 20px;
    padding: 3rem 2rem;
    color: white;
    text-align: center;

    .stats-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
      gap: 2rem;

      .stat-item {
        .stat-number {
          font-size: 3rem;
          font-weight: 800;
          margin-bottom: 0.5rem;
          background: linear-gradient(135deg, #80dfdf 0%, #309df0 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
        }

        p {
          font-size: 1.1rem;
          color: rgba(255, 255, 255, 0.9);
          margin: 0;
          font-weight: 600;
        }
      }
    }
  }

  @media (max-width: 768px) {
    .services-navigation {
      flex-direction: column;
      align-items: center;

      .nav-item {
        width: 100%;
        max-width: 300px;
        justify-content: center;
      }
    }

    .featured-service .service-card .service-body .features-grid {
      grid-template-columns: 1fr;
    }

    .services-grid {
      grid-template-columns: 1fr;
    }

    .stats-section .stats-grid {
      grid-template-columns: repeat(2, 1fr);
    }
  }
`;

const ServiceCard = styled(motion.div)`
  background: white;
  border-radius: 20px;
  padding: 2rem;
  cursor: ${props => props.$isAvailable ? 'pointer' : 'not-allowed'};
  transition: all 0.3s ease;
  position: relative;
  overflow: hidden;
  border: 2px solid
    ${(props) => (props.$isActive ? props.$color : "transparent")};
  box-shadow: 0 10px 40px rgba(0, 0, 0, 0.1);
  opacity: ${props => props.$isAvailable ? 1 : 0.7};

  &:hover {
    transform: ${props => props.$isAvailable ? 'translateY(-10px)' : 'none'};
    box-shadow: ${props => props.$isAvailable ? '0 20px 60px rgba(0, 0, 0, 0.15)' : '0 10px 40px rgba(0, 0, 0, 0.1)'};
  }

  ${(props) =>
    props.$isActive &&
    `
    transform: translateY(-5px);
    box-shadow: 0 25px 70px rgba(0, 0, 0, 0.2);
  `}

  .coming-soon-overlay {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(255, 255, 255, 0.95);
    display: flex;
    align-items: center;
    justify-content: center;
    z-index: 3;
    border-radius: 20px;

    .coming-soon-content {
      text-align: center;
      color: #667eea;

      .coming-soon-icon {
        font-size: 3rem;
        margin-bottom: 1rem;
      }

      span {
        font-size: 1.2rem;
        font-weight: 700;
        display: block;
      }
    }
  }

  .card-glow {
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    border-radius: 25px;
    opacity: 0.1;
    filter: blur(20px);
    z-index: -1;
  }

  .card-content {
    position: relative;
    z-index: 2;
    text-align: center;

    .service-icon-large {
      font-size: 3.5rem;
      margin-bottom: 1.5rem;
      animation: ${floatAnimation} 4s ease-in-out infinite;
      display: flex;
      justify-content: center;
      color: ${props => {
        if (props.$color.includes('gradient')) {
          const match = props.$color.match(/#[0-9A-Fa-f]{6}/);
          return match ? match[0] : '#667eea';
        }
        return props.$color;
      }};
    }

    h4 {
      font-size: 1.4rem;
      font-weight: 700;
      color: #2d3748;
      margin-bottom: 1rem;
    }

    p {
      color: #666;
      line-height: 1.5;
      margin-bottom: 1.5rem;
      font-size: 0.95rem;
    }

    .service-features {
      display: flex;
      flex-wrap: wrap;
      gap: 0.5rem;
      justify-content: center;
      margin-bottom: 1.5rem;

      .feature-tag {
        background: #f7fafc;
        padding: 0.4rem 0.8rem;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 600;
        color: #4a5568;
        border: 1px solid #e2e8f0;
      }

      .feature-more {
        background: linear-gradient(135deg, #309df0 0%, #1a6bb0 100%);
        color: white;
        padding: 0.4rem 0.8rem;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 600;
      }
    }

    .service-status {
      margin-bottom: 1rem;

      .available-status {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        background: linear-gradient(135deg, #48bb78 0%, #38a169 100%);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 600;
      }

      .coming-soon-status {
        display: inline-flex;
        align-items: center;
        gap: 0.5rem;
        background: linear-gradient(135deg, #ff6b6b 0%, #ee5a52 100%);
        color: white;
        padding: 0.5rem 1rem;
        border-radius: 20px;
        font-size: 0.8rem;
        font-weight: 600;
      }
    }

    .card-hover-indicator {
      width: 40px;
      height: 4px;
      background: ${(props) => props.$color};
      border-radius: 2px;
      margin: 0 auto;
      opacity: ${(props) => (props.$isActive ? 1 : 0.5)};
    }
  }
`;