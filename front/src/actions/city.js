export const startFetchCity = () => ({
  type: 'START_FETCH_CITY',
});
export const fetchSuccessCity = (citys) => ({
  type: 'FETCH_SUCCESS_CITY',
  citys,
});
export const fetchErrorCity = err => ({
  type: 'FETCH_ERROR_CITY',
  err
});

export const asyncFetchCity = () => (dispatch) => {
  dispatch(startFetchCity());
  fetch('http://localhost:5000/api/city')
    .then(res => res.json())
    .then((citys) => {
      dispatch(fetchSuccessCity(citys));
    })
    .catch(() => {
      dispatch(fetchErrorCity('Erreur lors du chargement des villes'));
    })
};
