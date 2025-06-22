# Offline Payment Ecosystem

### By Team Apokolips Amazon HackOn (Season 5)

## Category: Smart Payment Optimization

---

### The Problem

In semi-urban and rural areas, digital payments suffer due to:

- Lack of stable internet causing transaction failures.
- Delayed fraud detection, especially when backend checks aren't instantly reachable.
- High failure rates during bank server downtimes or poor connectivity.
- Slow payment processing from inefficient gateway routing.
- No current method for secure offline transactions or intelligent payment routing.

This results in:

- Lost sales opportunities, especially for small vendors and ground workers.
- High operational friction, leaving entire regions digitally excluded.

### Our Solution

A mesh-network-based offline digital payments ecosystem, combining:

- Blockchain-powered store & forward for syncing transactions from offline devices.
- Mesh networking (Bluetooth/Wi-Fi Direct/NFC) to relay transactions securely until they reach an internet node.
- Client-side ML fraud detection that works even offline using lightweight TensorFlow Lite + Isolation Forest models.
- AI-powered payment routing based on gateway success rate, transaction costs, and user preferences.

This enables seamless, secure, and fast transactions—even without internet.

---

### Algorithms Implemented

| Model | Purpose | Tech Stack |
|-------|---------|------------|
| Fraud Detection (TFLite + IF) | Detect malicious transaction patterns locally and flag risks before backend validation. | TensorFlow Lite, Scikit-Learn, Isolation Forest |
| Dynamic Payment Router | Selects best gateway route using ML + user reward preferences. | FastAPI, gRPC, NumPy, Pandas, Custom Scoring |

---

### System Architecture & Technology Stack

**Frontend**
- React Native + Nativewind for UI
- SecureStore for local key management

**Backend**
- Node.js + Express
- gRPC microservices for fast inter-service comm
- AWS Lambda for async compute

**Database & Infra**
- PostgreSQL with Prisma ORM
- Redis Queue for transaction pipeline
- Blockchain (Merkle Tree + ECDSA) for offline ledger

**AI/ML**
- FastAPI for model APIs
- TensorFlow Lite, Isolation Forest
- Real-time fraud scoring and route optimization

---

### Getting Started

#### **Prerequisites**
- Node.js and npm
- Expo Go 

#### **Installation**

1. **Clone the repository**
   ```bash
   git clone https://github.com/IshaanMinocha/offline-payment-ecosystem.git
   cd offline-payment-ecosystem/app
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start the development server**
   ```bash
   npm run start
   ```
   Scan the QR code with Expo Go app to open the app in your phone.

---

Thank you!