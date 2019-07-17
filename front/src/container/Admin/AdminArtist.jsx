import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NotificationManager } from 'react-notifications';
import { asyncFetchArtists, asyncFetchArtistAct } from '../../actions/artists'


class AdminArtist extends Component {
  constructor(props) {
    super(props);
    const { firstname, lastname } = this.props
    this.state = {
      collapse: false,
      firstname,
      lastname,
      idAct: 1,
    }
  }

  toggle = () => {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  submitForm = (event) => {
    event.preventDefault();
    const { asyncFetchArtists, id } = this.props;
    const { collapse, idAct, ...artist } = this.state;
    fetch(`http://localhost:5000/api/artist/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(artist)
    })
      .then(() => {
        NotificationManager.success('', `Enregistement de ${artist.firstname} ${artist.lastname}`, 2000);
        this.toggle();
        asyncFetchArtists();

      })
      .catch((err) => {
        console.log(err);
        NotificationManager.error('', "Erreur lors de l'entregristement de l'artiste.", 3000);
        throw new Error();
      });
  }

  addActArtist = () => {
    const { asyncFetchArtists, id } = this.props;
    const { idAct } = this.state;
    const artist = {id_artist: id, id_act: idAct};
    fetch(`http://localhost:5000/api/act/artist`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(artist)
    })
      .then(() => {
        NotificationManager.success('', `Enregistement de l'association du numéro à ${artist.firstname} ${artist.lastname}`, 2000);
        this.toggle();
        asyncFetchArtists();

      })
      .catch((err) => {
        console.log(err);
        NotificationManager.error('', "Erreur lors de l'entregristement de l'association.", 3000);
        throw new Error();
      });
  }

  supprActArtist = () => {
    const { asyncFetchArtists, id } = this.props;
    const { idAct } = this.state;
    const artist = {id_artist: id, id_act: idAct};
    fetch(`http://localhost:5000/api/act/${idAct}/artist/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(artist)
    })
      .then(() => {
        NotificationManager.success('', `Suppression de l'association du numéro à ${artist.firstname} ${artist.lastname}`, 2000);
        this.toggle();
        asyncFetchArtists();

      })
      .catch((err) => {
        console.log(err);
        NotificationManager.error('', "Erreur lors de la suppression de l'association.", 3000);
        throw new Error();
      });
  }

  render() {
    const { acts, artistActs } = this.props
    const { firstname, lastname } = this.state
    const { collapse } = this.state
    return (
      <div className="AdminArtist">
        {
          collapse ?
            <form onSubmit={this.submitForm}>
              <input
                type="text"
                id="firstname"
                name="firstname"
                value={firstname}
                onChange={this.handleChange}
              />
              <input
                type="text"
                id="lastname"
                name="lastname"
                value={lastname}
                onChange={this.handleChange}
              />
              <button type="submit">Enregistrer</button>
              <button onClick={this.toggle}>Annuler</button>

            </form>
            :
            <h4>
              {firstname}
              {' '}
              {lastname}
              <button onClick={this.toggle}>Modifier l'artiste</button>
              <button>Supprimer l'artiste</button>
            </h4>
        }

        <div>
          {' Numéros : '}
          {artistActs ?
            <span>
              {artistActs.map(act => act.title).join(', ')}
              {collapse ?
                <div>
                  <select name="idAct" id="idAct" onChange={this.handleChange}>
                    {acts.map(act => (
                      <option id={act.id} value={act.id} name={act.id}>{act.title}</option>
                    ))}
                  </select>
                  <button onClick={this.addActArtist}>Ajouter le numéro</button>
                  <button onClick={this.supprActArtist}>Supprimer le numéro</button>
                </div>
                : ''
              }

            </span>
            : ''
          }
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  artists: state.artists.artists,
  acts: state.acts.acts,
})

const mapDispatchToProps = dispatch => bindActionCreators({
  asyncFetchArtists, asyncFetchArtistAct
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(AdminArtist);