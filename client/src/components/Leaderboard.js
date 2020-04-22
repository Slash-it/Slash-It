import React, { useEffect } from 'react';
import './style/Leaderboard.css'
import { useSelector, useDispatch } from 'react-redux';
import { fetchScore } from '../store/actions/keypoints';

const Leaderboard = ({ close }) => {
    // const [leaderboard, setLeaderboard] = React.useState([]);
    const leaderboard = useSelector((state) => state.keypoint.leaderboards);
    const dispatch = useDispatch();

    useEffect(() => {
      dispatch(fetchScore());
    }, [dispatch]);
    
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
