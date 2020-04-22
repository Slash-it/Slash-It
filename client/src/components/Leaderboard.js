import React, { useEffect } from 'react';
import './style/Leaderboard.css'
const url = 'http://localhost:3002/user';

const Leaderboard = ({ close }) => {
    const [leaderboard, setLeaderboard] = React.useState([]);

    useEffect(() => {
      async function fetchData() {
        const response = await fetch(url, {
          mode: 'cors',
          headers: {
            'Content-Type': 'application/json',
          },
        });
        const dataJson = await response.json();
        const sorted = dataJson.sort((a, b) => a - b);
        setLeaderboard(sorted);
      };
      fetchData();
    }, [])
    
    return <>
        <div className="leaderboard">
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
