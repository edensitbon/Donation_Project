import React from "react";
import { Link } from "react-router-dom";
import { useWeb3Functions } from "../../hook/web3.functions";
import { WalletConsumer } from "../../context";
import LogoImg from "../../assets/ourlogo2.jpg";
import "./styles.css";

const Navbar = () => {
  const { walletConnect } = useWeb3Functions();

  const { isWalletConnected } = WalletConsumer();
  return (
    <>
      <div className="container">
        <div className="logo">
          <div>
            <img src={LogoImg} alt="logo" className="logo-img" />
          </div>
          <div>
            <Link to={"/"} className="nav-link">
              Home
            </Link>
          </div>
          <div>
            <Link to={"/CreateCampaign"} className="nav-link">
              Create Campaign
            </Link>
          </div>
        </div>
        <div className="walletBtn">
          {!isWalletConnected && (
            <button className="btn" onClick={walletConnect}>
              Connect Wallet
            </button>
          )}
          {isWalletConnected && <button className="btn">Connected</button>}
        </div>
      </div>
    </>
  );
};

export default Navbar;
