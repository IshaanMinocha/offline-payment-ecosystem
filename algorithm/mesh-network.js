import { MinPriorityQueue } from "@datastructures-js/priority-queue";
import { createHash, randomUUID } from "crypto";

function secondsSince(dateStr) {
  return Math.floor((Date.now() - new Date(dateStr).getTime()) / 1000);
}

function signTransaction(tx, privateKey) {
  const raw = `${tx.tx_id}${tx.sender}${tx.recipient}${tx.amount}`;
  return createHash("sha256")
    .update(raw + privateKey)
    .digest("hex");
}

// Lower priority is better
function calculatePriority(device, distance) {
  const memoryScore = (1024 - device.memory_mb) / 1024;
  const timeScore = secondsSince(device.last_connected) / 3600;
  return 0.5 * distance + 0.3 * memoryScore + 0.2 * timeScore;
}

function buildMST(devices) {
  const edges = [];
  const deviceMap = Object.fromEntries(devices.map((d) => [d.name, d]));
  const inMST = new Set();
  const result = [];
  const pq = new MinPriorityQueue(({ priority }) => priority);

  const start = devices[0].name;
  inMST.add(start);
  for (const neighbor of deviceMap[start].neighbors) {
    if (deviceMap[neighbor.name])
      pq.enqueue({
        from: start,
        to: neighbor.name,
        priority: neighbor.distance,
      });
  }

  while (!pq.isEmpty() && result.length < devices.length - 1) {
    const { from, to, priority } = pq.dequeue();
    if (inMST.has(to)) continue;
    inMST.add(to);
    result.push({ from, to, distance: priority });

    for (const neighbor of deviceMap[to].neighbors) {
      if (!inMST.has(neighbor.name) && deviceMap[neighbor.name]) {
        pq.enqueue({
          from: to,
          to: neighbor.name,
          priority: neighbor.distance,
        });
      }
    }
  }

  return result;
}

function routeTransaction(devices, startDeviceName, transaction) {
  const deviceMap = Object.fromEntries(devices.map((d) => [d.name, d]));
  const visited = new Set();
  const pq = new MinPriorityQueue(({ priority }) => priority);

  pq.enqueue({ path: [startDeviceName], priority: 0 });

  while (!pq.isEmpty()) {
    const element = pq.dequeue();
    if (!element || !element.path) continue;

    const { path, priority } = element;
    const current = path[path.length - 1];
    if (visited.has(current)) continue;

    visited.add(current);
    const currentDevice = deviceMap[current];

    if (currentDevice.has_internet) {
      return {
        status: "DELIVERED",
        delivered_to: current,
        hops: path,
        transaction: { ...transaction, hops: path },
      };
    }

    for (const neighbor of currentDevice.neighbors) {
      if (!visited.has(neighbor.name)) {
        const neighborDevice = deviceMap[neighbor.name];
        const score = calculatePriority(neighborDevice, neighbor.distance);
        pq.enqueue({
          path: [...path, neighbor.name],
          priority: priority + score,
        });
      }
    }
  }

  // If no device with has_internet = true is reachable, check if any exist at all
  const anyOnlineNow = devices.some((d) => d.has_internet);
  if (!anyOnlineNow) {
    const topRecentlyConnected = devices
      .sort((a, b) => secondsSince(a.last_connected) - secondsSince(b.last_connected))
      .slice(0, 5);

    if (topRecentlyConnected.length >= 2) {
      return {
        status: "PENDING",
        reason: "No device is currently connected to the internet. Showing MST of top 5 most recently connected devices.",
        devices: topRecentlyConnected.map((d) => ({
          name: d.name,
          seconds_since_connected: secondsSince(d.last_connected),
        })),
        mst: buildMST(topRecentlyConnected),
        transaction: { ...transaction, hops: [] },
      };
    }

    return {
      status: "PENDING",
      reason: "No device is currently connected to the internet, and insufficient data to build MST.",
      transaction: { ...transaction, hops: [] },
    };
  }

  return {
    status: "PENDING",
    reason: "No route to currently internet-connected node could be found.",
    transaction: { ...transaction, hops: [] },
  };
}

// Sample input
const input = {
  devices: [
    {
      name: "DeviceA",
      has_internet: false,
      neighbors: [
        { name: "DeviceB", distance: 10 },
        { name: "DeviceC", distance: 5 },
      ],
      memory_mb: 512,
      last_connected: new Date(Date.now() - 2 * 3600 * 1000).toISOString(),
    },
    {
      name: "DeviceB",
      has_internet: false,
      neighbors: [
        { name: "DeviceA", distance: 10 },
        { name: "DeviceD", distance: 10 },
      ],
      memory_mb: 1024,
      last_connected: new Date(Date.now() - 1 * 3600 * 1000).toISOString(),
    },
    {
      name: "DeviceC",
      has_internet: false,
      neighbors: [
        { name: "DeviceA", distance: 5 },
        { name: "DeviceD", distance: 15 },
      ],
      memory_mb: 256,
      last_connected: new Date(Date.now() - 3 * 3600 * 1000).toISOString(),
    },
    {
      name: "DeviceD",
      has_internet: true, // Try toggling this to false for MST output
      neighbors: [
        { name: "DeviceB", distance: 10 },
        { name: "DeviceC", distance: 15 },
      ],
      memory_mb: 2048,
      last_connected: new Date(Date.now() - 500 * 1000).toISOString(), // 500 seconds ago
    },
    {
      name: "DeviceE",
      has_internet: false,
      neighbors: [
        { name: "DeviceD", distance: 10 },
      ],
      memory_mb: 768,
      last_connected: new Date(Date.now() - 300 * 1000).toISOString(), // 300 seconds ago
    },
  ],
  transaction: {
    sender: "DeviceA",
    recipient: "DeviceZ",
    amount: 20,
    private_key: "user_private_key",
  },
};

// Construct and sign transaction
const transaction = {
  tx_id: randomUUID(),
  sender: input.transaction.sender,
  recipient: input.transaction.recipient,
  amount: input.transaction.amount,
  signature: "",
  hops: [],
};
transaction.signature = signTransaction(
  transaction,
  input.transaction.private_key
);

const result = routeTransaction(
  input.devices,
  input.transaction.sender,
  transaction
);

console.log(JSON.stringify(result, null, 2));
