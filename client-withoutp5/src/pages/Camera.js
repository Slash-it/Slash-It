import React, { Component } from "react";
import * as posenet from "@tensorflow-models/posenet";
import { connect } from "react-redux";
import { drawKeyPoints, drawSkeleton, config } from "../helpers";
import { updateKeypoints, calibrate } from "../store/actions/keypoints";
import { createHandKeypoint } from "../helpers/extend";
import collideCircle from '../helpers/collideCircle';
import Sketch from "react-p5";
import FruitLeft from '../objects/fruitLeft';
import FruitRight from '../objects/fruitRight';

class PoseNet extends Component {
  static defaultProps = config;

  constructor(props) {
    super(props, PoseNet.defaultProps);
    this.state = {
      loading: true,
      fruits: [],
      boundary: 300,
      start: false,
    };
  }

  getCanvas = (elem) => {
    this.canvas = elem;
  };

  getVideo = (elem) => {
    this.video = elem;
  };

  getImage = (elem) => {
    this.fruit = elem;
  };
  getImage2 = (elem) => {
    this.fruit2 = elem;
  };

  async componentDidMount() {
    try {
      await this.setupCamera();
    } catch (error) {
      throw new Error(
        "This browser does not support video capture, or this device does not have a camera"
      );
    }

    try {
      this.posenetModel = await posenet.load();
    } catch (error) {
      throw new Error("posenet failed to load");
    } finally {
      setTimeout(() => {
        this.setState({ loading: false });
      }, 200);
    }

    this.detectPose();
  }

  async setupCamera() {
    if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
      throw new Error(
        "Browser API navigator.mediaDevices.getUserMedia not available"
      );
    }

    const video = this.video;
    video.width = this.props.width;
    video.height = this.props.height;

    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        audio: false,
        video: {
          facingMode: "user",
          width: this.props.width,
          height: this.props.height,
        },
      });
      video.srcObject = stream;
    } catch (error) {
      throw new Error("Failed to access webcam");
    }

    return new Promise((resolve) => {
      video.onloadedmetadata = () => {
        video.play();
        resolve(video);
      };
    });
  }

  detectPose() {
    const canvas = this.canvas;
    const canvasContext = canvas.getContext("2d");

    canvas.width = this.props.width;
    canvas.height = this.props.height;

    this.poseDetectionFrame(canvasContext);
  }

  poseDetectionFrame(canvasContext) {
    const {
      algorithm,
      imageScaleFactor,
      flipHorizontal,
      outputStride,
      minPoseConfidence,
      minPartConfidence,
      maxPoseDetections,
      nmsRadius,
      showVideo,
      showPoints,
      showSkeleton,
      skeletonColor,
      skeletonLineWidth,
    } = this.props;

    const posenetModel = this.posenetModel;
    const video = this.video;

    const poseDetectionFrameInner = async () => {
      let poses = [];

      switch (algorithm) {
        case "multi-pose": {
          poses = await posenetModel.estimateMultiplePoses(video, {
            imageScaleFactor,
            flipHorizontal,
            outputStride,
            maxPoseDetections,
            minPartConfidence,
            nmsRadius,
          });
          break;
        }
        case "single-pose": {
          const pose = await posenetModel.estimateSinglePose(video, {
            imageScaleFactor,
            flipHorizontal,
            outputStride,
          });
          poses.push(pose);
          break;
        }
        default: {
          const pose = await posenetModel.estimateSinglePose(video, {
            imageScaleFactor,
            flipHorizontal,
            outputStride,
          });
          poses.push(pose);
        }
      }

      canvasContext.clearRect(0, 0, this.props.width, this.props.height);

      if (showVideo) {
        canvasContext.save();
        canvasContext.scale(-1, 1);
        canvasContext.translate(-this.props.width, 0);
        canvasContext.drawImage(
          video,
          0,
          0,
          this.props.width,
          this.props.height
        );
        canvasContext.restore();
      }

      if (!this.props.calibrated && poses[0]) {
        if (poses[0].keypoints[1].score > minPartConfidence && poses[0].keypoints[11].score > minPartConfidence && poses[0].keypoints[13].score > minPartConfidence) {
          console.log('CALIBRATED!!!!');
          this.setState({ start: true });
          this.props.calibrate(poses[0]);
        }
      } else {
        poses.forEach(({ score, keypoints }) => {
          // update keypoint di state
          this.props.updateKeypoints(keypoints);
  
          const { letfHandKeypoints, rightHandKeypoints } = createHandKeypoint(keypoints);
          const newKeypointsL = [...keypoints, {
            position: letfHandKeypoints,
            part: 'leftHand',
            score: 0.99
          }];
          const newKeypointsR = [...newKeypointsL, {
            position: rightHandKeypoints,
            part: 'rightHand',
            score: 0.99
          }];
          const x1 = this.fruit.getBoundingClientRect().x
          const y1 = this.fruit.getBoundingClientRect().y
          const x2 = this.fruit2.getBoundingClientRect().x
          const y2 = this.fruit2.getBoundingClientRect().y
          if (letfHandKeypoints) {
            const collideLeft1 = collideCircle(letfHandKeypoints.x, letfHandKeypoints.y, 150, x1, y1, 150)
            const collideLeft2 = collideCircle(letfHandKeypoints.x, letfHandKeypoints.y, 150, x2, y2, 150)
            // const collideLeft = collideCircle(keypoints[9].position.x, keypoints[9].position.y, 150, x, y, 150);
            if (collideLeft1) {
              this.fruit.style.display = 'none';
            } else if (collideLeft2) {
              this.fruit2.style.display = 'none';
            }
  
            for(let fruit of this.state.fruits){
              if( collideCircle(letfHandKeypoints.x, letfHandKeypoints.y, 150, fruit.x, fruit.y, fruit.diameter) ){
                fruit.unShow()
              }
            }
          }
  
          if (rightHandKeypoints) {
            const collideRight1 = collideCircle(rightHandKeypoints.x, rightHandKeypoints.y, 150, x1, y1, 150)
            const collideRight2 = collideCircle(rightHandKeypoints.x, rightHandKeypoints.y, 150, x2, y2, 150)
            // const collideRight = collideCircle(keypoints[10].position.x, keypoints[10].position.y, 150, x, y, 150);
            if (collideRight1) {
              this.fruit.style.display = 'none';
            } else if (collideRight2) {
              this.fruit2.style.display = 'none';
            }
  
            for(let fruit of this.state.fruits){
              if( collideCircle(rightHandKeypoints.x, rightHandKeypoints.y, 150, fruit.x, fruit.y, fruit.diameter) ){
                fruit.unShow()
              }
            }
          }
  
          if (score >= minPoseConfidence) {
            if (showPoints) {
              drawKeyPoints(
                newKeypointsR,
                minPartConfidence,
                skeletonColor,
                canvasContext
              );
            }
            if (showSkeleton) {
              drawSkeleton(
                keypoints,
                minPartConfidence,
                skeletonColor,
                skeletonLineWidth,
                canvasContext
              );
            }
          }
        });
      }

      requestAnimationFrame(poseDetectionFrameInner);
    };
    poseDetectionFrameInner();
  }

  setup = (p5, canvasParentRef) => {
    p5.createCanvas(this.props.width, this.props.height).parent(canvasParentRef);
  }

  draw = (p5) => {
    p5.clear()
    if(Math.random() >= 0.96){
      this.state.fruits.push(new FruitLeft(p5, this.state.boundary))
    }
    if(Math.random() >= 0.96){
      this.state.fruits.push(new FruitRight(p5, this.state.boundary))
    }
    
    for(let fruit of this.state.fruits){
      fruit.show()
      fruit.move()
    }

    p5.fill(240, 0, 0)
    
    p5.rect(this.state.boundary, 0, 2, p5.height-5)
    p5.rect(p5.width - this.state.boundary, 0, 2, p5.height-5)
  }

  render() {
    const loading = this.state.loading ? <div>Loading....</div> : null;
    const startNow = this.state.start;
    return (
      <div className="centered">
        <div>{loading}</div>
        <div>
          <video id="videoNoShow" playsInline ref={this.getVideo} />
          {!loading && startNow ? <img src="/assets/Grapes.png" alt="" style={style} ref={this.getImage} className="image" /> : null }
          {!loading && startNow ? <img src="/assets/Grapes.png" alt="" style={style2} ref={this.getImage2} className="image" /> : null }
          <canvas className="webcam" ref={this.getCanvas} />
          {
            !loading && startNow ? 
            <Sketch setup={this.setup} draw={this.draw} />
            :
            null
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    calibrated: state.calibrated
  }
}

const mapDispatchToProps = (dispatch) => ({
  updateKeypoints: (keypoints) => {
    dispatch(updateKeypoints(keypoints));
  },

  calibrate: (calibratedPose) => {
    dispatch(calibrate(calibratedPose));
  },
});

const style = {
  position: 'absolute',
  top: 100,
  left: 100,
  width: 150,
  height: 150,
  zIndex: 888
}

const style2 = {
  position: 'absolute',
  top: 100,
  right: 100,
  width: 150,
  height: 150,
  zIndex: 888
}

export default connect(mapStateToProps, mapDispatchToProps)(PoseNet);
