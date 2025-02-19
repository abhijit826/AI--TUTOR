
export interface EmotionData {
  emotion: string;
  confidence: number;
  description: string;
  color: string;
}

export const emotionDescriptions: Record<string, Omit<EmotionData, 'confidence'>> = {
  attentive: {
    emotion: "Attentive",
    description: "You appear to be focused and engaged with the content.",
    color: "bg-green-500"
  },
  distracted: {
    emotion: "Distracted",
    description: "You seem to be losing focus. Try to concentrate more.",
    color: "bg-yellow-500"
  },
  tired: {
    emotion: "Tired",
    description: "You're showing signs of fatigue. Consider taking a short break.",
    color: "bg-red-500"
  },
  neutral: {
    emotion: "Neutral",
    description: "Your expression appears calm and balanced.",
    color: "bg-gray-500"
  }
};

const calculateEyeAspectRatio = (landmarks: any[], leftEyeIndices: number[], rightEyeIndices: number[]) => {
  try {
    // MediaPipe face mesh indices for eyes
    const leftEye = leftEyeIndices.map(index => landmarks[index]);
    const rightEye = rightEyeIndices.map(index => landmarks[index]);

    // Calculate vertical distances
    const leftEyeVertical = Math.abs(leftEye[1].y - leftEye[5].y);
    const rightEyeVertical = Math.abs(rightEye[1].y - rightEye[5].y);

    // Calculate horizontal distances
    const leftEyeHorizontal = Math.abs(leftEye[0].x - leftEye[3].x);
    const rightEyeHorizontal = Math.abs(rightEye[0].x - rightEye[3].x);

    // Calculate aspect ratios
    const leftRatio = leftEyeVertical / leftEyeHorizontal;
    const rightRatio = rightEyeVertical / rightEyeHorizontal;

    return (leftRatio + rightRatio) / 2;
  } catch (error) {
    console.error('Error calculating eye aspect ratio:', error);
    return 0.3; // Default value if calculation fails
  }
};

export const calculateAttention = (landmarks: any[]): number => {
  if (!landmarks || landmarks.length === 0) return 0.5;

  try {
    // MediaPipe face mesh indices for eyes and nose
    const leftEyeIndices = [33, 160, 158, 133, 153, 144];  // Example indices for left eye
    const rightEyeIndices = [362, 385, 387, 263, 373, 380]; // Example indices for right eye
    const noseIndex = 1; // Nose tip index

    // Calculate eye aspect ratio
    const eyeAspectRatio = calculateEyeAspectRatio(landmarks, leftEyeIndices, rightEyeIndices);

    // Check if face is facing camera using nose position
    const nose = landmarks[noseIndex];
    const isFacingCamera = nose ? Math.abs(nose.z) < 0.1 : true;

    // Calculate attention score
    let attention = 1.0;

    // Reduce attention if eyes are closed (low aspect ratio)
    if (eyeAspectRatio < 0.15) {
      attention -= 0.4;
      console.log('Eyes detected as closed, EAR:', eyeAspectRatio);
    }

    // Reduce attention if head is turned away
    if (!isFacingCamera) {
      attention -= 0.3;
      console.log('Head turned away from camera');
    }

    // Add logging for debugging
    console.log('Eye Aspect Ratio:', eyeAspectRatio);
    console.log('Calculated Attention:', attention);

    return Math.max(0, Math.min(1, attention));
  } catch (error) {
    console.error('Error calculating attention:', error);
    return 0.5;
  }
};

export const detectEmotion = (attention: number): { emotion: string; confidence: number } => {
  console.log('Detecting emotion with attention score:', attention);
  
  if (attention > 0.8) {
    return { emotion: 'attentive', confidence: attention };
  } else if (attention < 0.4) {
    return { emotion: 'distracted', confidence: 1 - attention };
  } else if (attention < 0.6) {
    return { emotion: 'tired', confidence: 0.7 };
  }
  return { emotion: 'neutral', confidence: 0.6 };
};