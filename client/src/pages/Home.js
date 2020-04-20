import React from "react";
import "../page.css";
import { useHistory } from "react-router-dom";
const strawberry = "/assets/fruits/Strawberry.png";
const grapes = "/assets/fruits/Grape.png";
const banana = "/assets/fruits/Banana.png";
const orange = "./assets/fruits/Orange.png";
const watermelon = "./assets/fruits/WaterMelon.png";
const apple = "./assets/fruits/Apple.png";
const pear = "./assets/fruits/Pear.png";

function Home() {
  const history = useHistory();
  return (
    <div className="Body">
      {/* <img src={strawberry} className="strawberry rotate" alt="fruit" /> */}
      <img src={grapes} className="grapes rotatereverse" alt="fruit" />
      <img src={banana} className="banana rotate" alt="fruit" />
      <img src={orange} className="orange rotatereverse" alt="fruit" />
      <div className="center">
        <div className="bounce">
          <h3>Welcome to Slash-It !</h3>
          {/* <img src="/assets/HomeLogo.png" height='300px' width='auto' alt="" /> */}
          <div className="btn btn-danger">
            <h4 style={{ cursor: 'pointer' }} onClick={() => history.push('/game')}>Play Now</h4>
          </div>
        </div>
      </div>
      <img src={watermelon} className="watermelon rotate" alt="fruit" />
      <img src={orange} className="strawberry2 rotatereverse" alt="fruit" />
      <img src={apple} className="apple rotatereverse" alt="fruit" />
      <img src={pear} className="pear rotate" alt="fruit" />
    </div>
  );
}

export default Home;
