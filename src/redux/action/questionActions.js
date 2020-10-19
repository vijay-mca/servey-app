import {
  GET_QUESTIONS,
  LOADING,
  ERROR,
  CREATE_QUESTION,
  VIEW_QUESTIONS,
  VIEW_RESULT,
  OPEN_RESULT_MODAL,
} from "../types";
import { API, REQUEST_HEADER } from "../../config/const";

export const createQuestion = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const req = await fetch(API, {
        method: "POST",
        headers: REQUEST_HEADER,
        body: JSON.stringify(payload),
      });

      const { status, message } = await req.json();

      dispatch({
        type: CREATE_QUESTION,
        payload: {
          errorType: status,
          errorMessage: message,
        },
      });

      dispatch(setLoading(false));
    } catch (error) {
      setLoading(false);
    }
  };
};

export const getQuestions = () => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      const post = {
        action: "Get Question & Answer",
      };
      const req = await fetch(API, {
        method: "POST",
        headers: REQUEST_HEADER,
        body: JSON.stringify(post),
      });
      const { quesAnsOpt } = await req.json();

      dispatch({
        type: GET_QUESTIONS,
        payload: quesAnsOpt,
      });

      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
    }
  };
};

export const saveQuestionAnswer = (
  ques_id,
  correctAnswer,
  ques_opt,
  ipAddress
) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      let post = JSON.stringify({
        action: "Save Answer",
        ques_id: Number(ques_id),
        correctAnswer,
        ques_opt,
        ipAddress,
      });

      const req = await fetch(API, {
        method: "POST",
        headers: REQUEST_HEADER,
        body: post,
      });

      const { status, message } = await req.json();

      dispatch({
        type: ERROR,
        payload: {
          errorType: status,
          errorMessage: message,
        },
      });
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      dispatch({
        type: ERROR,
        payload: {
          errorType: error.type,
          errorMessage: error.messsage,
        },
      });
      alert(error.message);
    }
  };
};

export const viewQuestions = () => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      let post = JSON.stringify({
        action: "View Questions",
      });

      const req = await fetch(API, {
        method: "POST",
        headers: REQUEST_HEADER,
        body: post,
      });

      const { status, message, questions } = await req.json();
      if (status === "success") {
        dispatch({
          type: VIEW_QUESTIONS,
          payload: questions,
        });
      } else {
        dispatch({
          type: ERROR,
          payload: {
            errorType: status,
            errorMessage: message,
          },
        });
      }
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      dispatch({
        type: ERROR,
        payload: {
          errorType: error.type,
          errorMessage: error.messsage,
        },
      });
      alert(error.message);
    }
  };
};

export const viewResult = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(false));
      const post = {
        action: "View Result",
        ques_id: payload,
      };

      const req = await fetch(API, {
        method: "POST",
        headers: REQUEST_HEADER,
        body: JSON.stringify(post),
      });

      const {
        status,
        message,
        result,
        total_user_answer_count,
      } = await req.json();

      if (status === "success") {
        dispatch({
          type: VIEW_RESULT,
          payload: { result, total_user_answer_count },
        });
      } else {
        alert(message);
      }
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
    }
  };
};

export const editQuestion = (payload) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(false));
      const post = {
        action: "Edit Question",
        ques_id: payload,
      };

      const req = await fetch(API, {
        method: "POST",
        headers: REQUEST_HEADER,
        body: JSON.stringify(post),
      });

      const { status, message, result } = await req.json();

      if (status === "success") {
        // dispatch({
        //   type: VIEW_RESULT,
        //   payload: { result, total_user_answer_count },
        // });
      } else {
        alert(message);
      }
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
    }
  };
};

export const openResultModal = (payload) => {
  return {
    type: OPEN_RESULT_MODAL,
    payload,
  };
};

export const setLoading = (payload) => {
  return {
    type: LOADING,
    payload,
  };
};
