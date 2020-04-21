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

export const findCoord = (bodypart, keypoints) => {
  const index = bodyPartIndex[bodypart];
  const coord = keypoints[index].position;
  return coord;
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
  // right arm angle down and right
  let angleR = Math.atan( Math.abs(rightArmDistance.yDiff) / Math.abs(rightArmDistance.xDiff) );
  // right arm angle down and left
  if (rightArmDistance.xDiff <= 0 && rightArmDistance.yDiff >= 0) angleR = Math.PI - angleR;
  // right arm angle up and left
  if (rightArmDistance.xDiff <= 0 && rightArmDistance.yDiff < 0) angleR = Math.PI + angleR;
  // right arm angle up and right
  if (rightArmDistance.xDiff > 0 && rightArmDistance.yDiff < 0) angleR = (Math.PI * 2) - angleR;

  const xDistanceR = Math.cos(angleR) * 125;
  const yDistanceR = Math.sin(angleR) * 125;

  const rightHandKeypoints = {
    y: rightWrist.y + yDistanceR,
    x: rightWrist.x + xDistanceR,
  };

  // left arm angle down and right
  let angleL = Math.atan( Math.abs(leftArmDistance.yDiff) / Math.abs(leftArmDistance.xDiff) );
  // right arm angle down and left
  if (leftArmDistance.xDiff <= 0 && leftArmDistance.yDiff >= 0) angleL = Math.PI - angleL;
  // right arm angle up and left
  if (leftArmDistance.xDiff <= 0 && leftArmDistance.yDiff < 0) angleL = Math.PI + angleL;
  // right arm angle up and right
  if (leftArmDistance.xDiff > 0 && leftArmDistance.yDiff < 0) angleL = (Math.PI * 2) - angleL;

  const xDistanceL = Math.cos(angleL) * 125;
  const yDistanceL = Math.sin(angleL) * 125;

  const letfHandKeypoints = {
    y: leftWrist.y + yDistanceL,
    x: leftWrist.x + xDistanceL,
  };

  return {
    rightHandKeypoints,
    letfHandKeypoints
  };
};
