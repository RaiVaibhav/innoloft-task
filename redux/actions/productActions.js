//Action Types
export const GET_PRODUCT = "GET_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const GET_TRL = "GET_TRL";
export const SET_IS_EDITED = "SET_IS_EDITED";

//Action Creator
export const getProduct = () => ({
  type: GET_PRODUCT,
});

export const getTrl = () => ({
  type: GET_TRL,
});

export const updateProduct = () => ({
  type: UPDATE_PRODUCT,
});

export const setIsEdited = () => ({
  type: SET_IS_EDITED,
});

