export interface TableUpdate {
  tableName: string;
  newData: unknown;
  timeStampMilis: number;
}

export interface DebeziumMessage {
  schema: Schema;
  payload: Payload;
}

export interface Schema {
  type: string;
  fields: Field[];
  optional: boolean;
  name: string;
  version: number;
}

export interface Field {
  type: string;
  fields?: Field2[];
  optional: boolean;
  name?: string;
  field: string;
  version?: number;
}

export interface Field2 {
  type: string;
  optional: boolean;
  field: string;
  default: any;
  name?: string;
  version?: number;
  parameters?: Parameters;
}

export interface Parameters {
  allowed: string;
}

export interface Payload {
  before: any;
  after: After;
  source: Source;
  op: string;
  ts_ms: number;
  transaction: any;
}

export interface After {
  id: string;
  title: string;
  completed: boolean;
  createdAt: number;
  updatedAt: number;
  assignee: string;
  cost: number;
  creator: string;
  description: string;
  location: string;
}

export interface Source {
  version: string;
  connector: string;
  name: string;
  ts_ms: number;
  snapshot: string;
  db: string;
  sequence: string;
  schema: string;
  table: string;
  txId: number;
  lsn: number;
  xmin: any;
}
