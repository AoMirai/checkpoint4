export const startFetchArtists = () => ({
  type: 'START_FETCH_ARTISTS',
});
export const fetchSuccessArtists = (artists) => ({
  type: 'FETCH_SUCCESS_ARTISTS',
  artists,
});
export const fetchErrorArtists = err => ({
  type: 'FETCH_ERROR_ARTISTS',
  err
});

export const asyncFetchArtists = () => (dispatch) => {
  dispatch(startFetchArtists());
  fetch('http://localhost:5000/api/artist')
  .then(res => res.json())
  .then((artists) => {
    dispatch(fetchSuccessArtists(artists));
    for (let i = 0; i < artists.length; i++) {
      const artist = artists[i];
      dispatch(asyncFetchArtistAct(artist.id))
    }
  })
  .catch(() => {
    dispatch(fetchErrorArtists('Erreur lors du chargement des artistes'))
  })
};

export const startFetchArtistAct = () => ({
  type: 'START_FETCH_ARTIST_ACT',
});
export const fetchSuccessArtistAct = (artistAct) => ({
  type: 'FETCH_SUCCESS_ARTIST_ACT',
  artistAct,
});
export const fetchErrorArtistAct = err => ({
  type: 'FETCH_ERROR_ARTIST_ACT',
  err
});

export const asyncFetchArtistAct = (idArtist) => (dispatch) => {
  dispatch(startFetchArtistAct());
  fetch(`http://localhost:5000/api/artist/${idArtist}/act`)
    .then(res => res.json())
    .then((artistAct) => {
      dispatch(fetchSuccessArtistAct(artistAct));
    })
    .catch(() => {
      dispatch(fetchErrorArtistAct('Erreur lors du chargement des numéros de l\'artiste'));
    });
};
