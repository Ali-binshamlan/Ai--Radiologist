
import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import styled, { keyframes } from "styled-components";
import { useState, useRef, useEffect } from "react";
import Image1 from "../../assets/Images/website.png";
import Image2 from "../../assets/Images/image.png";
import Image3 from "../../assets/Images/x-ray-test.png";
import Image4 from "../../assets/Images/radiology (1).png";

const steps = [
  {
    img: Image1,
    title: "Create Your Account",
    description: "Easily register to access personalized radiology services",
    step: "1",
    color: "#EE7C3C",
    gradient: "linear-gradient(135deg, #fad2a5 0%, #E05F3E 100%)",
  },
  {
    img: Image2,
    title: "Upload Your Radiology Image",
    description:
      "Securely upload your X-ray or medical imaging file for analysis",
    step: "2",

    color: "#ffffff",
    gradient: "linear-gradient(135deg, #cde0e7 0%, #2790b0 100%)",
  },
  {
    img: Image3,
    title: "AI-Powered Image Analysis",
    description:
      "Let our advanced AI scan and interpret your radiology image with precision",
    step: "3",
    color: "#2D9E90",
    gradient: "linear-gradient(135deg, #93aca9 0%, #0e796c 100%)",
  },
  {
    img: Image4,
    title: "Generate and Print Your Report",
    description:
      "Receive a detailed report with key insights—ready to view, download, or print",
    step: "4",
    color: "#1AA7CB",
    gradient: "linear-gradient(135deg, #a9cad8 0%, #0878A8 100%)",
  },
];

const HowUseIt = () => {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        const steps = containerRef.current.querySelectorAll(".step-item");
        steps.forEach((step, index) => {
          const rect = step.getBoundingClientRect();
          if (
            rect.top < window.innerHeight * 0.7 &&
            rect.bottom > window.innerHeight * 0.3
          ) {
            setActiveStep(index);
          }
        });
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <Wrapper ref={containerRef}>
      <div className="header-section">
        <motion.h2
          initial={{ opacity: 0, y: -50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="main-title"
        >
          How It Works
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="subtitle"
        >
          Get accurate reports with simplified summaries tailored to your needs
        </motion.p>
      </div>

      <div className="timeline-container">
        {/* Animated Background Elements */}
        <div className="floating-elements">
          <div className="floating-circle circle-1"></div>
          <div className="floating-circle circle-2"></div>
          <div className="floating-circle circle-3"></div>
        </div>

        {/* Progress Line */}
        <div className="progress-line">
          <motion.div
            className="progress-fill"
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
          />
          <div className="progress-dots">
            {steps.map((_, index) => (
              <motion.div
                key={index}
                className={`progress-dot ${
                  index <= activeStep ? "active" : ""
                }`}
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.3 }}
              />
            ))}
          </div>
        </div>

        {/* Steps */}
        <div className="steps-wrapper">
          {steps.map((step, index) => {
            const { ref, inView } = useInView({
              triggerOnce: true,
              threshold: 0.3,
            });

            const isEven = index % 2 === 0;

            return (
              <StepItem
                key={index}
                ref={ref}
                className={`step-item ${isEven ? "left" : "right"} ${
                  index === activeStep ? "active" : ""
                }`}
                $color={step.color}
                $gradient={step.gradient}
                $isEven={isEven}
              >
                {/* Connection Line */}
                <div className="step-connector">
                  <motion.div
                    className="connector-line"
                    initial={{ scaleX: 0 }}
                    whileInView={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: 0.5 }}
                  />
                </div>

                {/* Step Content */}
                <motion.div
                  className="step-content"
                  initial={{ opacity: 0, x: isEven ? -100 : 100, y: 50 }}
                  whileInView={{ opacity: 1, x: 0, y: 0 }}
                  transition={{
                    type: "spring",
                    stiffness: 100,
                    damping: 15,
                    delay: index * 0.2,
                  }}
                  whileHover={{
                    scale: 1.05,
                    y: -10,
                    transition: { duration: 0.3 },
                  }}
                >
                  {/* Step Number with Animation */}
                  <motion.div
                    className="step-number"
                    style={{ background: step.gradient }}
                    initial={{ rotate: -180, scale: 0 }}
                    whileInView={{ rotate: 0, scale: 1 }}
                    transition={{
                      type: "spring",
                      stiffness: 200,
                      delay: index * 0.3,
                    }}
                    whileHover={{
                      rotate: 360,
                      transition: { duration: 0.6 },
                    }}
                  >
                    <span className="step-num">{step.step}</span>
                    <div className="step-icon">{step.icon}</div>
                  </motion.div>

                  {/* Step Card */}
                  <div className="step-card">
                    <motion.div
                      className="card-glow"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.4 }}
                    />

                    <div className="card-content">
                      {/* Animated Image */}
                      <motion.div
                        className="image-container"
                        initial={{ scale: 0, rotate: -180 }}
                        whileInView={{ scale: 1, rotate: 0 }}
                        transition={{
                          type: "spring",
                          stiffness: 150,
                          delay: index * 0.5,
                        }}
                        whileHover={{
                          scale: 1.1,
                          rotate: 5,
                          transition: { duration: 0.3 },
                        }}
                      >
                        <img src={step.img} alt={step.title} />
                      </motion.div>

                      {/* Text Content */}
                      <div className="text-content">
                        <motion.h3
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.6 }}
                        >
                          {step.title}
                        </motion.h3>
                        <motion.p
                          initial={{ opacity: 0, y: 20 }}
                          whileInView={{ opacity: 1, y: 0 }}
                          transition={{ duration: 0.5, delay: index * 0.7 }}
                        >
                          {step.description}
                        </motion.p>
                      </div>

                      {/* Animated Button
                      <motion.div
                        className="step-button"
                        style={{ background: step.gradient }}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5, delay: index * 0.8 }}
                        whileHover={{
                          scale: 1.1,
                          boxShadow: `0 10px 30px ${step.color}50`,
                        }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <span>Learn More</span>
                        <motion.div
                          className="button-arrow"
                          animate={{ x: [0, 5, 0] }}
                          transition={{ duration: 1.5, repeat: Infinity }}
                        >
                          →
                        </motion.div>
                      </motion.div> */}
                    </div>
                  </div>
                </motion.div>

                {/* Floating Particles */}
                <div className="floating-particles">
                  {[...Array(5)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="particle"
                      style={{ background: step.color }}
                      initial={{ opacity: 0, scale: 0 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      transition={{
                        duration: 0.5,
                        delay: index * 0.3 + i * 0.1,
                        repeat: Infinity,
                        repeatType: "reverse",
                        repeatDelay: 2,
                      }}
                      animate={{
                        y: [0, -20, 0],
                        x: [0, Math.random() * 20 - 10, 0],
                      }}
                    />
                  ))}
                </div>
              </StepItem>
            );
          })}
        </div>
      </div>

     
    </Wrapper>
  );
};

export default HowUseIt;

// Animations
const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
`;

const pulseAnimation = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.5; }
`;

const shineAnimation = keyframes`
  0% { transform: translateX(-100%) rotate(45deg); }
  100% { transform: translateX(200%) rotate(45deg); }
`;

// Styled Components
const Wrapper = styled.section`
  min-height: 100vh;
  position: relative;
  overflow: hidden;

  .header-section {
    text-align: center;
    margin-bottom: 4rem;

    .main-title {
      font-size: 3.5rem;
      font-weight: 800;
      background: linear-gradient(135deg, #05445e 0%, #348e80 100%);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      margin-bottom: 1rem;
    }

    .subtitle {
      font-size: 1.2rem;
      color: #666;
      max-width: 500px;
      margin: 0 auto;
    }
  }

  .timeline-container {
    max-width: 1200px;
    margin: 0 auto;
    position: relative;
  }

  .floating-elements {
    position: absolute;
    width: 100%;
    height: 100%;
    pointer-events: none;

    .floating-circle {
      position: absolute;
      border-radius: 50%;
      animation: ${floatAnimation} 6s ease-in-out infinite;

      &.circle-1 {
        width: 100px;
        height: 100px;
        background: linear-gradient(135deg, #ee7c3c20 0%, #e05f3e20 100%);
        top: 10%;
        left: 5%;
        animation-delay: 0s;
      }

      &.circle-2 {
        width: 150px;
        height: 150px;
        background: linear-gradient(135deg, #1aa7cb20 0%, #0878a820 100%);
        top: 60%;
        right: 5%;
        animation-delay: 2s;
      }

      &.circle-3 {
        width: 80px;
        height: 80px;
        background: linear-gradient(135deg, #2d9e9020 0%, #217a6f20 100%);
        bottom: 20%;
        left: 10%;
        animation-delay: 4s;
      }
    }
  }
  .step-num{
    color: white;
  } .progress-line {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 0;
    bottom: 0;
    width: 4px;
    background: linear-gradient(to bottom, #348e80 0%, transparent 100%);
    z-index: 1;

    .progress-fill {
      width: 100%;
      height: 100%;
      background: linear-gradient(to bottom, #348e80 0%, #54c4b4 100%);
      transform-origin: top;
    }

    .progress-dots {
      position: absolute;
      left: 50%;
      transform: translateX(-50%);
      top: 0;
      bottom: 0;
      width: 100%;
      display: flex;
      flex-direction: column;
      justify-content: space-around;

      .progress-dot {
        width: 20px;
        height: 20px;
        border-radius: 50%;
        background: #fff;
        border: 3px solid #348e80;
        position: relative;
        z-index: 2;
        transition: all 0.3s ease;

        &.active {
          background: #348e80;
          box-shadow: 0 0 20px rgba(52, 142, 128, 0.5);
          animation: ${pulseAnimation} 2s infinite;
        }
      }
    }
  }

  .steps-wrapper {
    position: relative;
    z-index: 2;
  }

  .cta-section {
    text-align: center;
    margin-top: 6rem;
    padding: 3rem 2rem;
    background: linear-gradient(135deg, #ffffff 0%, #f8fdff 100%);
    border-radius: 30px;
    box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);

    h3 {
      font-size: 2.5rem;
      color: #05445e;
      margin-bottom: 1rem;
    }

    p {
      font-size: 1.1rem;
      color: #666;
      margin-bottom: 2rem;
      max-width: 500px;
      margin-left: auto;
      margin-right: auto;
    }

    .cta-button {
      background: linear-gradient(135deg, #348e80 0%, #54c4b4 100%);
      color: white;
      border: none;
      padding: 1rem 2.5rem;
      font-size: 1.1rem;
      border-radius: 50px;
      cursor: pointer;
      font-weight: 600;
      box-shadow: 0 10px 30px rgba(52, 142, 128, 0.3);
      transition: all 0.3s ease;
    }
  }
`;

const StepItem = styled(motion.div)`
  position: relative;
  margin: 6rem 0;
  display: flex;
  justify-content: ${(props) => (props.$isEven ? "flex-start" : "flex-end")};
  align-items: center;
  min-height: 300px;

  .step-connector {
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 50%;
    z-index: 1;

    .connector-line {
      width: 100px;
      height: 3px;
      background: ${(props) => props.$gradient};
      transform-origin: center;
    }
  }

  .step-content {
    position: relative;
    width: 45%;
    display: flex;
    align-items: center;
    gap: 2rem;
    flex-direction: ${(props) => (props.$isEven ? "row" : "row-reverse")};

    .step-number {
      width: 80px;
      height: 80px;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: 800;
      font-size: 1.5rem;
      position: relative;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
      z-index: 3;

      .step-icon {
        position: absolute;
        font-size: 2rem;
        opacity: 0.3;
      }
    }

    .step-card {
      flex: 1;
      background: white;
      border-radius: 25px;
      padding: 2rem;
      box-shadow: 0 20px 60px rgba(0, 0, 0, 0.1);
      position: relative;
      overflow: hidden;

      .card-glow {
        position: absolute;
        top: -50%;
        left: -50%;
        width: 200%;
        height: 200%;
        background: ${(props) => props.$gradient};
        opacity: 0.05;
        border-radius: 50%;
      }

      .card-content {
        position: relative;
        z-index: 2;

        .image-container {
          width: 80px;
          height: 80px;
          background: ${(props) => props.$gradient};
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
          position: relative;
          overflow: hidden;

          img {
            width: 50px;
            height: 50px;
          }

          .image-shine {
            position: absolute;
            top: -50%;
            left: -50%;
            width: 200%;
            height: 200%;
            background: linear-gradient(
              45deg,
              transparent 0%,
              rgba(255, 255, 255, 0.3) 50%,
              transparent 100%
            );
            animation: ${shineAnimation} 3s infinite;
          }
        }

        .text-content {
          h3 {
            font-size: 1.5rem;
            color: #ffffff;
            margin-bottom: 1rem;
            font-weight: 700;
          }

          p {
            color: #666;
            line-height: 1.6;
            margin-bottom: 1.5rem;
          }
        }

        .step-button {
          display: inline-flex;
          align-items: center;
          gap: 0.5rem;
          padding: 0.8rem 1.5rem;
          border-radius: 25px;
          color: white;
          font-weight: 600;
          cursor: pointer;
          border: none;
          box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);

          .button-arrow {
            font-size: 1.2rem;
          }
        }
      }
    }
  }

  .floating-particles {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;

    .particle {
      position: absolute;
      width: 8px;
      height: 8px;
      border-radius: 50%;
      opacity: 0.6;

      &:nth-child(1) {
        top: 20%;
        left: 10%;
      }
      &:nth-child(2) {
        top: 60%;
        left: 20%;
      }
      &:nth-child(3) {
        top: 30%;
        left: 80%;
      }
      &:nth-child(4) {
        top: 70%;
        left: 70%;
      }
      &:nth-child(5) {
        top: 50%;
        left: 50%;
      }
    }
  }

  &.active {
    .step-number {
      box-shadow: 0 0 30px ${(props) => props.$color}80;
    }
  }

  @media (max-width: 768px) {
    margin: 4rem 0;
    justify-content: center;

    .step-content {
      width: 90% !important;
      flex-direction: column !important;
      text-align: center;

      .step-number {
        margin-bottom: 1rem;
      }
    }

    .step-connector {
      display: none;
    }
  }
`;
