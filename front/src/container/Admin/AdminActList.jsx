import React, { Component } from 'react';
import { connect } from 'react-redux';
import { NotificationManager } from 'react-notifications';
import { bindActionCreators } from 'redux';
import { asyncFetchActs } from '../../actions/acts';
import { asyncFetchArtists } from '../../actions/artists';
import AdminAct from './AdminAct';
import { Button } from 'reactstrap';
import './AdminAct.scss'

class AdminActList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      collapse: false,
      title: '',
      description: '',
      picture: '',
    }
  }

  componentDidMount = () => {
    const { asyncFetchActs, asyncFetchArtists } = this.props
    asyncFetchActs();
    asyncFetchArtists();
  }

  toggle = () => {
    this.setState(state => ({ collapse: !state.collapse }));
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value });
  }

  submitForm = (event) => {
    event.preventDefault();
    const { asyncFetchActs } = this.props;
    const {collapse, ...act} = this.state;
    fetch('http://localhost:5000/api/act', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(act)
    })
    .then(() => {
      NotificationManager.success('', `Enregistement du numéro ${act.title}`, 1000);
      this.toggle();
      this.setState({title: '', description: ''})
      asyncFetchActs();

    })      
    .catch((err) => {
      console.log(err);
      NotificationManager.error('', "Erreur lors de l'entregristement du numéro.", 3000);
      throw new Error();
    });
  }

  render() {
    const { acts } = this.props
    const { collapse } = this.state
    return (
      <div className="AdminActList">
        <h3 className="titre">Admin Numéro</h3>
        <Button className="add" color="success" onClick={this.toggle}>Ajouter un numéro</Button>
        {collapse ?
          <form className="add-act" onSubmit={this.submitForm}>
            <input
              type="text"
              id="title"
              name="title"
              onChange={this.handleChange}
            />
            <input
              type="text"
              id="picture"
              name="picture"
              onChange={this.handleChange}
            />
            <textarea
              type="text"
              id="description"
              name="description"
              onChange={this.handleChange}
            />
          <Button color="success" type="submit">Enregistrer</Button>
          </form>
          : ''
        }
        {acts.map(act =>
          <AdminAct
            key={act.id}
            id={act.id}
            title={act.title}
            description={act.description}
            actArtists={act.artists ? act.artists : []}
            picture={act.picture}
          />
        )}
      </div>
    )
  }
}

const mapStateToProps = (state) => ({
  acts: state.acts.acts
})

const mapDispatchToProps = dispatch => bindActionCreators({
  asyncFetchArtists, asyncFetchActs
}, dispatch)

export default connect(mapStateToProps, mapDispatchToProps)(AdminActList)