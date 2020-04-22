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

const hover = new Audio("/assets/audio/hover.mp3");
const click = new Audio("/assets/audio/click.mp3");

function Home() {
  const history = useHistory();
  const [howToPlayVisible, setHowToPlayVisible] = React.useState(false);
  return (
    <div className="Body">
      {/* <img src={strawberry} className="strawberry rotate" alt="fruit" /> */}
      <img src={grapes} className="grapes rotatereverse" alt="fruit" />
      <img src={banana} className="banana rotate" alt="fruit" />
      <img src={orange} className="orange rotatereverse" alt="fruit" />
      <img src={strawberry} className="strawberry rotate" alt="fruit" />
      <div className="center">
        <div className="zoomIn">
          <h3>Welcome to Punch Frenzy!</h3>
          {/* <img src="/assets/HomeLogo.png" height='300px' width='auto' alt="" /> */}

          <div className="d-flex row ml-1 mb-4">
            <div className="btn btn-danger mr-5">
              <h4
                style={{ cursor: "pointer" }}
                onClick={() => {
                  click.play();
                  history.push("/leaderboard")
                }}
                onMouseEnter={() => hover.play()}
              >
                Leaderboard
              </h4>
            </div>

            <div className="btn btn-danger mr-5">
              <h4
                style={{ cursor: "pointer" }}
                onClick={() => history.push("/about")}
              >
                About
              </h4>
            </div>

            <div className="btn btn-danger mr-1">
              <h4
                style={{ cursor: "pointer" }}
                onClick={() => {
                  click.play();
                  setHowToPlayVisible(true);
                }}
                onMouseEnter={() => hover.play()}
              >
                How To Play
              </h4>
            </div>
          </div>

          <div className="btn btn-danger ml-2 ">
            <h4
              style={{ cursor: "pointer" }}
              onClick={() => {
                click.play();
                history.push("/mode");
              }}
              onMouseEnter={() => hover.play()}
            >
              Play Now
            </h4>
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
