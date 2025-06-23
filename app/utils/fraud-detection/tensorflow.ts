import * as tf from '@tensorflow/tfjs';
import '@tensorflow/tfjs-react-native';

export async function initTF() {
  try {
    await tf.ready();
    console.log('TensorFlow ready!');
  } catch (error) {
    console.error('TensorFlow initialization failed:', error);
    throw error;
  }
}
