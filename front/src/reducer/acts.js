const intitialState = {
  acts: [],
  loading: false,
  error: '',
}

const acts = (state = intitialState, action) => {
  switch(action.type) {

    //fetch acts
    
    case 'START_FETCH_ACTS': {
      return {
        ...state,
        loading: true
      }
    }
    case 'FETCH_SUCCESS_ACTS': {
      return {
        ...state,
        acts: action.acts,
        loading: false,
        error: ''
      }
    }
    case 'FETCH_ERROR_ACTS' :{
      return {
        ...state,
        loading: false,
        error: action.err
      }
    }

    // Fetch list artists par act

    case 'START_FETCH_ACT_ARTISTS': {
      console.log(state.acts);
      return {
        ...state,
        loading: true
      }
    }
    case 'FETCH_SUCCESS_ACT_ARTISTS': {
      const acts = state.acts.map(act => {
        return act.id === action.actArtists[0].idAct ?  {...act, artists: action.actArtists}: {...act}
      });
      return {
        ...state,
        acts: acts,
        loading: false,
        error: ''
      }
    }
    case 'FETCH_ERROR_ACT_ARTISTS' :{
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
export default acts;