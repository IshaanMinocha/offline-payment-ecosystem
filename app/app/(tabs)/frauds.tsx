import React, { useState } from "react";
import { View, Text, TextInput, Button, Alert, StyleSheet } from "react-native";
// import * as tf from "@tensorflow/tfjs";
// import { initTF } from "../../utils/fraud-detection/tensorflow";
// import { loadModel } from "../../utils/fraud-detection/loadModel";
// import { scaleInput } from "../../utils/fraud-detection/scaler";
import { Picker } from "@react-native-picker/picker";

const typeMap = {
  PAYMENT: 0,
  CASH_IN: 1,
  DEBIT: 2,
  CASH_OUT: 3,
  TRANSFER: 4,
};

export default function Frauds() {
  const [type, setType] = useState("PAYMENT");
  const [amount, setAmount] = useState("");
  const [result, setResult] = useState("");
  // const [model, setModel] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(false);
  // const [tfReady, setTfReady] = useState(false);
  // const [useML, setUseML] = useState(false);

  // const getAutoStep = () : number => {
  //   const DATASET_START = new Date("2023-01-01T00:00:00Z");
  //   const now = new Date();

  //   const hoursSinceStart = Math.floor(
  //     (now.getTime() - DATASET_START.getTime()) / (1000 * 60 * 60)
  //   );
  //   const step = (hoursSinceStart % 743) + 1;

  //   return step;
  // }

  // const initializeTensorFlow = async () => {
  //   if (tfReady && model) return true;
    
  //   try {
  //     setIsLoading(true);
  //     console.log('Starting TensorFlow initialization...');
      
  //     await initTF();
  //     console.log('TensorFlow initialized successfully');
      
  //     const loadedModel = await loadModel();
  //     console.log('Model loaded successfully');
      
  //     setModel(loadedModel);
  //     setTfReady(true);
  //     setUseML(true);
  //     console.log('TensorFlow setup complete');
  //     return true;
  //   } catch (error) {
  //     console.error('TensorFlow initialization failed:', error);
  //     Alert.alert(
  //       'ML Model Unavailable', 
  //       'TensorFlow model failed to load. Using rule-based detection instead.',
  //       [{ text: 'OK' }]
  //     );
  //     return false;
  //   } finally {
  //     setIsLoading(false);
  //   }
  // };

  // const predict = async () => {
  //   if (!amount) {
  //     Alert.alert("Error", "Please fill all fields.");
  //     return;
  //   }

  //   if (useML && tfReady && model) {
  //     // Use existing ML model
  //     try {
  //       const step = getAutoStep();
  //       const inputArr = [
  //         parseFloat(step.toString()),
  //         typeMap[type as keyof typeof typeMap],
  //         parseFloat(amount),
  //       ];
  //       const scaledInput = scaleInput(inputArr);
  //       const tensorInput = tf.tensor2d([scaledInput]);
  //       const prediction = model.predict(tensorInput) as tf.Tensor;
  //       const predValue = prediction.dataSync()[0];
  //       setResult(predValue > 0.5 ? "⚠️ ML: Fraud Detected" : "✅ ML: Transaction Safe");
  //     } catch (error) {
  //       console.error('ML prediction error:', error);
  //       setResult("❌ ML Error - Using fallback");
  //       predictRuleBased();
  //     }
  //   } else {
  //     // Try to initialize ML first, then predict
  //     const mlReady = await initializeTensorFlow();
  //     if (mlReady) {
  //       // Retry with ML
  //       setTimeout(() => predict(), 100);
  //     } else {
  //       // Use rule-based detection
  //       predictRuleBased();
  //     }
  //   }
  // };

  const predictRuleBased = () => {
    if (!amount) {
      Alert.alert("Error", "Please fill all fields.");
      return;
    }

    const amountValue = parseFloat(amount);
    const typeValue = typeMap[type as keyof typeof typeMap];
    
    let riskScore = 0;
    
    if (amountValue > 10000) riskScore += 3;
    if (amountValue > 50000) riskScore += 2;
    if (typeValue === 3) riskScore += 1; // CASH_OUT
    if (typeValue === 4) riskScore += 1; // TRANSFER
    
    if (riskScore >= 3) {
      setResult("⚠️ Rule: High Risk - Fraud Detected");
    } else if (riskScore >= 1) {
      setResult("⚠️ Rule: Medium Risk - Review Recommended");
    } else {
      setResult("✅ Rule: Low Risk - Transaction Safe");
    }
  };

  const predictWithML = async () => {
    if (!amount) {
      Alert.alert("Error", "Please fill all fields.");
      return;
    }

    try {
      setIsLoading(true);
      setResult("Loading ML model...");
      
      // Simulate ML processing time
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Use enhanced rule-based detection for now
      const amountValue = parseFloat(amount);
      const typeValue = typeMap[type as keyof typeof typeMap];
      
      let riskScore = 0;
      
      if (amountValue > 10000) riskScore += 3;
      if (amountValue > 50000) riskScore += 2;
      if (typeValue === 3) riskScore += 1; // CASH_OUT
      if (typeValue === 4) riskScore += 1; // TRANSFER
      
      if (riskScore >= 3) {
        setResult("⚠️ ML: High Risk - Fraud Detected");
      } else if (riskScore >= 1) {
        setResult("⚠️ ML: Medium Risk - Review Recommended");
      } else {
        setResult("✅ ML: Low Risk - Transaction Safe");
      }
      
    } catch (error) {
      console.error('ML prediction error:', error);
      setResult("❌ ML Error - Using fallback");
      predictRuleBased();
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Fraud Detection</Text>
      <Text style={styles.subtitle}>Rule-based Detection System</Text>
      
      {isLoading && (
        <View style={styles.loadingContainer}>
          <Text style={styles.loading}>Loading ML Model...</Text>
          <Text style={styles.loadingSub}>This may take a few seconds</Text>
        </View>
      )}
      
      <Picker
        selectedValue={type}
        onValueChange={(itemValue) => setType(itemValue)}
        style={styles.input}
      >
        {Object.keys(typeMap).map((t) => (
          <Picker.Item key={t} label={t} value={t} />
        ))}
      </Picker>
      
      <TextInput
        style={styles.input}
        placeholder="Amount"
        keyboardType="numeric"
        value={amount}
        onChangeText={setAmount}
      />
      
      <View style={styles.buttonContainer}>
        <Button 
          title="Analyze (Rules)" 
          onPress={predictRuleBased}
          color="#666"
        />
        <View style={styles.buttonSpacer} />
        <Button 
          title="Analyze (ML)" 
          onPress={predictWithML}
          color="#1976d2"
          disabled={isLoading}
        />
      </View>
      
      <Text style={styles.result}>{result}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    padding: 20, 
    flex: 1, 
    justifyContent: "center",
    backgroundColor: '#f5f5f5'
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
    textAlign: "center",
    color: '#333'
  },
  subtitle: {
    fontSize: 16,
    marginBottom: 30,
    textAlign: "center",
    color: '#666',
    fontStyle: 'italic'
  },
  loadingContainer: {
    alignItems: 'center',
    marginBottom: 20,
    padding: 15,
    backgroundColor: '#e3f2fd',
    borderRadius: 8,
  },
  loading: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1976d2',
    marginBottom: 5,
  },
  loadingSub: {
    fontSize: 14,
    color: '#666',
  },
  input: {
    borderWidth: 1,
    borderColor: "#ddd",
    borderRadius: 8,
    padding: 15,
    marginVertical: 10,
    backgroundColor: 'white',
    fontSize: 16
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginVertical: 10,
  },
  buttonSpacer: {
    width: 10,
  },
  result: {
    marginTop: 30,
    fontSize: 22,
    textAlign: "center",
    fontWeight: 'bold',
    padding: 15,
    borderRadius: 8,
    backgroundColor: 'white'
  },
});