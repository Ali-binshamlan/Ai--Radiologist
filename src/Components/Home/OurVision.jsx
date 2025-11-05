"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import styled, { keyframes } from "styled-components";
import { useState, useRef } from "react";

const visions = [
  {
    iconClass: "bx bx-file",
    color: "text-white",
    text: "Easy Access to Preliminary Evaluation",
    iconBackgroundColor: "linear-gradient(180deg, #EE7C3C 0%, #E05F3E 100%)",
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
  },
  {
    iconClass: "bx bx-time",
    color: "text-white",
    text: "Cost and Time Reduction",
    iconBackgroundColor: "linear-gradient(180deg, #F7B243 0%, #F38C21 100%)",
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
  },
  {
    iconClass: "bx bx-user-plus",
    color: "text-white",
    text: "Temporary Relief for Doctors and Patients",
    iconBackgroundColor: "linear-gradient(180deg, #1AA7CB 0%, #0878A8 100%)",
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
  },
  {
    iconClass: "bx bx-bulb",
    color: "text-white",
    text: "Support for Student Learning",
    iconBackgroundColor: "linear-gradient(180deg, #2D9E90 0%, #217A6F 100%)",
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
  },
  {
    iconClass: "bx bx-folder",
    color: "text-white",
    text: "Easy Access and Information Storage",
    iconBackgroundColor: "#D40BFD",
    description:
      "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout.",
  },
];

const OurVision = () => {
  const [activeLayer, setActiveLayer] = useState(2);
  const containerRef = useRef(null);

  return (
    <Wrapper ref={containerRef}>
      <motion.h2
        className="section-title"
        initial={{ opacity: 0, y: -50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
      >
        Our Vision
      </motion.h2>

    

     
      {/* Main Container */}
      <div className="layers-container">
        {/* Background Layers */}
        
        {/* Main Cards */}
        <div className="cards-stack">
          {visions.map((item, index) => {
            const { ref, inView } = useInView({
              triggerOnce: true,
              threshold: 0.1,
            });

            const layerOffset = (index - activeLayer) * 150;
            const zIndex = 10 - Math.abs(index - activeLayer);
            const scale = 1 - Math.abs(index - activeLayer) * 0.15;
            const opacity = 1 - Math.abs(index - activeLayer) * 0.3;

            return (
              <LayerCard
                key={index}
                ref={ref}
                $index={index}
                $activeLayer={activeLayer}
                $bgColor={item.iconBackgroundColor}
                $zIndex={zIndex}
                $scale={scale}
                $opacity={opacity}
                $xOffset={layerOffset}
                initial={{ opacity: 0, y: 100, rotateX: -45 }}
                animate={
                  inView
                    ? {
                        opacity: opacity,
                        y: 0,
                        rotateX: 0,
                        x: layerOffset,
                        scale: scale,
                      }
                    : {}
                }
                transition={{
                  type: "spring",
                  stiffness: 100,
                  damping: 20,
                  delay: index * 0.1,
                }}
                onClick={() => setActiveLayer(index)}
              >
                {/* Card Glow Effect */}
                <div
                  className="card-glow"
                  style={{ background: item.iconBackgroundColor }}
                />

                {/* Card Content */}
                <div className="card-content">
                  <motion.div
                    className="icon-wrapper"
                    style={{ background: item.iconBackgroundColor }}
                    animate={{
                      rotate: index === activeLayer ? 360 : 0,
                      scale: index === activeLayer ? 1.1 : 1,
                    }}
                    transition={{ duration: 0.6 }}
                  >
                    <i className={`${item.iconClass} text-white`}></i>
                  </motion.div>

                  <div className="text-content">
                    <motion.h3
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.2 + 0.3 }}
                    >
                      {item.text}
                    </motion.h3>

                    <motion.p
                      initial={{ opacity: 0, height: 0 }}
                      animate={{
                        opacity: index === activeLayer ? 1 : 0,
                        height: index === activeLayer ? "auto" : 0,
                      }}
                      transition={{ duration: 0.4 }}
                    >
                      {item.description}
                    </motion.p>
                  </div>

                  {/* Connection Lines */}
                  {index !== activeLayer && (
                    <motion.div
                      className="connection-line"
                      initial={{ scaleX: 0 }}
                      animate={{ scaleX: 1 }}
                      transition={{ duration: 0.5, delay: index * 0.1 + 0.5 }}
                    />
                  )}
                </div>

                {/* Floating Particles */}
                <div className="floating-particles">
                  {[...Array(3)].map((_, i) => (
                    <motion.div
                      key={i}
                      className="particle"
                      style={{ background: item.iconBackgroundColor }}
                      animate={{
                        y: [0, -20, 0],
                        x: [0, Math.random() * 10 - 5, 0],
                        opacity: [0, 1, 0],
                      }}
                      transition={{
                        duration: 2,
                        repeat: Infinity,
                        delay: i * 0.3,
                      }}
                    />
                  ))}
                </div>
              </LayerCard>
            );
          })}
        </div>

       
      </div>

      {/* Navigation Arrows */}
      <div className="navigation-arrows">
        <motion.button
          className="nav-arrow prev"
          onClick={() => setActiveLayer((prev) => Math.max(0, prev - 1))}
          disabled={activeLayer === 0}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          ←
        </motion.button>

        <motion.button
          className="nav-arrow next"
          onClick={() =>
            setActiveLayer((prev) => Math.min(visions.length - 1, prev + 1))
          }
          disabled={activeLayer === visions.length - 1}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          →
        </motion.button>
      </div>

      {/* Info Text */}
      <motion.div
        className="info-text"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, delay: 1 }}
      >
        <p>Click on cards or use arrows to explore our vision</p>
      </motion.div>
    </Wrapper>
  );
};

export default OurVision;

// Animations
const floatAnimation = keyframes`
  0%, 100% { transform: translateY(0px) rotate(0deg); }
  50% { transform: translateY(-20px) rotate(180deg); }
`;

const pulseAnimation = keyframes`
  0%, 100% { transform: scale(1); opacity: 1; }
  50% { transform: scale(1.05); opacity: 0.8; }
`;

// Styled Components
const Wrapper = styled.div`
  background: linear-gradient(135deg, #0a1f3a 0%, #1a515f 50%, #2a8c8f 100%);
  min-height: 100vh;
  padding: 4rem 1rem;
  position: relative;
  overflow: hidden;

  .section-title {
    justify-content: center;
    text-align: center;
    font-size: 3.5rem;
    font-weight: 800;
    color: #ffffff;
    margin-bottom: 3rem;
    position: relative;
    text-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);

    &::after {
      content: "";
      position: absolute;
      bottom: -10px;
      left: 50%;
      transform: translateX(-50%);
      width: 100px;
      height: 4px;
      background: linear-gradient(90deg, #80dfdf 0%, #309df0 100%);
      border-radius: 2px;
    }
  }

  .vision-bg-image {
    position: relative;
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;

    img {
      width: 120px;
      animation: ${floatAnimation} 6s ease-in-out infinite;
      filter: drop-shadow(0 10px 20px rgba(255, 255, 255, 0.2));
    }
  }

  .navigation-dots {
    display: flex;
    justify-content: center;
    gap: 1rem;
    margin-bottom: 3rem;
    z-index: 20;
    position: relative;

    .dot {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      border: 2px solid rgba(255, 255, 255, 0.3);
      background: rgba(255, 255, 255, 0.1);
      color: white;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      font-weight: 600;
      transition: all 0.3s ease;
      backdrop-filter: blur(10px);

      &.active {
        background: linear-gradient(135deg, #80dfdf 0%, #309df0 100%);
        border-color: #80dfdf;
        box-shadow: 0 0 20px rgba(128, 223, 223, 0.5);
      }

      &:hover:not(.active) {
        background: rgba(255, 255, 255, 0.2);
        transform: scale(1.1);
      }
    }
  }

  .layers-container {
    position: relative;
    max-width: 1000px;
    margin: 0 auto;
    height: 500px;
    display: flex;
    justify-content: center;
    align-items: center;
    perspective: 1000px;
  }

  .background-layers {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    pointer-events: none;

    .layer-bg {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 400px;
      height: 300px;
      background: rgba(255, 255, 255, 0.05);
      border-radius: 30px;
      border: 1px solid rgba(255, 255, 255, 0.1);
      backdrop-filter: blur(10px);
      transition: all 0.6s ease;

      &.active {
        background: rgba(255, 255, 255, 0.1);
        border-color: rgba(128, 223, 223, 0.3);
        box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3);
      }
    }
  }

  .cards-stack {
    position: relative;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .progress-indicator {
    position: absolute;
    bottom: -30px;
    left: 50%;
    transform: translateX(-50%);
    width: 300px;
    height: 4px;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 2px;
    overflow: hidden;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      height: 100%;
      width: 100%;
      background: linear-gradient(90deg, #80dfdf 0%, #309df0 100%);
      transform-origin: left;
    }
  }

  .navigation-arrows {
    display: flex;
    justify-content: center;
    gap: 2rem;
    position: relative;
    z-index: 20;

    .nav-arrow {
      width: 60px;
      height: 60px;
      border-radius: 50%;
      border: 2px solid rgba(255, 255, 255, 0.3);
      background: rgba(255, 255, 255, 0.1);
      color: white;
      font-size: 1.5rem;
      cursor: pointer;
      display: flex;
      align-items: center;
      justify-content: center;
      backdrop-filter: blur(10px);
      transition: all 0.3s ease;

      &:hover:not(:disabled) {
        background: rgba(255, 255, 255, 0.2);
        border-color: rgba(128, 223, 223, 0.5);
      }

      &:disabled {
        opacity: 0.3;
        cursor: not-allowed;
      }
    }
  }

  .info-text {
    text-align: center;
    margin-top: 2rem;
    color: rgba(255, 255, 255, 0.7);

    p {
      font-size: 1.1rem;
    }
  }
`;

const LayerCard = styled(motion.div)`
  position: absolute;
  width: 350px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 25px;
  padding: 2rem;
  min-height: 280px;
  cursor: pointer;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.3), 0 0 0 1px rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(20px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  transition: all 0.4s cubic-bezier(0.175, 0.885, 0.32, 1.275);
  z-index: ${(props) => props.$zIndex};
  transform: translateX(${(props) => props.$xOffset}px)
    scale(${(props) => props.$scale})
    rotateY(${(props) => (props.$index - props.$activeLayer) * 5}deg);

  &:hover {
    transform: translateX(${(props) => props.$xOffset}px)
      scale(${(props) => Math.min(props.$scale * 1.05, 1)})
      rotateY(${(props) => (props.$index - props.$activeLayer) * 5}deg)
      translateY(-10px);
    box-shadow: 0 30px 80px rgba(0, 0, 0, 0.4),
      0 0 0 1px rgba(255, 255, 255, 0.2);
  }

  .card-glow {
    position: absolute;
    top: -10px;
    left: -10px;
    right: -10px;
    bottom: -10px;
    border-radius: 35px;
    opacity: 0.1;
    filter: blur(20px);
    z-index: -1;
  }

  .card-content {
    position: relative;
    z-index: 2;
    height: 100%;
    display: flex;
    flex-direction: column;

    .icon-wrapper {
      width: 70px;
      height: 70px;
      border-radius: 20px;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 1.5rem;
      font-size: 2rem;
      box-shadow: 0 10px 30px rgba(0, 0, 0, 0.2);
    }

    .text-content {
      flex: 1;

      h3 {
        font-size: 1.3rem;
        color: #1a3a5f;
        margin-bottom: 1rem;
        font-weight: 700;
        line-height: 1.3;
      }

      p {
        color: #666;
        font-size: 0.95rem;
        line-height: 1.5;
        overflow: hidden;
      }
    }

    .connection-line {
      position: absolute;
      top: 50%;
      right: -40px;
      width: 40px;
      height: 2px;
      background: ${(props) => {
        if (props.$bgColor.includes("gradient")) {
          const match = props.$bgColor.match(/#[0-9A-Fa-f]{6}/);
          return match ? match[0] : "#309df0";
        }
        return props.$bgColor;
      }};
      opacity: 0.5;
      transform-origin: left center;
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
      width: 6px;
      height: 6px;
      border-radius: 50%;
      opacity: 0;

      &:nth-child(1) {
        top: 20%;
        left: 10%;
      }
      &:nth-child(2) {
        top: 70%;
        left: 80%;
      }
      &:nth-child(3) {
        top: 40%;
        left: 90%;
      }
    }
  }

  @media (max-width: 768px) {
    width: 300px;
    min-height: 250px;
    padding: 1.5rem;

    .card-content {
      .icon-wrapper {
        width: 60px;
        height: 60px;
        font-size: 1.5rem;
      }

      h3 {
        font-size: 1.1rem;
      }

      p {
        font-size: 0.85rem;
      }
    }
  }
`;
