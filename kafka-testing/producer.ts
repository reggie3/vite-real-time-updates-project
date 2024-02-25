// producer.ts
import { Kafka, Producer } from "kafkajs";
import { PRODUCER_CLIENT_ID, TOPIC } from "./globals";

// Define Kafka broker(s)
const kafka = new Kafka({
  clientId: PRODUCER_CLIENT_ID,
  brokers: ["localhost:9092"], // Update with your Kafka broker(s) information
});

// Create a producer instance
const producer: Producer = kafka.producer();

// Define the topic to which messages will be sent
const topic: string = TOPIC;

// Function to send a timestamped message to the Kafka topic
const sendMessage = async (): Promise<void> => {
  const timestamp: string = new Date().toISOString();
  const message: string = `Message sent at ${timestamp}`;

  await producer.connect();
  await producer.send({
    topic,
    messages: [{ value: message }],
  });
  await producer.disconnect();

  console.log(`Message sent: ${message}`);
};

// Send a timestamped message every 5 seconds
setInterval(async () => {
  await sendMessage();
}, 5000);
