"use client";

import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import styled from "styled-components";
import Image1 from "../../assets/Images/spark, sparkle, 28.png";

const visions = [
  {
    iconClass: "bx bx-file",
    color: "text-white",
    text: "Easy Access to Preliminary Evaluation",
    iconBackgroundColor: "linear-gradient(180deg, #EE7C3C 0%, #E05F3E 100%)",
  },
  {
    iconClass: "bx bx-time",
    color: "text-white",
    text: "Cost and Time Reduction",
    iconBackgroundColor: "linear-gradient(180deg, #F7B243 0%, #F38C21 100%)",
  },
  {
    iconClass: "bx bx-user-plus",
    color: "text-white",
    text: "Temporary Relief for Doctors and Patients",
    iconBackgroundColor: "linear-gradient(180deg, #1AA7CB 0%, #0878A8 100%)",
  },
  {
    iconClass: "bx bx-bulb",
    color: "text-white",
    text: "Support for Student Learning",
    iconBackgroundColor: "linear-gradient(180deg, #2D9E90 0%, #217A6F 100%)",
  },
  {
    iconClass: "bx bx-folder",
    color: "text-white",
    text: "Easy Access and Information Storage",
    iconBackgroundColor: "#D40BFD",
  },
];

const OurVision = () => {
  return (
    <Wrapper>
      <h2 className="section-title mt-5">Our Vision</h2>

      <div className="vision-bg-image">
        <img src={Image1} alt="" />
      </div>

      <div className="cards-container">
        {visions.map((item, index) => {
          const { ref, inView } = useInView({
            triggerOnce: true,
            threshold: 0.1,
          });

          return (
            <motion.div
              key={index}
              ref={ref}
              initial={{ opacity: 0, y: 50 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.7, delay: index * 0.2 }}
            >
              <Card>
                <div className="hover_color_bubble"></div>
                <motion.div
                  className="so_top_icon"
                  style={{ background: item.iconBackgroundColor }}
                  animate={{ rotate: [0, 10, -10, 0], y: [0, -5, 5, 0] }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <i
                    className={`${item.iconClass} ${item.color}`}
                    style={{ fontSize: "1.8rem" }}
                  ></i>
                </motion.div>

                <div className="solu_title">
                  <div>{item.text}</div>
                </div>
                <div className="solu_description">
                  <p>
                    It is a long established fact that a reader will be
                    distracted by the readable content of a page when looking at
                    its layout.
                  </p>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>
    </Wrapper>
  );
};

export default OurVision;

const Wrapper = styled.div`
  background: #ffffff; /* لون سماوي للخلفية كاملة */
  padding: 0.8rem;

  .section-title {
    text-align: center;
    font-size: 2.4rem;
    font-weight: bold;
    color: #05445e;
  }

  .vision-bg-image {
    position: relative;
    display: flex;
    justify-content: center;
    margin-bottom: 2rem;

    img {
      position: absolute;
      bottom: -20%;
      right: 34%;
      width: 10%;
    }
  }

  .cards-container {
    background: linear-gradient(
      90deg,
      rgba(2, 85, 89, 0.9) 0%,
      rgb(128, 223, 223) 66%
    );
    display: flex;
    flex-wrap: wrap;
    gap: 1rem;
    justify-content: center;
    padding: 50px;
    border-radius: 30px;
  }
`;

const Card = styled.div`
  position: relative;
  width: 230px; /* صغر حجم الكارد */
  background: #fff;
  border-radius: 15px;
  padding: 15px;
  min-height: 250px; /* تقليل ارتفاع الكارد */
  overflow: hidden;
  transition: 0.7s;
  box-shadow: 0 2px 4px rgba(136, 144, 195, 0.2),
    0 5px 15px rgba(37, 44, 97, 0.15);

  &:hover {
    background: #309df0;
    color: #fff;
    transform: scale(1.05);
    z-index: 9;
  }

  &:before {
    content: "";
    position: absolute;
    background: rgba(85, 108, 214, 0.05);
    width: 120px;
    height: 300px;
    z-index: -1;
    transform: rotate(42deg);
    right: -40px;
    top: -20px;
    border-radius: 35px;
  }

  .hover_color_bubble {
    position: absolute;
    background: rgba(54, 81, 207, 0.15);
    width: 80rem;
    height: 80rem;
    top: 12rem;
    left: -14rem;
    border-radius: 50%;
    transform: rotate(-36deg);
    transition: 0.7s;
    z-index: -1;
  }

  &:hover .hover_color_bubble {
    top: 0;
  }

  .so_top_icon {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    color: #fff;
  }

  .solu_title div {
    font-size: 1.2rem;
    margin: 8px 0;
  }

  .solu_description p {
    font-size: 0.9rem;
    margin-bottom: 10px;
  }

  .read_more_btn {
    border: 0;
    border-radius: 15px;
    background: linear-gradient(140deg, #42c3ca 0%, #42c3ca 50%, #42c3cac7 75%);
    color: #fff;
    font-weight: 500;
    font-size: 0.9rem;
    padding: 4px 12px;
    cursor: pointer;
  }
`;
