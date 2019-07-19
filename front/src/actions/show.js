export const startFetchShow = () => ({
  type: 'START_FETCH_SHOW',
});
export const fetchSuccessShow = (shows) => ({
  type: 'FETCH_SUCCESS_SHOW',
  shows,
});
export const fetchErrorShow = err => ({
  type: 'FETCH_ERROR_SHOW',
  err
});

export const asyncFetchShow = () => (dispatch) => {
  dispatch(startFetchShow());
  fetch('http://localhost:5000/api/show')
    .then(res => res.json())
    .then((shows) => {
      dispatch(fetchSuccessShow(shows));
    })
    .catch(() => {
      dispatch(fetchErrorShow('Erreur lors du chargement des représentations'));
    })
};
