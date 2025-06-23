import * as tf from '@tensorflow/tfjs';
import { bundleResourceIO } from '@tensorflow/tfjs-react-native';

export async function loadModel() {
  try {
    const modelJson = require('../../assets/fraud_detection_model/model.json');
    const modelWeights = [require('../../assets/fraud_detection_model/group1-shard1of1.bin')];

    const model = await tf.loadLayersModel(bundleResourceIO(modelJson, modelWeights));
    console.log('Model loaded!');
    return model;
  } catch (error) {
    console.error('Model loading failed:', error);
    throw error;
  }
}
