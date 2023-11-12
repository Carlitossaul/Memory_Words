import {
  GET_SECTIONS,
  LOGIN,
  LOGOUT,
  UPDATE_SECTION,
  DELETE_WORD,
  GET300,
} from "./actions";

const initialState = {
  idUser: null,
  login: false,
  sections: [],
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case LOGIN:
      const { access, id } = payload;
      id && localStorage.setItem("idUser", JSON.stringify(id));

      return {
        ...state,
        login: access,
        idUser: id,
      };
    case GET_SECTIONS:
      return {
        ...state,
        sections: payload,
      };
    case UPDATE_SECTION:
      return {
        ...state,
        sections: payload,
      };
    case DELETE_WORD:
      const wordId = payload;
      const updatedSections = state.sections.map((section) => ({
        ...section,
        Words: section.Words.filter((word) => word.id !== wordId),
      }));

      return {
        ...state,
        sections: updatedSections,
      };
    case LOGOUT:
      return {
        ...state,
        sections: payload,
      };
    case GET300:
      return {
        ...state,
        sections: payload,
      };
    default:
      return {
        ...state,
        idUser: null,
        login: false,
        sections: [],
      };
  }
};

export default rootReducer;
