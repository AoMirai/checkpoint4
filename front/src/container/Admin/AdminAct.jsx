import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { NotificationManager } from 'react-notifications';
import { Button } from 'reactstrap';
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
        NotificationManager.error('', "Erreur lors de l'entregristement du numéro", 3000);
        throw new Error();
      });
  }

  addActArtist = () => {
    const { asyncFetchActs, id, artists } = this.props;
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
        NotificationManager.success('', `Enregistement de l'association du numéro à ${artists[idArtist].firstname}}`, 2000);
        this.toggle();
        asyncFetchActs();

      })
      .catch((err) => {
        NotificationManager.error('', "Erreur lors de l'entregristement de l'association.", 3000);
        throw new Error();
      });
  }

  supprActArtist = () => {
    const { asyncFetchActs, id, artists } = this.props;
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
        NotificationManager.success('', `Suppression de l'association du numéro à ${artists[idArtist].firstname}`, 2000);
        this.toggle();
        asyncFetchActs();

      })
      .catch((err) => {
        console.log(err);
        NotificationManager.error('', "Erreur lors de la suppression de l'association.", 3000);
        throw new Error();
      });
  }

  supprAct = () => {
    const { asyncFetchActs, id } = this.props;
    fetch(`http://localhost:5000/api/act/${id}`, {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        NotificationManager.success('', `Suppression du numéro `, 2000);
        this.toggle();
        asyncFetchActs();

      })
      .catch((err) => {
        console.log(err);
        NotificationManager.error('', "Erreur lors de la suppression du numéro", 3000);
        throw new Error();
      });
  }

  render() {
    const { artists, actArtists } = this.props
    const { title, description, picture } = this.state
    const { collapse } = this.state
    return (
      <div className="AdminAct" style={{backgroundImage: `url(${picture})`, backgroundSize: 'cover', backgroundPosition: '50% 10%' }}>
        {
          collapse ?
            <form  className="modif from" onSubmit={this.submitForm}>
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
              <Button color="success" type="submit">Enregistrer</Button>
              <Button onClick={this.toggle}>Annuler</Button>

            </form>
            :
            <div className="act modif">
              <h4>
                {title}
              </h4>
              <p>{description}</p>
            </div>

        }

        <div className="modif artist">
          {' Artistes : '}
          {actArtists ?
            <div>
              {actArtists.map(artist => artist.fullname).join(', ')}
              {collapse ?
                <div>
                  <select name="idArtist" id="idArtist" onChange={this.handleChange}>
                    {artists.map(artist => (
                      <option key={artist.id} id={artist.id} value={artist.id} name={artist.id}>
                        {artist.firstname}
                        {' '}
                        {artist.lastname}
                      </option>
                    ))}
                  </select>
                  <Button color="success" onClick={this.addActArtist}>Ajouter l'artiste</Button>
                  <Button color="danger" onClick={this.supprActArtist}>Supprimer l'artiste</Button>
                </div>
                : ''
              }
            </div>
            : ''
          }
        </div>
          <div className="modif buttons">
          <Button color="success" onClick={this.toggle}>Modifier le numéro</Button>
          <Button color="danger" onClick={this.supprAct}>Supprimer le numéro</Button>
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