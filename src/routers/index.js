import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import CreateCampaignForm from "../Components/createCampaign";
import AllCampaigns from "../Components/home";
import Navbar from "../Components/Navbar/index";

const Routers = ({ connectWallet }) => {
  return (
    <>
      <Router>
        <Navbar connectWallet={connectWallet} />
        <Routes>
          <Route path="/" element={<AllCampaigns />} />
          <Route path="/CreateCampaign" element={<CreateCampaignForm />} />
        </Routes>
      </Router>
    </>
  );
};
export default Routers;
