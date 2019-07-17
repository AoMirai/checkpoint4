const intitialState = {
  artists: [],
  loading: false,
  error: '',
}

const artists = (state = intitialState, action) => {
  switch(action.type) {

    //fetch artistes

    case 'START_FETCH_ARTISTS': {
      return {
        ...state,
        loading: true
      }
    }
    case 'FETCH_SUCCESS_ARTISTS': {
      return {
        ...state,
        artists: action.artists,
        loading: false,
        error: ''
      }
    }
    case 'FETCH_ERROR_ARTISTS' :{
      return {
        ...state,
        loading: false,
        error: action.err
      }
    }

    // Fetch list act par artist
    
    case 'START_FETCH_ARTIST_ACT': {
      return {
        ...state,
        loading: true
      }
    }
    case 'FETCH_SUCCESS_ARTIST_ACT': {
      const artists = state.artists.map(artist => {
        return artist.id === action.artistAct.idArtist ?  {...artist, acts: action.artistAct}: {...artist}
      });

      return {
        ...state,
        artists: artists,
        loading: false,
        error: ''
      }
    }
    case 'FETCH_ERROR_ARTIST_ACT' :{
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
export default artists;