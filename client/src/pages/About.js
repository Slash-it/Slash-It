import React from 'react'
import {Link} from 'react-router-dom'
const afif = '/assets/photo/Afif.jpg';
const ivan = '/assets/photo/Ivan.jpg';
const agung = '/assets/photo/Agung.jpg';
const rofandi = '/assets/photo/Rofandi.jpg';
const logo = '/assets/fruits/favicon.png';

function About(){

    return(
        <div className="BodyAbout">

            <div className="TitleAbout">
            <h3>About Punch Frenzy</h3>
            </div>
            <div className="LogoImage zoomIn">
            <img src={logo} alt="logo"></img>
            </div>
            <div className="DescriptionText">
            <p>
            Punching Frenzy is an Augmented Reality fitness game. 
            You just need an empty space and a webcam, and the character that you play is yourselves. 
            Use your fist to punch two or more fruits that come in your sight… and watch them explode!
            If a workout sounds boring to you, then Punching Frenzy is the right fit for you!.
            </p>
            </div>
            <div className="TheCreator">
            <h3>The Creator</h3>
            </div>
            <div id="gradient"></div>
            <div id="card">
            <img src={ivan} alt="profpic"/>
            <div className="cardtext">
            <h2>Henarivan Andhika</h2>
            <p>Fullstack Developer</p>
            <p>Interested in Web technologies like HTML5, CSS3, JavaScript, React, Vue, Jquery, etc.</p>
            </div>
            <a href="https://www.linkedin.com/in/henarivanandhika/"><span className="left bottom btn btn-info">Linkedin Profile</span></a>
            <a href="https://github.com/henarivanaa"><span className="right bottom btn btn-dark">Github Profile</span></a>
            </div>

            <div id="gradient2"></div>
            <div id="card2">
            <img src={agung} alt="profpic"/>
            <div className="cardtext">
            <h2>I Gusti Agung</h2>
            <p>Fullstack Developer</p>
            <p>Interested in Web technologies like HTML5, CSS3, JavaScript, React, Vue, Jquery, etc.</p>
            </div>
            <a href="https://www.linkedin.com/in/agunggst/"><span className="left bottom btn btn-info">Linkedin Profile</span></a>
            <a href="https://github.com/agunggst"><span className="right bottom btn btn-dark">Github Profile</span></a>
            </div>

            <div id="gradient3"></div>
            <div id="card3">
            <img src={afif} alt="profpic"/>
            <div className="cardtext">
            <h2>Afif Wanda Julio</h2>
            <p>Fullstack Developer</p>
            <p>Interested in Web technologies like HTML5, CSS3, JavaScript, React, Vue, Jquery, etc.</p>
            </div>
            <a href="https://www.linkedin.com/in/afif-wanda-julio-6551b8135/"><span className="left bottom btn btn-info">Linkedin Profile</span></a>
            <a href="https://github.com/afifwanda"><span className="right bottom btn btn-dark">Github Profile</span></a>
            </div>

            <div id="gradient4"></div>
            <div id="card4">
            <img src={rofandi} alt="profpic"/>
            <div className="cardtext">
            <h2>Rofandi Agung</h2>
            <p>Fullstack Developer</p>
            <p>Interested in Web technologies like HTML5, CSS3, JavaScript, React, Vue, Jquery, etc.</p>
            </div>
            <Link to="https://www.linkedin.com"><span className="left bottom btn btn-info">Linkedin Profile</span></Link>
            <a href="https://github.com/Rofandi"><span className="right bottom btn btn-dark">Github Profile</span></a>
            </div>

            <div className="HomeButton">
                <Link to="/"><div className="btn btn-danger"><h4>Back To Home</h4></div></Link>
            </div>

            <div className="Footer">
            <h5>@2020 Punch Frenzy All Right Reserved</h5>
            </div>


        </div>
    )
}

export default About