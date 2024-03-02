import { DebeziumMessage, TableUpdate } from "../globalTypes";

export const isDebeziumMessage = (
  payload: unknown
): payload is DebeziumMessage => {
  return (
    typeof payload === "object" &&
    !!payload &&
    "schema" in payload &&
    "payload" in payload
  );
};

export const isTableUpdate = (payload: unknown): payload is TableUpdate => {
  return (
    typeof payload === "object" &&
    !!payload &&
    "tableName" in payload &&
    "newData" in payload
  );
};
