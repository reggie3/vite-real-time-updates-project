import { edenTreaty } from "@elysiajs/eden";
import type { App } from "../../server";

const restServerPort = import.meta.env.VITE_REST_SERVER_PORT || 3000;
const restClient = edenTreaty<App>(`http://localhost:${restServerPort}`);

export default restClient;
