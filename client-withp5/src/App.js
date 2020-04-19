import React from 'react';
import Sketch from "react-p5";
import * as ml5 from 'ml5'
import collideCircle from './helpers/collideCircle'
import Fruit from './objects/fruit'
import Bomb from './objects/bomb'
import { createHandKeypoint } from './helpers/extend'

function App() {
  let video;
  let poseNet;
  let pose;
  let skeleton;
  let fruit_png;
  // let calibrate_left = false;
  // let calibrate_right = false;
  let fruits = []
  let bombs = []
  let score = 0
  let Hp = 10
  // let handKeypoints

  function preload(p5){
    fruit_png = p5.loadImage("https://cdn4.iconfinder.com/data/icons/slot-machines/512/Grapes-512.png")
    bomb_png = p5.loadImage("https://www.pinclipart.com/picdir/big/108-1086850_fused-bomb-emblem-bo-ww2-clipart-bomb-png.png")
  }

  function setup(p5, parent) {
    p5.createCanvas(window.innerWidth, window.innerHeight).parent(parent)
    video = p5.createCapture(p5.VIDEO).parent(parent)
    video.size(window.innerWidth, window.innerHeight)
    video.hide()
    poseNet = ml5.poseNet(video, modelLoaded)
    poseNet.on('pose', gotPoses)
  }

  function gotPoses(poses) {
    //console.log(poses);
    if (poses.length > 0) {
      pose = poses[0].pose
      skeleton = poses[0].skeleton
    }
    // handKeypoints = createHandKeypoint(pose.keypoints)
  }

  function modelLoaded() {
    console.log('poseNet ready')
  }

  function draw(p5) {
    if(Math.random() >= 0.9){
      fruits.push(new Fruit(p5, video, fruit_png))
    }
    p5.push()
    p5.translate(video.width,0)
    p5.scale(-1,1)
    p5.image(video, 0, 0, window.innerWidth, window.innerHeight);
    // p5.image(icon, 0, 0, 50, 50)
    // p5.scale(-1.0,1.0);
    if (pose) {
      // console.log(handKeypoints.letfHandKeypoints, 'ini keypoint tangan kiri')
      // console.log(handKeypoints.rightHandKeypoints, 'ini keypoint tangan kanan')
      // p5.image(fruit_1, 0, 0, 50, 50)
      
      // p5.fill(255, 0, 0)
      // if(!calibrate_left){
      //   p5.ellipse(640-80, 0+80, 60, 60)
      // }
      // if(!calibrate_right){
      //   p5.ellipse(0+80, 0+80, 60, 60)
      // }

      // for (let i = 0; i < pose.keypoints.length; i++) {
      //   let x = pose.keypoints[i].position.x;
      //   let y = pose.keypoints[i].position.y;
      //   // if(pose.leftWrist.x == 640-80 && pose.leftWrist.y == 0+80){
      //   //   calibrate_left = true
      //   // }
      //   p5.fill(0, 255, 0);
      //   p5.ellipse(x, y, 16, 16);
      // }

      let x_leftWrist = pose.leftWrist.x
      let y_leftWrist = pose.leftWrist.y
      // p5.fill(0, 255, 0)
      // p5.ellipse(x_leftWrist, y_leftWrist, 50, 50)
      
      let x_rightWrist = pose.rightWrist.x
      let y_rightWrist = pose.rightWrist.y
      // p5.fill(0, 255, 0)
      // p5.ellipse(x_rightWrist, y_rightWrist, 50, 50)

      for(let fruit of fruits){
        fruit.show()
        fruit.move()
        if( collideCircle(x_leftWrist, y_leftWrist, 50, fruit.x, fruit.y, fruit.diameter) ){
          fruit.unShow()
          score += 10
        }
  
        if( collideCircle(x_rightWrist, y_rightWrist, 50, fruit.x, fruit.y, fruit.diameter) ){
          fruit.unShow()
          score += 10
        }

        // if(fruit.x > (video.width + fruit.diameter) || fruit.x < (0 - fruit.diameter)){

        // }
      }

      // if( collideCircle(x_leftWrist, y_leftWrist, 50, 640-80, 0+80, 60) ){
      //   // calibrate_left = true
      // }

      // if( collideCircle(x_rightWrist, y_rightWrist, 50, 0+80, 0+80, 60) ){
      //   // calibrate_right = true
      // }

      // if(handKeypoints.letfHandKeypoints == undefined){
      //   // handKeypoints = {...handKeypoints, letfHandKeypoints: {
      //   //   x: 1000,
      //   //   y: 1000
      //   // }}
      // }

      // if(handKeypoints.rightHandKeypoints == undefined){
      //   // handKeypoints = {...handKeypoints, rightHandKeypoints: {
      //   //   x: 1000,
      //   //   y: 1000
      //   // }}
      // }

      // let x_leftWrist = handKeypoints.letfHandKeypoints.x
      // let y_leftWrist = handKeypoints.letfHandKeypoints.y
      // p5.fill(0, 255, 0)
      // p5.ellipse(x_leftWrist, y_leftWrist, 50, 50)
      
      // let x_rightWrist = handKeypoints.rightHandKeypoints.x
      // let y_rightWrist = handKeypoints.rightHandKeypoints.y
      // p5.fill(0, 255, 0)
      // p5.ellipse(x_rightWrist, y_rightWrist, 50, 50)

      // for(let fruit of fruits){
      //   fruit.show()
      //   fruit.move()
      //   if( collideCircle(x_leftWrist, y_leftWrist, 50, fruit.x, fruit.y, fruit.diameter) ){
      //     fruit.unShow()
      //     score += 10
      //   }
  
      //   if( collideCircle(x_rightWrist, y_rightWrist, 50, fruit.x, fruit.y, fruit.diameter) ){
      //     fruit.unShow()
      //     score += 10
      //   }

      //   // if(fruit.x > (video.width + fruit.diameter) || fruit.x < (0 - fruit.diameter)){

      //   // }
      // }
      
      for (let i = 0; i < skeleton.length; i++) {
        let a = skeleton[i][0]
        let b = skeleton[i][1]
        p5.strokeWeight(2)
        p5.stroke(255)
        p5.line(a.position.x, a.position.y, b.position.x, b.position.y)
      }

    }
    p5.pop()

    if(pose){
      p5.textSize(50)
      p5.fill(51)
      // p5.textAlign(p5.CENTER, p5.CENTER);
      p5.text(`Score: ${score}`, 0, 50)
    }
  }

  return (
    <div className="App">
      <div>
        <Sketch preload={preload} setup={setup} draw={draw} />
      </div>
    </div>
  );
}

export default App;
