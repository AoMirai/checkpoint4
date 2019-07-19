const intitialState = {
  citys: [],
  loading: false,
  error: '',
}

const citys = (state = intitialState, action) => {
  switch(action.type) {
    case 'START_FETCH_CITY': {
      return {
        ...state,
        loading: true
      }
    }
    case 'FETCH_SUCCESS_CITY': {
      return {
        ...state,
        citys: action.citys,
        loading: false,
        error: ''
      }
    }
    case 'FETCH_ERROR_CITY' :{
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
export default citys;