import { createStore } from "redux";
import { UserReducer } from "./reducer";

export const Store = createStore(UserReducer);