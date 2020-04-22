import React from 'react';
import './style/Leaderboard.css'

const Leaderboard = ({ close }) => {
    const [leaderboard, setLeaderboard] = React.useState([]);
    const users = []
    React.useEffect(()=>{
        fetch('http://localhost:3002/user',{
            method: 'GET'
        })
        .then(response => response.json())
        .then(users=>{
            users.sort(function(a, b) {
                return (a.score > b.score) - (a.score < b.score);
            })
            setLeaderboard(users)
        })
    },[])
    
    return <>
        <div class="leaderboard">
            <div>LEADERBOARD</div>
            {
                leaderboard.map((x, index)=>{
                    return <ol key={index}>{index+1}. {x.name} {x.score}</ol>
                })
            }
            <button type="button" onClick={close}>BACK</button>
        </div>
    </>
}
export default Leaderboard;
