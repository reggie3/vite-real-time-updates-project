import type { Server, ServerWebSocket } from "bun";
import { Kafka, logLevel } from "kafkajs";
import { exit } from "process";

const kafka = new Kafka({
  clientId: "web-socket-server",
  brokers: ["localhost:9092"], // Update this with the address of your Kafka broker
  logLevel: logLevel.INFO,
});

const consumer = kafka.consumer({ groupId: "my-group" });
const topic = "postgres.public.Todo";
const updateChannel = process.env.VITE_WEB_SOCKET_UPDATE_CHANNEL;

if (!updateChannel) {
  console.error("VITE_WEB_SOCKET_UPDATE_CHANNEL is not set");
  exit(1);
}
console.log("updateChannel is", updateChannel);

const wsServer = Bun.serve({
  fetch(req, server) {
    // upgrade the request to a WebSocket
    if (server.upgrade(req)) {
      return; // do not return a Response
    }
    return new Response("Upgrade failed :(", { status: 500 });
  },
  port: process.env.WEB_SOCKET_PORT,
  websocket: {
    message: function (
      ws: ServerWebSocket<unknown>,
      message: string | Buffer
    ): void | Promise<void> {
      const messageString =
        typeof message === "string" ? message : message.toString();
      const parsedMessage = JSON.parse(messageString);
      if (parsedMessage.event === "subscribe") {
        ws.subscribe(updateChannel);
        console.log(messageString);
        ws.send(JSON.stringify({ message: "Subscribed" }));
      }
      ws.publish(updateChannel, message);
    },
    open(ws) {
      console.log("connection opened");
      console.log(JSON.stringify(wsServer, null, 2));

      ws.send(JSON.stringify({ mesage: ":wave: Hello there!" }));
      // wsServer?.publish(updateChannel, JSON.stringify({ message: "TEST" }));
    },
    close(ws) {
      console.log("connection closed");
    },
  }, // handlers
});

async function intiKafka() {
  await consumer.connect();
  await consumer.subscribe({ topic, fromBeginning: true });

  await consumer.run({
    eachMessage: async ({ topic, partition, message }) => {
      const payload = message.value?.toString();
      if (payload) {
        // console.log(`Received message on topic ${topic}`);
        // Handle the Kafka message as needed in your application
        if (!wsServer) {
          console.log("ERROR: wsServer is not set");
        }
        if (!updateChannel) {
          console.log("ERROR: updateChannel is not set");
        } else {
          console.log("publishing from ", topic, "to ", updateChannel);
          wsServer?.publish(
            updateChannel,
            JSON.stringify({
              message: `Received message on topic ${topic}, partition ${partition}: ${payload}`,
            })
          );
        }
      }
    },
  });
}

intiKafka().catch(console.error);
console.log("Web Socket server started on port ", wsServer.port);
