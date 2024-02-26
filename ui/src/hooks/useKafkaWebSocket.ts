import { useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

const useKafkaWebSocket = () => {
  const WS_URL = "ws://localhost:7789";

  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket(
    WS_URL,
    {
      share: false,
      shouldReconnect: () => true,
    }
  );

  // Run when the connection state (readyState) changes
  useEffect(() => {
    console.log("Connection state changed");
    if (readyState === ReadyState.OPEN) {
      sendJsonMessage({
        event: "subscribe",
        data: {
          username: "your-username",
          channel: "updates",
        },
      });
    }
  }, [readyState]);

  // Run when a new WebSocket message is received (lastJsonMessage)
  useEffect(() => {
    console.log(
      `Got a new message: ${JSON.stringify(lastJsonMessage, null, 2)}`
    );
  }, [lastJsonMessage]);
};

export default useKafkaWebSocket;
