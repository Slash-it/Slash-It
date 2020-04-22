import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Home from './pages/Home';
import Mode from './pages/Mode'
import Camera from './pages/Camera';
import About from './pages/About';
import Leaderboard from './pages/Leaderboard'

const routes = [
  {
    path: '/',
    exact: true,
    children: <Home />
  },
  {
    path: '/mode',
    exact: true,
    children: <Mode />
  },
  {
    path: '/game',
    exact: true,
    children: <Camera />
  },
  {
    path: '/about',
    exact: true,
    children: <About />
  },
  {
    path: '/leaderboard',
    exact: true,
    children: <Leaderboard />
  }
];

function App() {
  return (
    <>
      <Router>
        <Switch>
          {routes.map((route, idx) => {
            return (
              <Route key={idx} {...route} />
            )
          })}
        </Switch>
      </Router>
      {/* <Camera /> */}
    </>    
  );
}

export default App;
