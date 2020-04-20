import React from "react";
import './StartCountdown.css'

const StartCountdown = () => {
  const [countdown, setCountdown] = React.useState(4);

  const getCountdown = () => {
    setCountdown((countdown) => {
      {
        return countdown - 1;
      }
    });
  };

  React.useEffect(() => {
    setInterval(() => {
      getCountdown();
    }, 1000);
    // eslint-disable-next-line
  }, []);

  if (countdown === 4) {
    return (
      <>
      <div className="countdown">
        <h1>READY? </h1>
        </div>
      </>
    );
  } else if (countdown === 0) {
    return (
      <>
      <div className="countdown">
        <h1>GO!</h1>
        </div>
      </>
    );
  } else {
    return ( 
    <>
    <div className="countdown">
        <h1>{countdown}</h1>
        </div>
    </>
    )
  }
};

export default StartCountdown;