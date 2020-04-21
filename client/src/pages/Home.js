import React from "react";
import "../page.css";
import { useHistory } from "react-router-dom";
import HowToPlay from "../components/HowToPlay";
const strawberry = "/assets/fruits/Strawberry.png";
const grapes = "/assets/fruits/Grape.png";
const banana = "/assets/fruits/Banana.png";
const orange = "./assets/fruits/Orange.png";
const watermelon = "./assets/fruits/WaterMelon.png";
const apple = "./assets/fruits/Apple.png";
const pear = "./assets/fruits/Pear.png";

function Home() {
  const history = useHistory();
  const [howToPlayVisible, setHowToPlayVisible] = React.useState(false);
  return (
    <div className="Body">
      {/* <img src={strawberry} className="strawberry rotate" alt="fruit" /> */}
      <img src={grapes} className="grapes rotatereverse" alt="fruit" />
      <img src={banana} className="banana rotate" alt="fruit" />
      <img src={orange} className="orange rotatereverse" alt="fruit" />
      <div className="center">
        <div className="zoomIn">
          <h3>Welcome to Punch Frenzy!</h3>
          {/* <img src="/assets/HomeLogo.png" height='300px' width='auto' alt="" /> */}
          <div className="btn btn-danger">
            <h4
              style={{ cursor: "pointer" }}
              onClick={() => setHowToPlayVisible(true)}
            >
              How To Play
            </h4>
          </div>

          <div className="pl-2 d-inline-block">
            <div className="btn btn-danger">
              <h4
                style={{ cursor: "pointer" }}
                onClick={() => history.push("/mode")}
              >
                Play Now
              </h4>
            </div>
          </div>
        </div>
      </div>
      <img src={watermelon} className="watermelon rotate" alt="fruit" />
      <img src={orange} className="strawberry2 rotatereverse" alt="fruit" />
      <img src={apple} className="apple rotatereverse" alt="fruit" />
      <img src={pear} className="pear rotate" alt="fruit" />
      <div>
        {howToPlayVisible && (
          <HowToPlay close={() => setHowToPlayVisible(false)} />
        )}
      </div>
    </div>
  );
}

export default Home;
