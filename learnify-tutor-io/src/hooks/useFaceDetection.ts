
import { useState, useRef, useEffect } from "react";
import * as tf from '@tensorflow/tfjs';
import * as faceLandmarksDetection from '@tensorflow-models/face-landmarks-detection';
import { useToast } from "@/hooks/use-toast";
import { EmotionData, emotionDescriptions, calculateAttention, detectEmotion } from "@/utils/emotionUtils";
import Webcam from "react-webcam";

export interface FaceDetectionState {
  isActive: boolean;
  isLoading: boolean;
  emotion: EmotionData | null;
  attentionScore: number;
  emotionHistory: EmotionData[];
}

export const useFaceDetection = (onEmotionDetected?: (emotion: EmotionData) => void) => {
  const webcamRef = useRef<Webcam>(null);
  const modelRef = useRef<faceLandmarksDetection.FaceLandmarksDetector | null>(null);
  const [state, setState] = useState<FaceDetectionState>({
    isActive: false,
    isLoading: false,
    emotion: null,
    attentionScore: 0,
    emotionHistory: [],
  });
  const { toast } = useToast();

  const startAnalysis = async () => {
    setState(prev => ({ ...prev, isLoading: true }));
    try {
      await tf.ready();
      console.log("TensorFlow.js is ready");

      // Initialize the model with valid configuration options
      modelRef.current = await faceLandmarksDetection.createDetector(
        faceLandmarksDetection.SupportedModels.MediaPipeFaceMesh,
        {
          runtime: 'tfjs',
          refineLandmarks: true,
          maxFaces: 1
        }
      );

      console.log("Face detection model loaded");
      setState(prev => ({ ...prev, isActive: true }));
      runFacialAnalysis();
    } catch (error) {
      console.error('Error loading facial analysis:', error);
      toast({
        title: "Error",
        description: "Failed to start facial analysis. Please try again.",
        variant: "destructive",
      });
    }
    setState(prev => ({ ...prev, isLoading: false }));
  };

  const runFacialAnalysis = async () => {
    const detectFace = async () => {
      if (!webcamRef.current?.video || !modelRef.current || !state.isActive) return;

      try {
        const video = webcamRef.current.video;
        const predictions = await modelRef.current.estimateFaces(video);
        console.log("Face predictions:", predictions);

        if (predictions && predictions.length > 0) {
          const landmarks = predictions[0].keypoints;
          console.log("Face landmarks detected:", landmarks.length);

          const attention = calculateAttention(landmarks);
          console.log("Calculated attention score:", attention);

          const { emotion: detectedEmotion, confidence } = detectEmotion(attention);
          console.log("Detected emotion:", detectedEmotion, "with confidence:", confidence);

          const currentEmotion = {
            ...emotionDescriptions[detectedEmotion],
            confidence
          };

          setState(prev => ({
            ...prev,
            emotion: currentEmotion,
            attentionScore: attention,
            emotionHistory: [...prev.emotionHistory, currentEmotion]
          }));

          onEmotionDetected?.(currentEmotion);
        } else {
          console.log("No face detected in frame");
        }

        if (state.isActive) {
          requestAnimationFrame(detectFace);
        }
      } catch (error) {
        console.error('Error in facial analysis:', error);
      }
    };

    detectFace();
  };

  const stopAnalysis = () => {
    setState(prev => ({
      ...prev,
      isActive: false,
      emotion: null
    }));
  };

  useEffect(() => {
    return () => {
      stopAnalysis();
      if (modelRef.current) {
        modelRef.current = null;
      }
    };
  }, []);

  return {
    webcamRef,
    ...state,
    startAnalysis,
    stopAnalysis,
  };
};
