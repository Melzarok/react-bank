import React from "react";
import "./style.scss";
import { useNavigate } from "react-router-dom";
import coinsImage from "./coins.png";
import Button from "../../component/button";

const WellcomePage = () => {
  const navigate = useNavigate();

  return (
    <div className="page page--wellcome">
      <div className="wellcome-bg"></div>
      <img className="coins-image" src={coinsImage} alt="Coins" />

      <div className="wellcome_container">
        <h1 className="wellcome__title">Hello!</h1>
        <p className="wellcome__text">Welcome to bank app</p>
      </div>

      <div className="wellcome_container">
        <Button onClick={() => navigate("/signup")} variant={`filled`}>
          Sign Up
        </Button>
        <Button onClick={() => navigate("/signin")} variant={`outline`}>
          Sign In
        </Button>
      </div>
    </div>
  );
};

export default WellcomePage;
