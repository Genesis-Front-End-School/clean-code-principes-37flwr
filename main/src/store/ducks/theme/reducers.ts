import actions from './actionTypes';

const initialState = {
  theme: 'light',
  loading: false,
};

const reducer = (
  state = initialState,
  action: { type: string; payload: string }
) => {
  switch (action.type) {
    case actions.CHANGE_THEME:
      return {
        ...state,
        loading: true,
      };
    case actions.CHANGE_THEME_SUCCESS:
      return {
        ...state,
        theme: action.payload,
        loading: false,
      };
    case actions.API_ERROR:
      return {
        ...state,
        loading: false,
      };
    default:
      return state;
  }
};

export default reducer;
