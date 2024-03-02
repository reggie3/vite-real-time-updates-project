// consumer.ts

// @ts-expect-error kafka has no exported member eachMessage
import { Kafka, Consumer, eachMessage } from "kafkajs";
import { CONSUMER_CLIENT_ID, TOPIC } from "./globals";

// Define Kafka broker(s)
const kafka = new Kafka({
  clientId: CONSUMER_CLIENT_ID,
  brokers: ["localhost:9092"], // Update with your Kafka broker(s) information
});

// Create a consumer instance
const consumer: Consumer = kafka.consumer({ groupId: "your-group-id" });

// Subscribe to the Kafka topic
const topic: string = TOPIC;
consumer.subscribe({ topic });

// Function to handle incoming messages
const handleMessage = async ({ message }: eachMessage): Promise<void> => {
  const timestamp: string = new Date().toISOString();
  console.log(`Received message: ${message.value?.toString()} at ${timestamp}`);
};

// Start the consumer and listen for messages
const runConsumer = async (): Promise<void> => {
  await consumer.connect();
  await consumer.run({ eachMessage: handleMessage });
};

// Run the Kafka consumer
runConsumer().catch(console.error);
