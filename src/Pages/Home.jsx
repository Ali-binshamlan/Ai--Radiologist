import HowUseIt from "../Components/Home/HowUseIt";
import OurVision from "../Components/Home/OurVision";
import Panel from "../Components/Home/Panel";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Home/Footer";
import About from "../Components/Home/About";
import OurServices from "../Components/Home/Services";


const Home = () => {
  return (
    <div>
      <NavBar />
      <Panel />
      <About />
      <OurVision />
      <OurServices/>
      <div className="mt-5">
        <HowUseIt />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
