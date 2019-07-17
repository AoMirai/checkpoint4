export const startFetchActs = () => ({
  type: 'START_FETCH_ACTS',
});
export const fetchSuccessActs = (acts) => ({
  type: 'FETCH_SUCCESS_ACTS',
  acts,
});
export const fetchErrorActs = err => ({
  type: 'FETCH_ERROR_ACTS',
  err
});

export const asyncFetchActs = () => (dispatch) => {
  dispatch(startFetchActs());
  fetch('http://localhost:5000/api/act')
    .then(res => res.json())
    .then((acts) => {
      dispatch(fetchSuccessActs(acts));
      for (let i = 0; i < acts.length; i++) {
        const act = acts[i];
        dispatch(asyncFetchActArtists(act.id))
      }
    })
    .catch(() => {
      dispatch(fetchErrorActs('Erreur lors du chargement des numéros'));
    })
};

export const startFetchActArtists = () => ({
  type: 'START_FETCH_ACT_ARTISTS',
});
export const fetchSuccessActArtists = (actArtists) => ({
  type: 'FETCH_SUCCESS_ACT_ARTISTS',
  actArtists,
});
export const fetchErrorActArtists = err => ({
  type: 'FETCH_ERROR_ACT_ARTISTS',
  err
});

export const asyncFetchActArtists = (idAct) => (dispatch) => {
  dispatch(startFetchActArtists());
  fetch(`http://localhost:5000/api/act/${idAct}/artist`)
    .then(res => res.json())
    .then((actArtists) => {
      dispatch(fetchSuccessActArtists(actArtists));
    })
    .catch((err) => {
      dispatch(fetchErrorActArtists('Erreur lors du chargement des artistes du numéro'));
    });
};
