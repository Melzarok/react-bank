import React from "react";
import { useNavigate } from "react-router-dom";
import coinsImage from "./coins.png";
import Button from "../../component/button";
import "./style.scss";
import { useCookies } from "react-cookie";

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

      {/* <div style={{ padding: "20px", fontFamily: "Arial" }}>
        <h1>Тест работы с Cookies</h1>
        <button onClick={handleSetCookie} style={{ margin: "5px" }}>
          Установить Cookie
        </button>
        <button onClick={handleGetCookie} style={{ margin: "5px" }}>
          Получить Cookie
        </button>
        <button onClick={handleRemoveCookie} style={{ margin: "5px" }}>
          Удалить Cookie
        </button>
      </div> */}
    </div>
  );
};

export default WellcomePage;
