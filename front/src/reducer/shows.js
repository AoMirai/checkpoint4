const intitialState = {
  shows: [],
  loading: false,
  error: '',
}

const shows = (state = intitialState, action) => {
  switch(action.type) {
    case 'START_FETCH_SHOW': {
      return {
        ...state,
        loading: true
      }
    }
    case 'FETCH_SUCCESS_SHOW': {
      return {
        ...state,
        shows: action.shows,
        loading: false,
        error: ''
      }
    }
    case 'FETCH_ERROR_SHOW' :{
      return {
        ...state,
        loading: false,
        error: action.err
      }
    }
    default:
      return state;
  };
};
export default shows;