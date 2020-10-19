import { LOGIN, LOADING } from "../types";

const initialState = {
  authenticate: false,
  invalidAuth: "",
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN:
      if (payload === true) {
        return { ...state, authenticate: payload, invalidAuth: "" };
      } else {
        return {
          ...state,
          authenticate: payload,
          invalidAuth: "Invalid username or password",
        };
      }

    case LOADING:
      return {
        ...state,
        loading: payload,
      };

    default:
      return state;
  }
};
