import React from "react";
import "../page.css";
import {Link} from "react-router-dom";
const strawberry = "/assets/fruits/Strawberry.png";
const grapes = "/assets/fruits/Grape.png";
const banana = "/assets/fruits/Banana.png";
const orange = "./assets/fruits/Orange.png";
const watermelon = "./assets/fruits/WaterMelon.png";
const apple = "./assets/fruits/Apple.png";
const pear = "./assets/fruits/Pear.png";


function Mode(){
    return(
        <div className='BodyPages'>
            <div className='sectionTop d-flex row'>
            <img src={banana} className="fruit2 bounce-2" alt="fruit" />
            <img src={apple} className="fruit3 bounce-3" alt="fruit" />
            <img src={grapes} className="fruit4 bounce-4" alt="fruit" />
            <img src={orange} className="fruit5 bounce-2" alt="fruit" />
            <img src={pear} className="fruit6 bounce-3" alt="fruit" />
            <img src={strawberry} className="fruit7 bounce-4" alt="fruit" />
            <img src={watermelon} className="fruit8 bounce-2" alt="fruit" />
            <img src={banana} className="fruit9 bounce-3" alt="fruit" />
            <img src={apple} className="fruit10 bounce-4" alt="fruit" />
            <img src={grapes} className="fruit11 bounce-2" alt="fruit" />
            <img src={orange} className="fruit12 bounce-3" alt="fruit" />
            <img src={pear} className="fruit13 bounce-4" alt="fruit" />
            <img src={strawberry} className="fruit14 bounce-2" alt="fruit" />
            <img src={watermelon} className="fruit15 bounce-3" alt="fruit" />
            <img src={banana} className="fruit16 bounce-4" alt="fruit" />
            </div>
            <div className='center'>
                <div className="bounce">
                    <h4>Pick Your Username !</h4>
                    <input className="form-control-lg mt-3 mb-3" type="text" placeholder="Username"></input>
                    <br></br>
                    <h4>Choose The Level !</h4>
                    <div className='d-flex row'>
                    <Link to='/game'><div className="btn btn-danger mr-5"><h4>Easy</h4></div></Link>
                    <Link to='/game'><div className="btn btn-danger mr-5"><h4>Medium</h4></div></Link>
                    <Link to='/game'><div className="btn btn-danger"><h4>Hard</h4></div></Link>
                    </div>
                </div>
            </div>
            <div className='sectionTop d-flex row'>
            <img src={grapes} className="fruit2 bounce-5" alt="fruit" />
            <img src={banana} className="fruit3 bounce-6" alt="fruit" />
            <img src={orange} className="fruit4 bounce-7" alt="fruit" />
            <img src={apple} className="fruit5 bounce-5" alt="fruit" />
            <img src={watermelon} className="fruit6 bounce-6" alt="fruit" />
            <img src={pear} className="fruit7 bounce-7" alt="fruit" />
            <img src={grapes} className="fruit8 bounce-5" alt="fruit" />
            <img src={banana} className="fruit9 bounce-6" alt="fruit" />
            <img src={orange} className="fruit10 bounce-7" alt="fruit" />
            <img src={apple} className="fruit11 bounce-5" alt="fruit" />
            <img src={watermelon} className="fruit12 bounce-6" alt="fruit" />
            <img src={pear} className="fruit13 bounce-7" alt="fruit" />
            <img src={banana} className="fruit14 bounce-5" alt="fruit" />
            <img src={grapes} className="fruit15 bounce-6" alt="fruit" />
            <img src={strawberry} className="fruit16 bounce-7" alt="fruit" />
            </div>
        </div>
        
    )
}

export default Mode