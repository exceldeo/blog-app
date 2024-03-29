import { thunk } from "redux-thunk";
import { createLogger } from "redux-logger";

const middleware = [thunk, createLogger()];

export default middleware;
