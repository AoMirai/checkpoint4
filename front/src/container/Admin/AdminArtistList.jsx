import React, { Component } from 'react'
import { connect } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import { bindActionCreators } from 'redux'
import { asyncFetchArtists } from '../../actions/artists'
import { asyncFetchActs } from '../../actions/acts';
import { Button } from 'reactstrap';
import AdminArtist from './AdminArtist';
import './AdminArtist.scss'

class AdminArtistList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      firstname: '',
      lastname: ''
    }
  }

  componentDidMount = () => {
    const { asyncFetchArtists, asyncFetchActs } = this.props
    asyncFetchArtists();
    asyncFetchActs();
  }

  toggle = () => {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  submitForm = (event) => {
    event.preventDefault();
    const { asyncFetchArtists } = this.props;
    const { collapse, ...artist } = this.state;
    fetch('http://localhost:5000/api/artist', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(artist)
    })
      .then(() => {
        console.log(artist);
        NotificationManager.success('', `Enregistement de ${artist.firstname} ${artist.lastname}`, 1000);
        this.toggle();
        this.setState({ firstname: '', lastname: '' })
        asyncFetchArtists();

      })
      .catch((err) => {
        console.log(err);
        NotificationManager.error('', "Erreur lors de l'entregristement de l'artiste.", 3000);
        throw new Error();
      });
  }

  render() {
    const { artists } = this.props
    const { collapse } = this.state
    return (
      <div className="AdminArtistList">
          <h3 className="titre">Admin Artist</h3>
          <Button className="add" color="success" onClick={this.toggle}>Ajouter un artiste</Button>
        {collapse ?
          <form onSubmit={this.submitForm}>
            <input
              type="text"
              id="firstname"
              name="firstname"
              onChange={this.handleChange}
              placeholder="Prénom"
            />
            <input
              type="text"
              id="lastname"
              name="lastname"
              onChange={this.handleChange}
              placeholder="Nom"
            />
            <Button color="success" type="submit">Enregistrer</Button>
            <Button onClick={this.toggle}>Annuler</Button>
          </form>
          : ''
        }
        {artists.map(artist =>
          <AdminArtist
            key={artist.id}
            id={artist.id}
            firstname={artist.firstname}
            lastname={artist.lastname}
            artistActs={artist.acts ? artist.acts : []}
          />
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  artists: state.artists.artists
})

const mapDispatchToProps = dispatch => bindActionCreators({
  asyncFetchArtists, asyncFetchActs
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AdminArtistList)