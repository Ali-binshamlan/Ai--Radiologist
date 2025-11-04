import X_ray from "../../assets/Images/FemaleDoctorholdingX-Ray.lottie";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

export default function About() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        gap: "50px",
        padding: "50px",
      }}
    >
      {/* الجزء الخاص بالأنيميشن */}
      <div>
        <DotLottieReact
          src={X_ray}
          loop
          autoplay
          style={{ width: "500px", height: "500px" }}
        />
      </div>

      {/* الجزء الخاص بالنص */}
      <div style={{ maxWidth: "600px" }}>
        <h1
          style={{ fontSize: "3rem", fontWeight: "bold", marginBottom: "20px" }}
        >
          About
        </h1>
        <p style={{ fontSize: "1.2rem", lineHeight: "1.8", color: "#333" }}>
          Radiology AI is an innovative project designed to assist medical
          professionals in analyzing X-ray images efficiently and accurately. By
          leveraging state-of-the-art deep learning models, the platform
          generates detailed radiology reports, helping doctors make faster and
          more informed decisions.
        </p>
        <p
          style={{
            fontSize: "1.2rem",
            lineHeight: "1.8",
            color: "#333",
            marginTop: "15px",
          }}
        >
          Our goal is to combine advanced AI technology with a user-friendly
          interface, making radiology analysis accessible, reliable, and
          seamless for healthcare providers.
        </p>
      </div>
    </div>
  );
}
