import type { Server, ServerWebSocket } from "bun";
import { Kafka, logLevel } from "kafkajs";

const kafka = new Kafka({
  clientId: "web-socket-server",
  brokers: ["localhost:9092"], // Update this with the address of your Kafka broker
  logLevel: logLevel.INFO,
});

const consumer = kafka.consumer({ groupId: "my-group" });
const topic = "postgres.public.Todo";

console.log(process.env);
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
      ws.publish("update", `received message`);
    },
    open(ws) {
      console.log("connection opened");
      console.log(JSON.stringify(wsServer, null, 2));
      const msg = ` has entered the chat`;
      ws.subscribe("the-group-chat");
      wsServer.publish("the-group-chat", msg);
    },
    close(ws) {
      console.log("connection closed");
      const msg = ` has left the chat`;
      wsServer.publish("the-group-chat", msg);
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
          console.log("*** No wsServer ***");
        } else {
          console.log("HERE asdfasdf31123412412df@");

          wsServer?.publish(
            "updates",
            `Received message on topic ${topic}, partition ${partition}: ${payload}`
          );
        }
      }
    },
  });
}

intiKafka().catch(console.error);
console.log("Web Socket server started on port ", wsServer.port);
