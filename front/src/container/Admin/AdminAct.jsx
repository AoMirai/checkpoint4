import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NotificationManager } from 'react-notifications';
import { asyncFetchActs } from '../../actions/acts';


class AdminAct extends Component {
  constructor(props) {
    super(props);
    const { title, description, picture } = this.props
    this.state = {
      collapse: false,
      title,
      description,
      picture,
      idArtist: 1,
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
    const { asyncFetchActs, id } = this.props;
    const { collapse, idArtist, ...act } = this.state;
    fetch(`http://localhost:5000/api/act/${id}`, {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(act)
    })
      .then(() => {
        NotificationManager.success('', `Enregistement de du numéro ${act.title}`, 2000);
        this.toggle();
        asyncFetchActs();

      })
      .catch((err) => {
        console.log(err);
        NotificationManager.error('', "Erreur lors de l'entregristement du numéro", 3000);
        throw new Error();
      });
  }

  addActArtist = () => {
    const { asyncFetchActs, id } = this.props;
    const { idArtist } = this.state;
    const artist = { id_artist: idArtist, id_act: id };
    fetch(`http://localhost:5000/api/act/artist`, {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(artist)
    })
      .then(() => {
        NotificationManager.success('', `Enregistement de l'association du numéro à ${artist.title} ${artist.description}`, 2000);
        this.toggle();
        asyncFetchActs();

      })
      .catch((err) => {
        console.log(err);
        NotificationManager.error('', "Erreur lors de l'entregristement de l'association.", 3000);
        throw new Error();
      });
  }

  supprActArtist = () => {
    const { asyncFetchActs, id } = this.props;
    const { idArtist } = this.state;
    const artist = { id_artist: idArtist, id_act: id };
    fetch(`http://localhost:5000/api/act/${id}/artist/${idArtist}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(artist)
    })
      .then(() => {
        NotificationManager.success('', `Suppression de l'association du numéro à ${artist.title} ${artist.description}`, 2000);
        this.toggle();
        asyncFetchActs();

      })
      .catch((err) => {
        console.log(err);
        NotificationManager.error('', "Erreur lors de la suppression de l'association.", 3000);
        throw new Error();
      });
  }

  render() {
    const { artists, actArtists } = this.props
    const { title, description, picture } = this.state
    const { collapse } = this.state
    return (
      <div className="AdminArtist">
        {
          collapse ?
            <form onSubmit={this.submitForm}>
              <input
                type="text"
                id="title"
                name="title"
                value={title}
                onChange={this.handleChange}
              />
              <input
                type="text"
                id="picture"
                name="picture"
                value={picture}
                onChange={this.handleChange}
              />
              <textarea
                type="text"
                id="description"
                name="description"
                value={description}
                onChange={this.handleChange}
              />
              <button type="submit">Enregistrer</button>
              <button onClick={this.toggle}>Annuler</button>

            </form>
            :
            <div>
              <h4>
                {title}
                <button onClick={this.toggle}>Modifier le numéro</button>
                <button>Supprimer le numéro</button>
              </h4>
              <p>{description}</p>

            </div>

        }

        <div>
          {' Artistes : '}
          {actArtists ?
            <span>
              {actArtists.map(artist => artist.fullname).join(', ')}
              {collapse ?
                <div>
                  <select name="idArtist" id="idArtist" onChange={this.handleChange}>
                    {artists.map(artist => (
                      <option id={artist.id} value={artist.id} name={artist.id}>
                        {artist.firstname}
                        {' '}
                        {artist.lastname}
                      </option>
                    ))}
                  </select>
                  <button onClick={this.addActArtist}>Ajouter l'artiste</button>
                  <button onClick={this.supprActArtist}>Supprimer l'artiste</button>
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
  asyncFetchActs
}, dispatch)


export default connect(mapStateToProps, mapDispatchToProps)(AdminAct);