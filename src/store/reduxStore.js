import { createStore } from "redux";

const initialState = {
  biddings: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD":
      return { ...state, biddings: [...state.biddings, action.payload] };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;
