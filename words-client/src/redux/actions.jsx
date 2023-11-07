import axios from "axios";

export const LOGIN = "LOGIN";
export const GET_SECTIONS = "GET_SECTIONS";
export const UPDATE_SECTION = "UPDATE_SECTION";
export const LOGOUT = "LOGOUT";

export const login = (payload) => {
  return {
    type: LOGIN,
    payload: payload,
  };
};

export const getSections = (idUser) => async (dispatch) => {
  try {
    const response = await axios.get(`/seccion?idUser=${idUser}`);
    if (response.data) {
      dispatch({ type: GET_SECTIONS, payload: response.data });
    }
  } catch (error) {
    console.log(error);
  }
};

export const sectionUpdate = (payload) => {
  return {
    type: UPDATE_SECTION,
    payload: payload,
  };
};
export const logOut = () => {
  return {
    type: LOGOUT,
  };
};

export const DELETE_WORD = 'DELETE_WORD';

export const deleteWordAction = (wordId) => ({
  type: DELETE_WORD,
  payload: wordId,
});