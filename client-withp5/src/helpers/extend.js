const bodyPartIndex = {
  nose: 0,
  leftEye: 1,
  rightEye: 2,
  leftEar: 3,
  rightEar: 4,
  leftShoulder: 5,
  rightShoulder: 6,
  leftElbow: 7,
  rightElbow: 8,
  leftWrist: 9,
  rightWrist: 10,
  leftHip: 11,
  rightHip: 12,
  leftKnee: 13,
  rightKnee: 14,
  leftAnkle: 15,
  rightAnkle: 16
};

export const createHandKeypoint = (keypoints) => {
  const leftWristIndex = bodyPartIndex['leftWrist'];
  const leftElbowIndex = bodyPartIndex['leftElbow'];
  const rightWristIndex = bodyPartIndex['rightWrist'];
  const rightElbowIndex = bodyPartIndex['rightElbow'];

  // Coordinates
  const leftWrist = keypoints[leftWristIndex].position;
  const leftElbow = keypoints[leftElbowIndex].position;
  const rightWrist = keypoints[rightWristIndex].position;
  const rightElbow = keypoints[rightElbowIndex].position;

  // Coordinate distance between each wrist and elbow
  const rightArmDistance = {
    xDiff: rightWrist.x - rightElbow.x,
    yDiff: rightWrist.y - rightElbow.y
  };

  const leftArmDistance = {
    xDiff: leftWrist.x - leftElbow.x,
    yDiff: leftWrist.y - leftElbow.y
  };

  // Nearest angle from 0 rad which is right arm pointing down
  const rightDown = Math.atan(Math.abs(rightArmDistance.yDiff) / Math.abs(rightArmDistance.xDiff));
  const rightUp = (Math.PI * 2) - rightDown;

  const leftDown = Math.PI - Math.atan(Math.abs(leftArmDistance.yDiff) / Math.abs(leftArmDistance.xDiff));
  const leftUp = Math.PI + Math.atan(Math.abs(leftArmDistance.yDiff) / Math.abs(leftArmDistance.xDiff));

  // extending keypoint to right hand
  let rightHandKeypoints;
  if (rightArmDistance.xDiff >= 0 && rightArmDistance.yDiff >= 0) {
    const xDistanceRightDown = Math.cos(rightDown) * 65; // radius perkalian masih belum pasti 
    const yDistanceRightDown = Math.sin(rightDown) * 65; // radius perkalian masih belum pasti
    rightHandKeypoints = {
      x: rightWrist.x + xDistanceRightDown,
      y: rightWrist.y + yDistanceRightDown
    };
  } else if (rightArmDistance.xDiff > 0 && rightArmDistance.yDiff < 0) {
    const xDistanceRightUp = Math.cos(rightUp) * 65;
    const yDistanceRightUp = Math.sin(rightUp) * 65;
    rightHandKeypoints = {
      x: rightWrist.x + xDistanceRightUp,
      y: rightWrist.y + yDistanceRightUp
    };
  }

  let letfHandKeypoints;
  if (leftArmDistance.xDiff <= 0 && leftArmDistance.yDiff >= 0) {
    const xDistanceLeftDown = Math.cos(leftDown) * 65;
    const yDistanceLeftDown = Math.sin(leftDown) * 65;
    letfHandKeypoints = {
      x: leftWrist.x + xDistanceLeftDown,
      y: leftWrist.y + yDistanceLeftDown,
    };
  } else if (leftArmDistance.xDiff <= 0 && leftArmDistance.ydiff < 0) {
    const xDistanceLeftUp = Math.cos(leftUp) * 65;
    const yDistanceLeftUp = Math.sin(leftUp) * 65;
    letfHandKeypoints = {
      x: leftWrist.x + xDistanceLeftUp,
      y: leftWrist.y + yDistanceLeftUp
    };
  }

  return {
    rightHandKeypoints,
    letfHandKeypoints
  };
};
