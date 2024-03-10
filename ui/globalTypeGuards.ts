import { Todo } from "./src/schema";
import { DebeziumMessage, TableUpdate } from "./globalTypes";

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

export const isTodo = (payload: unknown): payload is Todo => {
  return (
    typeof payload === "object" &&
    !!payload &&
    "title" in payload &&
    "description" in payload &&
    "assignee" in payload
  );
};
