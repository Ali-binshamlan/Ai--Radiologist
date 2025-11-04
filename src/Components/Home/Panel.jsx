import { motion } from "framer-motion";
import { useInView } from "react-intersection-observer";
import Image1 from "../../assets/Images/background.png";
import Image2 from "../../assets/Images/spark,background.png";
import "../../assets/Styling/panel.css";
import UploadButton from "../UploadButton";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import radiology from "../../assets/Images/radiology.lottie";

const Panel = () => {
  const { ref, inView } = useInView({
    triggerOnce: true,
    threshold: 0.2,
  });

  return (
    <motion.div
      className="panel"
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.8 }}
    >
      <div className="container-page d-flex justify-content-between">
        <div className="title align-items-center d-flex flex-column text-center justify-content-center">
          <motion.h1
            initial={{ opacity: 0, x: -50 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-2"
          >
            Use AI To Instantly Analyze
            <br />
            Radiology Image
            <br />
            And Make Quick Medical
            <br />
            Decisions From Home
          </motion.h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            Saving you time and costs without the need to wait in the hospital.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <UploadButton />
          </motion.div>
        </div>

        <motion.div
          className="container-img"
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.3 }}
        >
          <DotLottieReact
            src={radiology}
            loop
            autoplay
            style={{ width: "105%", height: "100%" }} // حدد الحجم اللي يناسبك
          />
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Panel;
