import React from 'react';
import '../page.css'
import apple from '.../public/assets/Apple.png';
import banana from './public/assets/Banana.png';
import grapes from './public/assets/Grape.png';
import orange from './public/assets/Orange.png';
import pear from './public/assets/Pear.png';
import strawberry from './public/assets/Strawberry.png'
import watermelon from './public/assets/WaterMelon.png'

function Home(){
    return (
        <div className="Body">
          <img src={strawberry} className="strawberry rotate" alt="fruit" />
          <img src={grapes} className="grapes rotatereverse" alt="fruit" />
          <img src={banana} className="banana rotate" alt="fruit" />
          <img src={orange} className="orange rotatereverse" alt="fruit" />
          <div className="center">
            <div className="bounce">
            <h3>Welcome to Slash-It !</h3>
            <div className="btn btn-danger"><h4>Play Now</h4></div>
            </div>
          </div>
          <img src={watermelon} className="watermelon rotate" alt="fruit" />
          <img src={orange} className="strawberry2 rotatereverse" alt="fruit" />
          <img src={apple} className="apple rotatereverse" alt="fruit" />
          <img src={pear} className="pear rotate" alt="fruit" />
        </div>
    );
}

export default Home