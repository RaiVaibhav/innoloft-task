import {
  GET_PRODUCT,
  UPDATE_PRODUCT,
  GET_TRL,
  SET_IS_EDITED,
} from "../actions/productActions";
import { HYDRATE } from "next-redux-wrapper";

const productReducer = (
  state = { product: "init", trl: "init", isEdited: false },
  action
) => {
  switch (action.type) {
    case HYDRATE:
      if (action.payload.product === "init") delete action.payload.product;
      if (action.payload.trl === "init") delete action.payload.trl;
      if (action.payload.isEdited === false) delete action.payload.isEdited;
      return { ...state, ...action.payload };
    case GET_PRODUCT:
      return { ...state, product: action.payload };
    case UPDATE_PRODUCT:
      return { ...state, product: action.payload };
    case GET_TRL:
      return { ...state, trl: action.payload };
    case SET_IS_EDITED:
      return { ...state, isEdited: action.payload };
    default:
      return { ...state };
  }
};

export default productReducer;
