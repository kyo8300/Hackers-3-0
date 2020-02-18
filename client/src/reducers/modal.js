import { SHOW_MODAL, HIDE_MODAL } from '../actions/types';

const initialState = {
  modalType: false
};

export default function(state = initialState, action) {
  const { type } = action;
  switch (type) {
    case SHOW_MODAL:
      return {
        ...state,
        modalType: true
      };
    case HIDE_MODAL:
      return {
        ...state,
        modalType: false
      };
    default:
      return state;
  }
}
