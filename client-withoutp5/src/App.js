import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from 'react-router-dom';
import Home from './pages/Home';
import Camera from './pages/Camera';

const routes = [
  {
    path: '/',
    exact: true,
    children: <Home />
  },
  {
    path: '/game',
    exact: true,
    children: <Camera />
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
