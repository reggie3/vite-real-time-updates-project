import { useEffect } from "react";
import useWebSocket, { ReadyState } from "react-use-websocket";
import { isDebeziumMessage, isTableUpdate } from "../../../globalTypeGuards";
import useQueryInvalidator from "./useQueryInvalidator";

const useKafkaWebSocket = () => {
  const invalidateQuery = useQueryInvalidator();
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
    console.log("Received message", lastJsonMessage);
    if (isDebeziumMessage(lastJsonMessage)) {
      // console.log("Received Debezium message", lastJsonMessage);
    } else if (isTableUpdate(lastJsonMessage)) {
      // console.log("Received table update", lastJsonMessage);
      invalidateQuery(lastJsonMessage.tableName);
    }
  }, [invalidateQuery, lastJsonMessage]);
};

export default useKafkaWebSocket;
