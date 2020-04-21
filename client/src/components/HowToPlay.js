import React from 'react';
import './style/HowToPlay.css'

const HowToPlay = ({ close }) => {
    return <>
        <div class="howtoplay">
            <ol>HOW TO PLAY</ol>
            <ol>1. Press Play Now button</ol>
            <ol>2. Input your username and choose difficulty level</ol>
            <ol>3. Press allow when asked for camera access</ol>
            <ol>4. Step back to calibrate your body</ol>
            <ol>5. Press pause icon if you want to pause</ol>
            <ol>6. Hit as many fruits as you can with your arm! (+100 score each)</ol>
            <ol>7. Be careful not to hit bomb! (-100 score each)</ol>
            <ol>8. Press Replay to play again</ol>
            <ol>9. Press Submit to save score to leaderboard</ol>
            <button type="button" onClick={close}>BACK</button>
        </div>
    </>
}
export default HowToPlay;
