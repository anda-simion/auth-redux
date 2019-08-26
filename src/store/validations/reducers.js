import { ADD_VALIDATION_ERRORS, REMOVE_VALIDATION_ERRORS } from "./types";

const initial_state = {};

const validationReducer = (state = initial_state, action) => {
  switch (action.type) {
    case ADD_VALIDATION_ERRORS:
      return {
        ...state,
        ...action.payload
      };
    case REMOVE_VALIDATION_ERRORS:
      return {};
    default:
      return state;
  }
};

export default validationReducer;
