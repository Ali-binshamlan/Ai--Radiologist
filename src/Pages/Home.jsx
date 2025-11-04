import HowUseIt from "../Components/Home/HowUseIt";
import OurVision from "../Components/Home/OurVision";
import Panel from "../Components/Home/Panel";
import NavBar from "../Components/NavBar";
import Footer from "../Components/Home/Footer";
import About from "../Components/Home/About";


const Home = () => {
  return (
    <div>
      <NavBar />
      <Panel />
      <About/>
      <OurVision />
      <HowUseIt />
      <Footer />
    </div>
  );
};

export default Home;
