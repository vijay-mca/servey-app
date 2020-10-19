const { LOGIN, LOADING } = require("../types");

export const login = (userName, password, redirect) => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      if (userName === "admin" && password === "admin") {
        dispatch({
          type: LOGIN,
          payload: true,
        });
        redirect.push("/viewquestion");
      } else {
        dispatch({
          type: LOGIN,
          payload: false,
        });
      }
      dispatch(setLoading(false));
    } catch (error) {
      dispatch(setLoading(false));
      alert(error.message);
    }
  };
};

export const logout = () => {
  return async (dispatch) => {
    try {
      dispatch(setLoading(true));
      dispatch({
        type: LOGIN,
        payload: false,
      });
    } catch (error) {
      dispatch(setLoading(false));
      alert(error.message);
    }
  };
};

export const setLoading = (payload) => {
  return {
    type: LOADING,
    payload,
  };
};
