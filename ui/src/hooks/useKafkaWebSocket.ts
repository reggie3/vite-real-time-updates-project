import { useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";

// Object.keys(import.meta.env).forEach((key) => {
//   console.log(`${key}: ${import.meta.env[key]}`);
// });

const useKafkaWebSocket = () => {
  const WS_URL = import.meta.env.VITE_WEB_SOCKET_URL || "";

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
          channel: import.meta.env.VITE_WEB_SOCKET_UPDATE_CHANNEL || "",
        },
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [readyState]);

  // Run when a new WebSocket message is received (lastJsonMessage)
  useEffect(() => {
    console.log(
      `Got a new message: ${JSON.stringify(lastJsonMessage, null, 2)}`
    );
  }, [lastJsonMessage]);
};

export default useKafkaWebSocket;
