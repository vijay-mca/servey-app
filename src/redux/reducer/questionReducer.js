import {
  GET_QUESTIONS,
  LOADING,
  CREATE_QUESTION,
  ERROR,
  VIEW_QUESTIONS,
  OPEN_RESULT_MODAL,
  VIEW_RESULT,
} from "../types";

const initialState = {
  questionList: [],
  questions: [],
  questionResult: [],
  totalCount: 0,
  errorType: "",
  errorMessage: "",
  openResultModal: false,
  loading: false,
};

export default (state = initialState, { type, payload }) => {
  switch (type) {
    case GET_QUESTIONS:
      return {
        ...state,
        questionList: payload,
      };

    case CREATE_QUESTION:
      return {
        ...state,
        errorType: payload.errorType,
        errorMessage: payload.errorMessage,
      };

    case VIEW_QUESTIONS:
      return {
        ...state,
        questions: payload,
      };

    case VIEW_RESULT:
      return {
        ...state,
        questionResult: payload.result,
        totalCount: payload.total_user_answer_count,
      };

    case OPEN_RESULT_MODAL:
      return {
        ...state,
        openResultModal: payload,
      };

    case ERROR:
      return {
        ...state,
        errorType: payload.errorType,
        errorMessage: payload.errorMessage,
      };

    case LOADING:
      return {
        ...state,
        loading: payload,
      };

    default:
      return state;
  }
};
